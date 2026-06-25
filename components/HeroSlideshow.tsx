'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const SLIDES = [
  {
    src: '/images/7538a222-6dd1-43e7-8c45-55880dacb434.png',
    alt: 'Luxury kitchen remodeling by Crafted Kitchen and Bath',
  },
  {
    src: '/images/HUNTER-KITCHEN-scaled-e1749228160387-rmoy5v31s7ks5mfa39k77eoxtj9ob0g9p8e51b89qw.png',
    alt: 'Custom kitchen remodel Tampa Bay',
  },
  {
    src: '/images/kitchen-marble-island.webp',
    alt: 'Marble kitchen island remodel',
  },
  {
    src: '/images/e1b3aa11-74f9-47a0-a8bc-6008207b1604.png',
    alt: 'Luxury bathroom remodeling by Crafted Kitchen and Bath',
  },
  {
    src: '/images/bathroom-dark-marble.webp',
    alt: 'Dark marble luxury bathroom renovation',
  },
  {
    src: '/images/vanity-sage-cabinetry.webp',
    alt: 'Custom vanity with sage cabinetry',
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
