'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

// Full-width hero — landscape, high-resolution (2560px) images only so the
// banner stays crisp on large/Retina displays.
const SLIDES = [
  {
    src: '/images/wp/IMG_6129-scaled.jpeg',
    alt: 'Kitchen remodel — Tampa Bay',
  },
  {
    src: '/images/wp/IMG_6153-scaled.jpeg',
    alt: 'Spa-inspired master bathroom with glass walk-in shower and dual vanity — Tampa Bay',
  },
  {
    src: '/images/wp/IMG_2580-scaled.jpeg',
    alt: 'Kitchen remodel — Tampa Bay',
  },
  {
    src: '/images/wp/neon-mirrors-scaled.jpeg',
    alt: 'Bathroom vanity with backlit LED mirrors — Tampa Bay',
  },
  {
    src: '/images/wp/Hunter-Kitchen-hires.png',
    alt: 'Hunter kitchen remodel with custom cabinetry — Tampa Bay',
  },
  {
    src: '/images/wp/IMG_0888-scaled.jpg',
    alt: 'Kitchen remodel — Tampa Bay',
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
    <div style={{ width: '100%', height: 'clamp(420px, 72vh, 600px)', position: 'relative', overflow: 'hidden' }}>
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
          className="kenburns"
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          sizes="100vw"
        />
      </div>
    </div>
  )
}
