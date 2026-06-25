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
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length)
    }, 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden' }}>
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === active ? 1 : 0,
            transition: 'opacity 1.8s ease-in-out',
            willChange: 'opacity',
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  )
}
