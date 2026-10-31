/**
 * Stand-in product renders for the US Cabinet Depot Highland Shaker White line.
 *
 * US Cabinet Depot's per-product photos sit behind a dealer login, so until the
 * account is connected these are drawn: a three-quarter view of a white Shaker
 * cabinet with the right layout for the model (doors, drawers, sink or oven
 * opening) at the model's real proportions. They are clearly labelled
 * "Photo coming soon" on the card and never presented as photographs.
 *
 * Highland Shaker White ships without hardware, so none is drawn.
 */

export type CabinetKind =
  | 'base-door'
  | 'base-door-drawer'
  | 'base-two-door-drawer'
  | 'base-two-door-two-drawer'
  | 'sink-base'
  | 'farm-sink-base'
  | 'wall-single'
  | 'wall-double'
  | 'vanity-sink'
  | 'vanity-combo'
  | 'tall-pantry'
  | 'oven'
  | 'corner'

export interface CabinetSpec {
  kind: CabinetKind
  /** Inches. */
  widthIn: number
  heightIn: number
  depthIn: number
}

const W = 600
const H = 450

/** Which layout each model uses, by supplier SKU. */
export const CABINET_KIND_BY_SKU: Record<string, CabinetKind> = {
  B12FH: 'base-door',
  B18: 'base-door-drawer',
  B24: 'base-two-door-drawer',
  B30: 'base-two-door-two-drawer',
  B36: 'base-two-door-two-drawer',
  SB30: 'sink-base',
  FSB36: 'farm-sink-base',
  W1230: 'wall-single',
  W1242: 'wall-single',
  W3630: 'wall-double',
  VS30: 'vanity-sink',
  VSD36: 'vanity-combo',
  U189024: 'tall-pantry',
  O339024: 'oven',
  BER33: 'corner',
}

const WALL: CabinetKind[] = ['wall-single', 'wall-double']
const TOE = 4.5
const FRAME = 2.1 // door stile and rail
const GAP = 0.3
const DRAWER = 6.25

interface Box {
  x: number
  y: number
  w: number
  h: number
}

const f = (n: number) => n.toFixed(2)

export function cabinetArt(spec: CabinetSpec): string {
  const { kind, widthIn: w, heightIn: h, depthIn: d } = spec
  const wall = WALL.includes(kind)

  // Three-quarter view: the right side and the top recede up and to the right.
  const dx = d * 0.34
  const dy = d * 0.2
  const s = Math.min((0.82 * W) / (w + dx), (0.82 * H) / (h + dy))
  const ox = (W - s * (w + dx)) / 2
  const floorY = wall ? H * 0.52 + (s * (h + dy)) / 2 : H * 0.88
  const oy = wall ? floorY - s * h : floorY - s * h
  const X = (inches: number) => ox + inches * s
  const Y = (inches: number) => oy + inches * s
  const S = (inches: number) => inches * s

  const out: string[] = []
  const defs = `
    <defs>
      <linearGradient id="face" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fdfcfa"/><stop offset="1" stop-color="#ece9e2"/></linearGradient>
      <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1eee8"/><stop offset="1" stop-color="#f8f6f2"/></linearGradient>
      <linearGradient id="side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e0dcd3"/><stop offset="1" stop-color="#cfcac0"/></linearGradient>
      <linearGradient id="top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f1eee8"/></linearGradient>
      <linearGradient id="cavity" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b4e55"/><stop offset="1" stop-color="#2c2e33"/></linearGradient>
      <filter id="soft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="${f(S(1.6))}"/></filter>
    </defs>`

  // No background: the card supplies white, so the drawing sits on it like a product photo.

  // Contact shadow: on the floor under a base cabinet, on the wall behind a wall cabinet.
  if (wall) {
    out.push(`<rect x="${f(X(0.6))}" y="${f(Y(h) - S(0.2))}" width="${f(S(w + dx))}" height="${f(S(2.6))}" rx="${f(S(1.2))}" fill="rgba(40,40,50,0.22)" filter="url(#soft)"/>`)
  } else {
    out.push(`<ellipse cx="${f(X(w / 2 + dx / 2))}" cy="${f(floorY + S(0.4))}" rx="${f(S((w + dx) * 0.58))}" ry="${f(S(2.2))}" fill="rgba(40,40,50,0.28)" filter="url(#soft)"/>`)
  }

  // Cabinet body: side, top, then the face on top of both.
  out.push(`<polygon points="${f(X(w))},${f(Y(0))} ${f(X(w + dx))},${f(Y(0) - S(dy))} ${f(X(w + dx))},${f(Y(h) - S(dy))} ${f(X(w))},${f(Y(h))}" fill="url(#side)" stroke="#bcb7ac" stroke-width="0.8"/>`)
  out.push(`<polygon points="${f(X(0))},${f(Y(0))} ${f(X(w))},${f(Y(0))} ${f(X(w + dx))},${f(Y(0) - S(dy))} ${f(X(dx))},${f(Y(0) - S(dy))}" fill="url(#top)" stroke="#cfcac0" stroke-width="0.8"/>`)
  out.push(`<rect x="${f(X(0))}" y="${f(Y(0))}" width="${f(S(w))}" height="${f(S(h))}" fill="url(#face)" stroke="#c8c3b8" stroke-width="1"/>`)

  // Toe kick on a base cabinet: the recessed dark strip along the floor.
  const bodyBottom = wall ? h : h - TOE
  if (!wall) {
    out.push(`<rect x="${f(X(0.4))}" y="${f(Y(h - TOE))}" width="${f(S(w - 0.8))}" height="${f(S(TOE))}" fill="#9b968b"/>`)
    out.push(`<rect x="${f(X(0.4))}" y="${f(Y(h - TOE))}" width="${f(S(w - 0.8))}" height="${f(S(0.5))}" fill="rgba(0,0,0,0.18)"/>`)
  }

  /** One Shaker door or drawer front: a frame with a recessed center panel. */
  const shaker = (b: Box, drawer = false) => {
    const fw = Math.min(FRAME, b.w / 3, b.h / 3)
    const x = X(b.x)
    const y = Y(b.y)
    const bw = S(b.w)
    const bh = S(b.h)
    const px = x + S(fw)
    const py = y + S(fw)
    const pw = bw - 2 * S(fw)
    const ph = bh - 2 * S(fw)
    out.push(`<rect x="${f(x)}" y="${f(y)}" width="${f(bw)}" height="${f(bh)}" rx="${f(S(0.25))}" fill="url(#face)" stroke="#b9b4a8" stroke-width="1"/>`)
    out.push(`<rect x="${f(x + 0.8)}" y="${f(y + 0.8)}" width="${f(bw - 1.6)}" height="${f(bh - 1.6)}" rx="${f(S(0.2))}" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1"/>`)
    if (pw > 3 && ph > 3) {
      out.push(`<rect x="${f(px)}" y="${f(py)}" width="${f(pw)}" height="${f(ph)}" fill="url(#panel)" stroke="#c9c4b9" stroke-width="1"/>`)
      // The recess: shadow along the top and left inside edge, light along the bottom and right.
      out.push(`<path d="M${f(px)},${f(py + ph)} L${f(px)},${f(py)} L${f(px + pw)},${f(py)}" fill="none" stroke="rgba(0,0,0,0.16)" stroke-width="1.6"/>`)
      out.push(`<path d="M${f(px + pw)},${f(py)} L${f(px + pw)},${f(py + ph)} L${f(px)},${f(py + ph)}" fill="none" stroke="rgba(255,255,255,0.95)" stroke-width="1.4"/>`)
    }
    if (drawer) return
  }

  /** Splits the width into n equal doors with a small gap. */
  const doors = (area: Box, n: number): Box[] => {
    const each = (area.w - GAP * (n - 1)) / n
    return Array.from({ length: n }, (_, i) => ({ x: area.x + i * (each + GAP), y: area.y, w: each, h: area.h }))
  }

  const inset = 0.45
  const left = inset
  const full = w - 2 * inset
  const topY = inset

  const baseRegion = (drawerRows: number): { drawers: Box[]; doorArea: Box } => {
    const drawers: Box[] = []
    let y = topY
    for (let i = 0; i < drawerRows; i++) {
      drawers.push({ x: left, y, w: full, h: DRAWER })
      y += DRAWER + GAP
    }
    return { drawers, doorArea: { x: left, y, w: full, h: bodyBottom - y - 0.2 } }
  }

  switch (kind) {
    case 'base-door': {
      const { doorArea } = baseRegion(0)
      shaker(doorArea)
      break
    }
    case 'base-door-drawer': {
      const { drawers, doorArea } = baseRegion(1)
      drawers.forEach((b) => shaker(b, true))
      shaker(doorArea)
      break
    }
    case 'base-two-door-drawer': {
      const { drawers, doorArea } = baseRegion(1)
      drawers.forEach((b) => shaker(b, true))
      doors(doorArea, 2).forEach((b) => shaker(b))
      break
    }
    case 'base-two-door-two-drawer':
    case 'vanity-sink': {
      const row: Box = { x: left, y: topY, w: full, h: DRAWER }
      doors(row, 2).forEach((b) => shaker(b, true))
      const area: Box = { x: left, y: topY + DRAWER + GAP, w: full, h: bodyBottom - (topY + DRAWER + GAP) - 0.2 }
      doors(area, 2).forEach((b) => shaker(b))
      break
    }
    case 'sink-base': {
      shaker({ x: left, y: topY, w: full, h: DRAWER }, true)
      const area: Box = { x: left, y: topY + DRAWER + GAP, w: full, h: bodyBottom - (topY + DRAWER + GAP) - 0.2 }
      doors(area, 2).forEach((b) => shaker(b))
      break
    }
    case 'farm-sink-base': {
      // Open at the top for the apron of the sink, with a plain top rail.
      out.push(`<rect x="${f(X(left))}" y="${f(Y(topY))}" width="${f(S(full))}" height="${f(S(2.4))}" fill="url(#panel)" stroke="#c9c4b9" stroke-width="1"/>`)
      const area: Box = { x: left, y: topY + 2.4 + GAP, w: full, h: bodyBottom - (topY + 2.4 + GAP) - 0.2 }
      doors(area, 2).forEach((b) => shaker(b))
      break
    }
    case 'vanity-combo': {
      const centerW = Math.min(14, full * 0.4)
      const doorW = (full - centerW - 2 * GAP) / 2
      const rowH = (bodyBottom - topY - 0.2 - 2 * GAP) / 3
      shaker({ x: left, y: topY, w: doorW, h: bodyBottom - topY - 0.2 })
      for (let i = 0; i < 3; i++) shaker({ x: left + doorW + GAP, y: topY + i * (rowH + GAP), w: centerW, h: rowH }, true)
      shaker({ x: left + doorW + centerW + 2 * GAP, y: topY, w: doorW, h: bodyBottom - topY - 0.2 })
      break
    }
    case 'wall-single':
    case 'wall-double': {
      doors({ x: left, y: topY, w: full, h: h - 2 * inset }, kind === 'wall-single' ? 1 : 2).forEach((b) => shaker(b))
      break
    }
    case 'tall-pantry': {
      const lowerH = 30
      const upper: Box = { x: left, y: topY, w: full, h: bodyBottom - topY - lowerH - GAP - 0.2 }
      const lower: Box = { x: left, y: upper.y + upper.h + GAP, w: full, h: lowerH }
      doors(upper, 2).forEach((b) => shaker(b))
      doors(lower, 2).forEach((b) => shaker(b))
      break
    }
    case 'oven': {
      const topH = 15
      const lowerH = 22
      shaker({ x: left, y: topY, w: full, h: topH }, true)
      const cavityY = topY + topH + GAP
      const cavityH = bodyBottom - cavityY - lowerH - GAP - 0.2
      out.push(`<rect x="${f(X(left + 1.2))}" y="${f(Y(cavityY))}" width="${f(S(full - 2.4))}" height="${f(S(cavityH))}" fill="url(#cavity)" stroke="#b9b4a8" stroke-width="1"/>`)
      out.push(`<rect x="${f(X(left + 1.2))}" y="${f(Y(cavityY))}" width="${f(S(full - 2.4))}" height="${f(S(1))}" fill="rgba(0,0,0,0.45)"/>`)
      shaker({ x: left, y: cavityY + cavityH + GAP, w: full, h: lowerH }, true)
      break
    }
    case 'corner': {
      const blind = 9
      const area: Box = { x: left, y: topY, w: full, h: bodyBottom - topY - 0.2 }
      out.push(`<rect x="${f(X(area.x))}" y="${f(Y(area.y))}" width="${f(S(blind))}" height="${f(S(area.h))}" fill="url(#panel)" stroke="#c9c4b9" stroke-width="1"/>`)
      shaker({ x: area.x + blind + GAP, y: area.y, w: area.w - blind - GAP, h: area.h })
      break
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs}${out.join('')}</svg>`
  // encodeURIComponent, not Buffer: this runs in client components too.
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
