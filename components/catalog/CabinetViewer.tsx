'use client'

import { useEffect, useRef, useState } from 'react'
import type { Cabinet3DSpec } from '@/lib/designer/cabinet-spec'

/**
 * A cabinet you can turn with a finger or a mouse. Drag to rotate; the arrow keys
 * turn it too. Zoom is off on purpose so scrolling the page never gets caught here.
 *
 * A catalog page shows dozens of these, and browsers allow only about sixteen live
 * WebGL contexts, so the 3D scene exists only while its card is on screen. Until it
 * is ready (and if WebGL is unavailable) the card's drawn picture shows instead.
 */
export default function CabinetViewer({ spec, label, fallbackSrc, color }: { spec: Cabinet3DSpec; label: string; fallbackSrc: string; color?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [interacted, setInteracted] = useState(false)
  // The finish to paint the cabinet in. Changing it repaints the live model without rebuilding it.
  const colorRef = useRef(color)
  const applyRef = useRef<((hex?: string) => void) | null>(null)
  useEffect(() => {
    colorRef.current = color
    applyRef.current?.(color)
  }, [color])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let teardown: (() => void) | null = null
    let starting = false
    let alive = true

    const start = async () => {
      if (teardown || starting) return
      starting = true
      try {
        const [THREE, { OrbitControls }, { buildCabinet, disposeObject }] = await Promise.all([
          import('three'),
          import('three/examples/jsm/controls/OrbitControls.js'),
          import('@/lib/designer/cabinet-3d'),
        ])
        if (!alive) return

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.setClearColor(0x000000, 0)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        const canvas = renderer.domElement
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;cursor:grab;'
        host.appendChild(canvas)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(30, 4 / 3, 1, 1000)

        scene.add(new THREE.HemisphereLight(0xffffff, 0xc9c4b8, 1.55))
        const key = new THREE.DirectionalLight(0xffffff, 2.1)
        key.position.set(60, 90, 80)
        key.castShadow = true
        key.shadow.mapSize.set(1024, 1024)
        key.shadow.camera.left = -80
        key.shadow.camera.right = 80
        key.shadow.camera.top = 80
        key.shadow.camera.bottom = -80
        key.shadow.bias = -0.0005
        scene.add(key)
        const fill = new THREE.DirectionalLight(0xdfe8ff, 0.7)
        fill.position.set(-70, 30, 50)
        scene.add(fill)

        const cabinet = buildCabinet(spec)
        scene.add(cabinet)
        const mats = cabinet.userData.materials as { paint: import('three').MeshStandardMaterial; panel: import('three').MeshStandardMaterial; carcass: import('three').MeshStandardMaterial }
        const apply = (hex?: string) => {
          if (hex) {
            mats.paint.color.set(hex)
            mats.panel.color.copy(mats.paint.color).multiplyScalar(0.96)
            mats.carcass.color.copy(mats.paint.color).multiplyScalar(0.9)
          } else {
            mats.paint.color.set(0xf6f4ef)
            mats.panel.color.set(0xefece5)
            mats.carcass.color.set(0xe4e0d6)
          }
        }
        apply(colorRef.current)
        applyRef.current = (hex) => {
          apply(hex)
          renderer.render(scene, camera)
        }

        // A soft contact shadow under the cabinet, so it sits on something rather than floating.
        const shadowTex = (() => {
          const c = document.createElement('canvas')
          c.width = c.height = 128
          const g = c.getContext('2d')!
          const grad = g.createRadialGradient(64, 64, 8, 64, 64, 62)
          grad.addColorStop(0, 'rgba(30,30,40,0.42)')
          grad.addColorStop(1, 'rgba(30,30,40,0)')
          g.fillStyle = grad
          g.fillRect(0, 0, 128, 128)
          return new THREE.CanvasTexture(c)
        })()
        const isWall = spec.kind === 'wall-single' || spec.kind === 'wall-double'
        const shadow = new THREE.Mesh(
          new THREE.PlaneGeometry(spec.widthIn * 1.7, spec.depthIn * 1.9),
          new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }),
        )
        shadow.rotation.x = -Math.PI / 2
        shadow.position.y = -spec.heightIn / 2 + 0.05
        shadow.visible = !isWall // a wall cabinet hangs; it has no floor under it
        scene.add(shadow)

        const controls = new OrbitControls(camera, canvas)
        controls.enableZoom = false
        controls.enablePan = false
        controls.enableDamping = false
        controls.minPolarAngle = Math.PI * 0.18
        controls.maxPolarAngle = Math.PI * 0.62
        controls.autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        controls.autoRotateSpeed = 1.6
        // Horizontal drags turn the cabinet; vertical drags still scroll the page on a phone.
        canvas.style.touchAction = 'pan-y'

        // Back the camera off until the whole cabinet fits whatever shape the card is.
        const size = Math.max(spec.widthIn, spec.heightIn, spec.depthIn * 1.3)
        const fit = () => {
          const w = host.clientWidth || 320
          const h = host.clientHeight || 240
          renderer.setSize(w, h, false)
          camera.aspect = w / h
          const vFov = (camera.fov * Math.PI) / 180
          const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect)
          const dist = (size * 0.78) / Math.tan(Math.min(vFov, hFov) / 2)
          const dir = camera.position.length() > 0 ? camera.position.clone().normalize() : new THREE.Vector3(0.55, 0.36, 0.75).normalize()
          camera.position.copy(dir.multiplyScalar(dist))
          camera.updateProjectionMatrix()
          controls.update()
        }
        fit()

        let raf = 0
        const render = () => renderer.render(scene, camera)
        const loop = () => {
          raf = 0
          if (!controls.autoRotate) return
          controls.update()
          render()
          raf = requestAnimationFrame(loop)
        }
        const kick = () => {
          if (!raf) raf = requestAnimationFrame(loop)
        }

        const onStart = () => {
          controls.autoRotate = false
          canvas.style.cursor = 'grabbing'
          setInteracted(true)
        }
        const onEnd = () => {
          canvas.style.cursor = 'grab'
        }
        controls.addEventListener('start', onStart)
        controls.addEventListener('end', onEnd)
        controls.addEventListener('change', render)

        const onKey = (e: KeyboardEvent) => {
          if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
          e.preventDefault()
          controls.autoRotate = false
          setInteracted(true)
          cabinet.rotation.y += e.key === 'ArrowLeft' ? -0.2 : 0.2
          render()
        }
        host.addEventListener('keydown', onKey)

        const ro = new ResizeObserver(() => {
          fit()
          render()
        })
        ro.observe(host)

        render()
        kick()
        setReady(true)

        teardown = () => {
          applyRef.current = null
          if (raf) cancelAnimationFrame(raf)
          ro.disconnect()
          host.removeEventListener('keydown', onKey)
          controls.dispose()
          disposeObject(scene)
          shadowTex.dispose()
          renderer.dispose()
          renderer.forceContextLoss()
          canvas.remove()
          setReady(false)
        }
      } catch {
        // No WebGL (or the model failed): the drawn picture underneath stays.
        teardown = null
      } finally {
        starting = false
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting)
        if (visible) void start()
        else if (teardown) {
          teardown()
          teardown = null
        }
      },
      { rootMargin: '120px' },
    )
    io.observe(host)

    return () => {
      alive = false
      io.disconnect()
      teardown?.()
    }
  }, [spec])

  return (
    <div
      ref={hostRef}
      tabIndex={0}
      role="img"
      aria-label={`Rotatable 3D model of ${label}. Drag or use the left and right arrow keys to turn it.`}
      className="absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2B7CC1]"
    >
      {/* The drawn picture shows until the 3D scene is up, and stays if 3D can't run. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallbackSrc}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-contain p-5 transition-opacity duration-300 ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
      <span className="pointer-events-none absolute bottom-3 left-3 z-[2] rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#4A5568] shadow-sm backdrop-blur">
        {ready && !interacted ? '3D rendering · drag to rotate' : '3D rendering'}
      </span>
    </div>
  )
}
