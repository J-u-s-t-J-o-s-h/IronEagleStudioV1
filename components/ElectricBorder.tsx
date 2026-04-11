'use client'

import { useLayoutEffect, useRef, useCallback, type CSSProperties, type ReactNode } from 'react'
import styles from './ElectricBorder.module.css'
import { cn } from '@/lib/utils'

interface ElectricBorderProps {
  children?: ReactNode
  color?: string
  speed?: number
  chaos?: number
  thickness?: number
  borderRadius?: number
  /** Max noise displacement in px; lower = less inward bleed over content */
  displacement?: number
  className?: string
  style?: CSSProperties
}

export default function ElectricBorder({
  children,
  color = '#0A3D62',
  speed = 1,
  chaos = 0.12,
  thickness = 2,
  borderRadius = 24,
  displacement = 60,
  className,
  style,
}: ElectricBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef(0)
  const lastFrameTimeRef = useRef(0)

  const random = useCallback((x: number): number => {
    return (Math.sin(x * 12.9898) * 43758.5453) % 1
  }, [])

  const noise2D = useCallback(
    (x: number, y: number): number => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;

      const a = random(i + j * 57);
      const b = random(i + 1 + j * 57);
      const c = random(i + (j + 1) * 57);
      const d = random(i + 1 + (j + 1) * 57);

      const ux = fx * fx * (3.0 - 2.0 * fx);
      const uy = fy * fy * (3.0 - 2.0 * fy);

      return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy
    },
    [random]
  )

  const octavedNoise = useCallback(
    (
      x: number,
      octaves: number,
      lacunarity: number,
      gain: number,
      baseAmplitude: number,
      baseFrequency: number,
      time: number,
      seed: number,
      baseFlatness: number
    ): number => {
      let y = 0
      let amplitude = baseAmplitude
      let frequency = baseFrequency

      for (let i = 0; i < octaves; i++) {
        let octaveAmplitude = amplitude;
        if (i === 0) {
          octaveAmplitude *= baseFlatness;
        }
        y += octaveAmplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
        frequency *= lacunarity;
        amplitude *= gain;
      }

      return y
    },
    [noise2D]
  )

  const getCornerPoint = useCallback(
    (
      centerX: number,
      centerY: number,
      radius: number,
      startAngle: number,
      arcLength: number,
      progress: number
    ): { x: number; y: number } => {
      const angle = startAngle + progress * arcLength;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      }
    },
    []
  )

  const getRoundedRectPoint = useCallback(
    (t: number, left: number, top: number, width: number, height: number, radius: number): { x: number; y: number } => {
      const straightWidth = width - 2 * radius
      const straightHeight = height - 2 * radius
      const cornerArc = (Math.PI * radius) / 2
      const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc
      const distance = t * totalPerimeter

      let accumulated = 0

      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth
        return { x: left + radius + progress * straightWidth, y: top }
      }
      accumulated += straightWidth

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc
        return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress)
      }
      accumulated += cornerArc

      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight
        return { x: left + width, y: top + radius + progress * straightHeight }
      }
      accumulated += straightHeight

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc
        return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress)
      }
      accumulated += cornerArc

      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth
        return { x: left + width - radius - progress * straightWidth, y: top + height }
      }
      accumulated += straightWidth

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc
        return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress)
      }
      accumulated += cornerArc

      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight
        return { x: left, y: top + height - radius - progress * straightHeight }
      }
      accumulated += straightHeight

      const progress = (distance - accumulated) / cornerArc
      return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress)
    },
    [getCornerPoint]
  )

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const octaves = 10
    const lacunarity = 1.6
    const gain = 0.7
    const amplitude = chaos
    const frequency = 10
    const baseFlatness = 0
    /** Room for stroke + noise; tighter on narrow viewports to reduce glow overflow / horizontal scroll */
    let borderOffsetActive = 60

    const updateSize = () => {
      borderOffsetActive =
        typeof window !== 'undefined' && window.innerWidth < 640 ? 48 : 60
      const rect = container.getBoundingClientRect()
      /** Avoid 0×0 during mobile layout / hydration — prevents NaN paths and invisible borders */
      const innerW = Math.max(rect.width, 8)
      const innerH = Math.max(rect.height, 8)
      const width = innerW + borderOffsetActive * 2
      const height = innerH + borderOffsetActive * 2

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      return { width, height }
    }

    let { width, height } = updateSize()

    let resizeRaf = 0
    const scheduleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0
        const next = updateSize()
        width = next.width
        height = next.height
      })
    }

    const drawElectricBorder = (currentTime: number) => {
      if (!canvas || !ctx) return

      if (lastFrameTimeRef.current === 0) {
        lastFrameTimeRef.current = currentTime
      }
      const deltaTime = Math.min((currentTime - lastFrameTimeRef.current) / 1000, 0.05)
      timeRef.current += deltaTime * speed
      lastFrameTimeRef.current = currentTime

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.scale(dpr, dpr)

      ctx.strokeStyle = color
      ctx.lineWidth = thickness
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      const scale = displacement
      const off = borderOffsetActive
      const left = off
      const top = off
      const borderWidth = Math.max(width - 2 * off, 4)
      const borderHeight = Math.max(height - 2 * off, 4)
      const maxRadius = Math.min(borderWidth, borderHeight) / 2
      const radius = Math.min(borderRadius, maxRadius)

      const approximatePerimeter = Math.max(
        8,
        2 * (borderWidth + borderHeight) + 2 * Math.PI * radius
      )
      const sampleCount = Math.max(32, Math.floor(approximatePerimeter / 2))

      ctx.beginPath()

      for (let i = 0; i <= sampleCount; i++) {
        const progress = i / sampleCount

        const point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius)

        const xNoise = octavedNoise(
          progress * 8,
          octaves,
          lacunarity,
          gain,
          amplitude,
          frequency,
          timeRef.current,
          0,
          baseFlatness
        );
        const yNoise = octavedNoise(
          progress * 8,
          octaves,
          lacunarity,
          gain,
          amplitude,
          frequency,
          timeRef.current,
          1,
          baseFlatness
        );

        const displacedX = point.x + xNoise * scale
        const displacedY = point.y + yNoise * scale

        if (i === 0) {
          ctx.moveTo(displacedX, displacedY)
        } else {
          ctx.lineTo(displacedX, displacedY)
        }
      }

      ctx.closePath()
      ctx.stroke()

      animationRef.current = requestAnimationFrame(drawElectricBorder)
    }

    const resizeObserver = new ResizeObserver(() => {
      scheduleResize()
    })
    resizeObserver.observe(container)

    animationRef.current = requestAnimationFrame(drawElectricBorder)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
      resizeObserver.disconnect()
      lastFrameTimeRef.current = 0
    }
  }, [color, speed, chaos, thickness, borderRadius, displacement, octavedNoise, getRoundedRectPoint])

  const vars = {
    '--electric-border-color': color,
    borderRadius,
  } as CSSProperties

  return (
    <div
      ref={containerRef}
      className={cn(styles.electricBorder, className)}
      style={{ ...vars, ...style }}
    >
      <div className={styles.canvasContainer}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
      <div className={styles.layers}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
        <div className={styles.backgroundGlow} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
