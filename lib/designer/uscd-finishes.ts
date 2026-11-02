/**
 * Every door style and finish US Cabinet Depot lists on its public Capital collection page, with the room
 * photograph the supplier publishes for it. Names and photos are US Cabinet Depot's own. The swatch color is
 * sampled from the supplier's door sample image, so it is illustrative: real stain and paint vary.
 *
 * The Shaker White photo is deliberately absent: that is the cabinet the catalog's own 3D rendering shows.
 */

export type FinishFamily = 'Shaker' | 'Oxford' | 'Haven' | 'Edgeline' | 'Casselberry'

export interface UscdFinish {
  code: string
  name: string
  family: FinishFamily
  /** Illustrative color, from the supplier's door sample. */
  hex: string
  /** Room photo on our own site, or null when only the cabinet itself should be shown. */
  room: string | null
  roomKind: 'kitchen' | 'bathroom'
}

const R = '/images/catalog/uscd/rooms'

export const USCD_FINISHES: UscdFinish[] = [
  { code: 'SW', name: 'Shaker White', family: 'Shaker', hex: '#F3F2EE', room: null, roomKind: 'kitchen' },
  { code: 'SA', name: 'Shaker Antique White', family: 'Shaker', hex: '#EDE9DE', room: `${R}/SA.jpg`, roomKind: 'kitchen' },
  { code: 'SD', name: 'Shaker Dove', family: 'Shaker', hex: '#C5C0BC', room: `${R}/SD.jpg`, roomKind: 'kitchen' },
  { code: 'SG', name: 'Shaker Grey', family: 'Shaker', hex: '#868686', room: `${R}/SG.jpg`, roomKind: 'kitchen' },
  { code: 'SI', name: 'Shaker Ivy', family: 'Shaker', hex: '#585F52', room: `${R}/SI.jpg`, roomKind: 'kitchen' },
  { code: 'SN', name: 'Shaker Navy', family: 'Shaker', hex: '#1C2C3C', room: `${R}/SN.jpg`, roomKind: 'kitchen' },
  { code: 'SB', name: 'Shaker Black', family: 'Shaker', hex: '#282828', room: `${R}/SB.jpg`, roomKind: 'kitchen' },
  { code: 'SH', name: 'Shaker Honey', family: 'Shaker', hex: '#D5B58C', room: `${R}/SH.jpg`, roomKind: 'kitchen' },
  { code: 'SC', name: 'Shaker Cinder', family: 'Shaker', hex: '#494542', room: `${R}/SC.jpg`, roomKind: 'kitchen' },
  { code: 'SEO', name: 'Shaker Essence Oak', family: 'Shaker', hex: '#886F4F', room: `${R}/SEO.jpg`, roomKind: 'kitchen' },
  { code: 'SU', name: 'Shaker Unfinished', family: 'Shaker', hex: '#BFB3A3', room: `${R}/SU.jpg`, roomKind: 'kitchen' },
  { code: 'OW', name: 'Oxford White', family: 'Oxford', hex: '#D9D9D9', room: `${R}/OW.jpg`, roomKind: 'kitchen' },
  { code: 'OC', name: 'Oxford Cashmere', family: 'Oxford', hex: '#CDC4B3', room: `${R}/OC.jpg`, roomKind: 'kitchen' },
  { code: 'OS', name: 'Oxford Sage', family: 'Oxford', hex: '#9DA290', room: `${R}/OS.jpg`, roomKind: 'kitchen' },
  { code: 'OT', name: 'Oxford Toffee', family: 'Oxford', hex: '#9F8161', room: `${R}/OT.jpg`, roomKind: 'bathroom' },
  { code: 'OM', name: 'Oxford Mist', family: 'Oxford', hex: '#AFABA8', room: `${R}/OM.jpg`, roomKind: 'kitchen' },
  { code: 'HD', name: 'Haven Dune', family: 'Haven', hex: '#E9E8DE', room: `${R}/HD.jpg`, roomKind: 'kitchen' },
  { code: 'HS', name: 'Haven Sage', family: 'Haven', hex: '#9DA190', room: `${R}/HS.jpg`, roomKind: 'kitchen' },
  { code: 'HE', name: 'Haven Ember', family: 'Haven', hex: '#645B4A', room: `${R}/HE.jpg`, roomKind: 'kitchen' },
  { code: 'EW', name: 'Edgeline White', family: 'Edgeline', hex: '#DEDDDE', room: `${R}/EW.jpg`, roomKind: 'bathroom' },
  { code: 'CW', name: 'Casselberry Antique White', family: 'Casselberry', hex: '#EDE8DD', room: `${R}/CW.jpg`, roomKind: 'kitchen' },
  { code: 'CS', name: 'Casselberry Saddle', family: 'Casselberry', hex: '#8D7366', room: `${R}/CS.jpg`, roomKind: 'kitchen' },
]

export const finishByCode = (code: string): UscdFinish => {
  const f = USCD_FINISHES.find((x) => x.code === code)
  if (!f) throw new Error(`Unknown US Cabinet Depot finish ${code}`)
  return f
}

export const FAMILY_BLURB: Record<FinishFamily, string> = {
  Shaker: 'Flat recessed panel. The door style used on every cabinet here.',
  Oxford: 'Raised panel door.',
  Haven: 'A slim frame door with a simple profile.',
  Edgeline: 'Slab-front style for a clean, modern look.',
  Casselberry: 'Traditional raised-panel with a detailed profile.',
}
