import json, re, io, urllib.request, concurrent.futures as cf, os
from PIL import Image, ImageDraw
S="/private/tmp/claude-501/-Users-zoetaylor/263d8ef6-0bb7-44f1-afcf-1bb4c4db7262/scratchpad"
C=json.load(open(f"{S}/cands.json"))
LIFE=re.compile(r"room|scene|lifestyle|shutterstock|cam[_-]?\d|install|render|bath|kitchen|living|patio|pool|outdoor|sizes|size|logo|icon|banner|deck|lobby|hotel|terrace|balcony|office|lounge|hall|entry|restaurant|spa|setting|mood|ambient|vignette|house|cafe|store|gym|exterior|interior|hero|bed|bedroom|spec|chart|pdf|trim|shape|profile|layout|pattern-?guide|grout|installation",re.I)
GOOD=re.compile(r"(?:^|[_-])(?:RS|IP|MO|Face|Swatch|Sheet|Polished|Honed|Matte|Glossy|Tile|Plank|Sample)(?:[_.-]|\d|$)",re.I)
def score(c,feat):
    n=c["name"]; w,h=c["w"],c["h"] or 1
    if not n.lower().endswith((".jpg",".jpeg",".png",".webp")): return -1e9
    sc=0
    if LIFE.search(n): sc-=100
    if c["white"]>0.55: sc-=120
    if c["sd"]<7: sc-=40
    if GOOD.search(n): sc+=25
    if 0.85<=w/h<=1.15: sc+=20
    elif w/h>1.6 or w/h<0.6: sc-=25
    if c['sd']<24 and c['white']<0.1 and w>=500 and c['sd']>=5: sc+=60
    if w>1300: sc-=30
    if 500<=w<=1250: sc+=12
    if w<400: sc-=50
    if c["id"]==feat: sc+=5
    return sc
OV={}
if os.path.exists(f"{S}/overrides.json"): OV=json.load(open(f"{S}/overrides.json"))
pick={}
for pid,v in C.items():
    ranked=sorted(v["cands"],key=lambda c:-score(c,v["feat"]))
    pick[pid]=(OV.get(pid) or (ranked[0]["large"] if ranked and score(ranked[0],v["feat"])>-1e8 else None), ranked)
json.dump({k:v[0] for k,v in pick.items()},open(f"{S}/pick.json","w"))
# contact sheets
cat=json.load(open("/Users/zoetaylor/crafted-catalog-live/lib/designer/iwt-catalog.generated.json"))
names={x["id"].split("-")[1]:x for x in cat}
def thumb_of(pid):
    u=pick[pid][0]
    if not u: return None
    for c in C[pid]["cands"]:
        if c["large"]==u: return c["thumb"]
    return u
def load(pid):
    t=thumb_of(pid)
    if not t: return pid,None
    try:
        im=Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(t,headers={"User-Agent":"x"}),timeout=30).read())).convert("RGB")
        im.thumbnail((190,190)); return pid,im
    except Exception: return pid,None
pids=sorted(C.keys(),key=int)
with cf.ThreadPoolExecutor(16) as ex: ims=dict(ex.map(load,pids))
per=48; cols=8
for si in range(0,len(pids),per):
    chunk=pids[si:si+per]; rows=(len(chunk)+cols-1)//cols
    sheet=Image.new("RGB",(cols*200,rows*215),"white"); d=ImageDraw.Draw(sheet)
    for i,pid in enumerate(chunk):
        x,y=(i%cols)*200,(i//cols)*215
        im=ims.get(pid)
        if im: sheet.paste(im,(x+5,y+5))
        d.rectangle([x+5,y+5,x+60,y+22],fill="black"); d.text((x+8,y+8),str(si+i),fill="white")
        d.text((x+5,y+198),(names.get(pid,{}).get("name","?"))[:30],fill="black")
    sheet.save(f"{S}/sheet{si//per}.jpg",quality=80)
json.dump(pids,open(f"{S}/pids.json","w"))
print(len(pids),"sheets",(len(pids)+per-1)//per)
