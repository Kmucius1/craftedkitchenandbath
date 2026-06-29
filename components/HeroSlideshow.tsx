'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

// Full-width hero — landscape, high-resolution (2560px) images only so the
// banner stays crisp on large/Retina displays.
const SLIDES = [
  {
    src: '/images/wp/IMG_2206-scaled.jpeg',
    alt: 'White kitchen open to living room with granite island — Tampa Bay',
  },
  {
    src: '/images/wp/IMG_6137-scaled.jpeg',
    alt: 'Waterfront kitchen remodel with floating shelves and quartz counters — Tampa Bay',
  },
  {
    src: '/images/wp/IMG_6133-scaled.jpeg',
    alt: 'Walnut kitchen with quartz waterfall island — Pinellas County',
  },
  {
    src: '/images/wp/IMG_6153-scaled.jpeg',
    alt: 'Spa-inspired master bathroom with glass walk-in shower and dual vanity — Tampa Bay',
  },
  {
    src: '/images/wp/IMG_6061-1-scaled.jpg',
    alt: 'Modern bathroom with vessel sink, round mirror, and marble shower — Tampa Bay',
  },
  {
    src: '/images/wp/IMG_6140-scaled.jpeg',
    alt: 'Open kitchen and dining room — complete interior transformation — Tampa Bay',
  },
]

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [epoch, setEpoch] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => {
        setPrev(c)
        return (c + 1) % SLIDES.length
      })
      setEpoch((e) => e + 1)
    }, 8000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes heroCrossfade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Previous slide stays visible underneath */}
      {prev !== null && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={SLIDES[prev].src}
            alt={SLIDES[prev].alt}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
            sizes="100vw"
          />
        </div>
      )}

      {/* Current slide fades in on top — key forces fresh animation on each advance */}
      <div
        key={epoch}
        style={{
          position: 'absolute',
          inset: 0,
          animation: epoch === 0 ? 'none' : 'heroCrossfade 1.8s ease-in-out forwards',
        }}
      >
        <Image
          src={SLIDES[current].src}
          alt={SLIDES[current].alt}
          fill
          priority={current === 0}
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          sizes="100vw"
        />
      </div>
    </div>
  )
}
