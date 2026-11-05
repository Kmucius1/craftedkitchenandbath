/** Supplier hosts the image optimizer may fetch; keep in sync with next.config.ts remotePatterns. */
const OPTIMIZED_HOSTS = new Set([
  'internationalwholesaletile.com',
  'www.msisurfaces.com',
  'cdn.msisurfaces.com',
  'topknobsupply.com',
  'www.cabinetparts.com',
  'static.homebydecor.com',
  'prod-uscd-product-files.s3.amazonaws.com',
])

/** Whether next/image can optimize this source (our own files or an allowed supplier host). */
export const canOptimize = (src: string) => {
  if (src.startsWith('/')) return true
  try {
    const u = new URL(src)
    return u.protocol === 'https:' && OPTIMIZED_HOSTS.has(u.hostname)
  } catch {
    return false
  }
}

/**
 * The optimizer URL for a plain <img>: a resized WebP/AVIF served from this site,
 * so the visitor's browser never loads the supplier's full-size original (or its cookies).
 */
export const optimizedSrc = (src: string, width = 1080) =>
  canOptimize(src) ? `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75` : src
