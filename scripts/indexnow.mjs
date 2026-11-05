// Tell IndexNow search engines (Bing, Yandex, Seznam, Naver…) that pages changed.
// Run after a production deploy:  node scripts/indexnow.mjs [url ...]
// With no arguments it submits every URL in the live sitemap.
const HOST = "craftedkitchenandbath.com";
const KEY = "b5694baf9c8067a81f6fc8c3c6f9cf45"; // must match public/b5694baf9c8067a81f6fc8c3c6f9cf45.txt

let urls = process.argv.slice(2);
if (urls.length === 0) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
