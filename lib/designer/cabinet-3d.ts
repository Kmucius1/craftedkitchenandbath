/**
 * Real 3D models of the US Cabinet Depot Highland Shaker White line.
 *
 * US Cabinet Depot's per-model photos sit behind a dealer login, so each cabinet
 * is built here as geometry at the model's published width, height and depth,
 * with the layout of doors and drawers that model has. They are renderings, not
 * photographs, and the card says so. Highland Shaker White ships without
 * hardware, so none is modelled.
 *
 * Units are inches. +x is the cabinet's right, +y is up, +z points out of the
 * front. The origin sits on the floor at the center of the cabinet.
 */

import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import type { CabinetKind } from './cabinet-art'
import type { Cabinet3DSpec } from './cabinet-spec'

const WALL: CabinetKind[] = ['wall-single', 'wall-double']
const TOE = 4.5
const TOE_SETBACK = 3
const FRAME = 2.1 // door stile and rail
const GAP = 0.3
const DRAWER = 6.25
const FRONT = 0.75 // door thickness
const PANEL_RECESS = 0.3 // how far the Shaker center panel sits behind the frame

/** A rectangle on the cabinet face, measured in inches from its top-left corner. */
interface Box {
  x: number
  y: number
  w: number
  h: number
}

type Front = { type: 'shaker' | 'flat'; box: Box } | { type: 'cavity'; box: Box }

/** Same layouts as the drawn stand-ins, as a flat list of fronts on the face. */
function layout(spec: Cabinet3DSpec): { fronts: Front[]; bodyBottom: number } {
  const { kind, widthIn: w, heightIn: h } = spec
  const wall = WALL.includes(kind)
  const bodyBottom = wall ? h : h - TOE
  const inset = 0.45
  const left = inset
  const full = w - 2 * inset
  const topY = inset

  const fronts: Front[] = []
  const shaker = (box: Box) => fronts.push({ type: 'shaker', box })
  const doors = (area: Box, n: number): Box[] => {
    const each = (area.w - GAP * (n - 1)) / n
    return Array.from({ length: n }, (_, i) => ({ x: area.x + i * (each + GAP), y: area.y, w: each, h: area.h }))
  }
  const baseRegion = (drawerRows: number) => {
    const drawers: Box[] = []
    let y = topY
    for (let i = 0; i < drawerRows; i++) {
      drawers.push({ x: left, y, w: full, h: DRAWER })
      y += DRAWER + GAP
    }
    return { drawers, doorArea: { x: left, y, w: full, h: bodyBottom - y - 0.2 } as Box }
  }

  switch (kind) {
    case 'base-door':
      shaker(baseRegion(0).doorArea)
      break
    case 'base-door-drawer': {
      const { drawers, doorArea } = baseRegion(1)
      drawers.forEach(shaker)
      shaker(doorArea)
      break
    }
    case 'base-two-door-drawer': {
      const { drawers, doorArea } = baseRegion(1)
      drawers.forEach(shaker)
      doors(doorArea, 2).forEach(shaker)
      break
    }
    case 'base-two-door-two-drawer':
    case 'vanity-sink': {
      doors({ x: left, y: topY, w: full, h: DRAWER }, 2).forEach(shaker)
      const y = topY + DRAWER + GAP
      doors({ x: left, y, w: full, h: bodyBottom - y - 0.2 }, 2).forEach(shaker)
      break
    }
    case 'sink-base': {
      shaker({ x: left, y: topY, w: full, h: DRAWER })
      const y = topY + DRAWER + GAP
      doors({ x: left, y, w: full, h: bodyBottom - y - 0.2 }, 2).forEach(shaker)
      break
    }
    case 'farm-sink-base': {
      // The apron of the sink sits in the opening, so the top is a plain rail.
      fronts.push({ type: 'flat', box: { x: left, y: topY, w: full, h: 2.4 } })
      const y = topY + 2.4 + GAP
      doors({ x: left, y, w: full, h: bodyBottom - y - 0.2 }, 2).forEach(shaker)
      break
    }
    case 'vanity-combo': {
      const centerW = Math.min(14, full * 0.4)
      const doorW = (full - centerW - 2 * GAP) / 2
      const rowH = (bodyBottom - topY - 0.2 - 2 * GAP) / 3
      const tall = bodyBottom - topY - 0.2
      shaker({ x: left, y: topY, w: doorW, h: tall })
      for (let i = 0; i < 3; i++) shaker({ x: left + doorW + GAP, y: topY + i * (rowH + GAP), w: centerW, h: rowH })
      shaker({ x: left + doorW + centerW + 2 * GAP, y: topY, w: doorW, h: tall })
      break
    }
    case 'wall-single':
    case 'wall-double':
      doors({ x: left, y: topY, w: full, h: h - 2 * inset }, kind === 'wall-single' ? 1 : 2).forEach(shaker)
      break
    case 'tall-pantry': {
      const lowerH = 30
      const upper: Box = { x: left, y: topY, w: full, h: bodyBottom - topY - lowerH - GAP - 0.2 }
      const lower: Box = { x: left, y: upper.y + upper.h + GAP, w: full, h: lowerH }
      doors(upper, 2).forEach(shaker)
      doors(lower, 2).forEach(shaker)
      break
    }
    case 'oven': {
      const topH = 15
      const lowerH = 22
      shaker({ x: left, y: topY, w: full, h: topH })
      const cavityY = topY + topH + GAP
      const cavityH = bodyBottom - cavityY - lowerH - GAP - 0.2
      fronts.push({ type: 'cavity', box: { x: left + 1.2, y: cavityY, w: full - 2.4, h: cavityH } })
      shaker({ x: left, y: cavityY + cavityH + GAP, w: full, h: lowerH })
      break
    }
    case 'corner': {
      const blind = 9
      const area: Box = { x: left, y: topY, w: full, h: bodyBottom - topY - 0.2 }
      fronts.push({ type: 'flat', box: { x: area.x, y: area.y, w: blind, h: area.h } })
      shaker({ x: area.x + blind + GAP, y: area.y, w: area.w - blind - GAP, h: area.h })
      break
    }
  }
  return { fronts, bodyBottom }
}

export interface CabinetMaterials {
  paint: THREE.MeshPhysicalMaterial
  panel: THREE.MeshPhysicalMaterial
  carcass: THREE.MeshStandardMaterial
  toe: THREE.MeshStandardMaterial
  cavity: THREE.MeshStandardMaterial
}

/** Every edge in a real cabinet is eased, never razor sharp. That catches light and is most of what reads as "real". */
function rbox(w: number, h: number, d: number, radius = 0.1): THREE.BufferGeometry {
  const r = Math.max(0.01, Math.min(radius, w / 2 - 0.005, h / 2 - 0.005, d / 2 - 0.005))
  return new RoundedBoxGeometry(w, h, d, 3, r)
}

/** Soft vertical wood grain, light enough to tint with the finish color. */
function grainTexture(): THREE.CanvasTexture {
  const size = 512
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  g.fillStyle = '#e9e9e9'
  g.fillRect(0, 0, size, size)
  let seed = 7
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  for (let i = 0; i < 520; i++) {
    const x = rnd() * size
    const w = 0.6 + rnd() * 2.2
    const shade = 150 + Math.floor(rnd() * 80)
    g.strokeStyle = `rgba(${shade},${shade},${shade},${0.12 + rnd() * 0.3})`
    g.lineWidth = w
    g.beginPath()
    g.moveTo(x, 0)
    const wobble = (rnd() - 0.5) * 18
    g.bezierCurveTo(x + wobble, size * 0.33, x - wobble, size * 0.66, x + wobble * 0.4, size)
    g.stroke()
  }
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(1.4, 1)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

function makeMaterials(): CabinetMaterials {
  return {
    // A painted door has a satin sheen with a thin clear topcoat, so it catches reflections the way real lacquer does.
    paint: new THREE.MeshPhysicalMaterial({ color: 0xf6f4ef, roughness: 0.42, metalness: 0, clearcoat: 0.28, clearcoatRoughness: 0.4 }),
    panel: new THREE.MeshPhysicalMaterial({ color: 0xefece5, roughness: 0.46, metalness: 0, clearcoat: 0.22, clearcoatRoughness: 0.45 }),
    carcass: new THREE.MeshStandardMaterial({ color: 0xe4e0d6, roughness: 0.62, metalness: 0 }),
    toe: new THREE.MeshStandardMaterial({ color: 0x6f6a61, roughness: 0.85, metalness: 0 }),
    cavity: new THREE.MeshStandardMaterial({ color: 0x1b1d21, roughness: 0.3, metalness: 0.25 }),
  }
}

/** Paints a built cabinet. No color restores the default white. Stained woods get grain. */
export function paintCabinet(root: THREE.Object3D, hex?: string, grain = false) {
  const m = root.userData.materials as CabinetMaterials | undefined
  if (!m) return
  const base = new THREE.Color(hex ?? 0xf6f4ef)
  m.paint.color.copy(base)
  m.panel.color.copy(base).multiplyScalar(hex ? 0.96 : 0.97)
  m.carcass.color.copy(base).multiplyScalar(hex ? 0.9 : 0.93)
  if (grain) {
    const tex = (root.userData.grain as THREE.CanvasTexture | undefined) ?? grainTexture()
    root.userData.grain = tex
    for (const mat of [m.paint, m.panel, m.carcass]) { mat.map = tex; mat.needsUpdate = true }
    m.paint.roughness = 0.5; m.panel.roughness = 0.55
  } else {
    for (const mat of [m.paint, m.panel, m.carcass]) { if (mat.map) { mat.map = null; mat.needsUpdate = true } }
    m.paint.roughness = 0.42; m.panel.roughness = 0.46
  }
}

/** Builds the cabinet. Dispose it with `disposeObject`. */
export function buildCabinet(spec: Cabinet3DSpec): THREE.Group {
  const { widthIn: w, heightIn: h, depthIn: d, kind } = spec
  const wall = WALL.includes(kind)
  const { fronts, bodyBottom } = layout(spec)
  const m = makeMaterials()
  const group = new THREE.Group()

  const add = (geometry: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number) => {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)
    mesh.castShadow = true
    mesh.receiveShadow = true
    group.add(mesh)
    return mesh
  }

  // Carcass: everything behind the doors. A base cabinet starts above the toe kick.
  const carcassBottom = wall ? 0 : TOE
  const carcassH = h - carcassBottom
  const carcassD = d - FRONT
  add(rbox(w, carcassH, carcassD), m.carcass, 0, carcassBottom + carcassH / 2, -FRONT / 2)

  // Toe kick: the recessed strip along the floor, set back from the doors.
  if (!wall) {
    add(rbox(w - 0.8, TOE, d - TOE_SETBACK - FRONT), m.toe, 0, TOE / 2, -(TOE_SETBACK + FRONT) / 2 + 0.0)
  }

  // Face coordinates: `x` runs left to right from the cabinet's left edge, `y` runs top to bottom from its top.
  const faceX = (x: number, bw: number) => x + bw / 2 - w / 2
  const faceY = (y: number, bh: number) => h - (y + bh / 2)
  const frontZ = d / 2

  const flatPanel = (b: Box, material: THREE.Material, depth: number, zBack: number) => {
    add(rbox(b.w, b.h, depth), material, faceX(b.x, b.w), faceY(b.y, b.h), zBack + depth / 2)
  }

  for (const front of fronts) {
    const b = front.box
    if (front.type === 'cavity') {
      // The oven opening: a dark recess with a lip across the top.
      flatPanel(b, m.cavity, 0.4, frontZ - FRONT - 0.2)
      add(rbox(b.w, 1, 0.6), m.panel, faceX(b.x, b.w), faceY(b.y, 1), frontZ - FRONT + 0.1)
      continue
    }
    if (front.type === 'flat') {
      flatPanel(b, m.paint, FRONT, frontZ - FRONT)
      continue
    }
    // Shaker: a flat back panel with a raised four-piece frame around it.
    const fw = Math.min(FRAME, b.w / 3, b.h / 3)
    const zBack = frontZ - FRONT
    flatPanel(b, m.panel, FRONT - PANEL_RECESS, zBack)
    const bar = (bx: number, by: number, bw: number, bh: number) =>
      add(rbox(bw, bh, FRONT), m.paint, faceX(bx, bw), faceY(by, bh), zBack + FRONT / 2)
    bar(b.x, b.y, b.w, fw) // top rail
    bar(b.x, b.y + b.h - fw, b.w, fw) // bottom rail
    bar(b.x, b.y + fw, fw, b.h - 2 * fw) // left stile
    bar(b.x + b.w - fw, b.y + fw, fw, b.h - 2 * fw) // right stile
  }

  // Keep the model where the viewer expects it: centered by height so it orbits about its middle.
  group.position.y = -h / 2
  group.userData.bounds = { w, h, d, bodyBottom }
  group.userData.materials = m
  return group
}

/** Frees the geometry and materials of a built cabinet. */
export function disposeObject(root: THREE.Object3D) {
  const materials = new Set<THREE.Material>()
  root.traverse((o) => {
    const mesh = o as THREE.Mesh
    if (mesh.geometry) mesh.geometry.dispose()
    const mat = mesh.material
    if (mat) (Array.isArray(mat) ? mat : [mat]).forEach((x) => materials.add(x))
  })
  materials.forEach((x) => {
    ;(x as THREE.MeshStandardMaterial).map?.dispose()
    x.dispose()
  })
}
