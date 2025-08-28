"use client"

import { useEffect, useRef, useState } from "react"
import { motion, type MotionValue } from "framer-motion"

interface AnimatedBackgroundProps {
  mousePosition: { x: number; y: number }
  prefersReducedMotion?: boolean
  opacity?: MotionValue<number>
}

export default function AnimatedBackground({
  mousePosition,
  prefersReducedMotion = false,
  opacity,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const animationFrameId = useRef<number>()
  const pointsRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number }[]>([])
  const timeRef = useRef(0)
  const opacityRef = useRef(1)
  const isInitializedRef = useRef(false)

  // Track opacity changes from motion value
  useEffect(() => {
    if (opacity) {
      const unsubscribe = opacity.onChange((latest) => {
        opacityRef.current = latest
      })
      return () => unsubscribe()
    }
  }, [opacity])

  // Performance detection
  useEffect(() => {
    // Check if device is likely low-powered
    const isLowPower =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.devicePixelRatio < 1.5

    setIsLowPerformance(isLowPower)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions - use standard resolution for better performance
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * (isLowPerformance ? 0.5 : dpr)
      canvas.height = window.innerHeight * (isLowPerformance ? 0.5 : dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      if (!isLowPerformance) {
        ctx.scale(dpr, dpr)
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Reduce number of points for better performance
    const pointCount = isLowPerformance || prefersReducedMotion ? 3 : 5

    // Initialize points if not already done
    if (!isInitializedRef.current) {
      pointsRef.current = []
      for (let i = 0; i < pointCount; i++) {
        pointsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5, // Varying sizes for more organic feel
        })
      }
      isInitializedRef.current = true
    }

    // Animation function - optimized for performance
    const animate = () => {
      // Use a lighter clear method
      ctx.fillStyle = "rgba(10, 10, 20, 0.1)"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Update time more slowly
      timeRef.current += 0.002

      // Update points with simplified physics
      pointsRef.current.forEach((point, index) => {
        // Simplified mouse influence
        const mouseInfluence = 0.01
        point.vx += (mousePosition.x - 0.5) * mouseInfluence
        point.vy += (mousePosition.y - 0.5) * mouseInfluence

        // Add some perlin-like noise movement
        const noiseX = Math.sin(timeRef.current * 0.5 + index * 0.3) * 0.01
        const noiseY = Math.cos(timeRef.current * 0.5 + index * 0.2) * 0.01

        point.vx += noiseX
        point.vy += noiseY

        // Dampen velocity
        point.vx *= 0.98
        point.vy *= 0.98

        // Update position
        point.x += point.vx
        point.y += point.vy

        // Wrap around edges
        if (point.x < 0) point.x = window.innerWidth
        if (point.x > window.innerWidth) point.x = 0
        if (point.y < 0) point.y = window.innerHeight
        if (point.y > window.innerHeight) point.y = 0
      })

      // Draw only one path for better performance
      ctx.beginPath()

      // Start from first point
      ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y)

      // Create smooth curve through points
      for (let i = 0; i < pointsRef.current.length; i++) {
        const currentIndex = i
        const nextIndex = (i + 1) % pointsRef.current.length

        const xc = (pointsRef.current[currentIndex].x + pointsRef.current[nextIndex].x) / 2
        const yc = (pointsRef.current[currentIndex].y + pointsRef.current[nextIndex].y) / 2

        ctx.quadraticCurveTo(pointsRef.current[currentIndex].x, pointsRef.current[currentIndex].y, xc, yc)
      }

      // Connect back to create a closed loop
      const firstIndex = 0
      const lastIndex = pointsRef.current.length - 1

      const xc = (pointsRef.current[lastIndex].x + pointsRef.current[firstIndex].x) / 2
      const yc = (pointsRef.current[lastIndex].y + pointsRef.current[firstIndex].y) / 2

      ctx.quadraticCurveTo(pointsRef.current[lastIndex].x, pointsRef.current[lastIndex].y, xc, yc)

      // Enhanced gradient with scroll-based opacity
      const currentOpacity = opacityRef.current * 0.4

      const gradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight)
      gradient.addColorStop(0, `rgba(76, 29, 149, ${currentOpacity})`) // Purple
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${currentOpacity})`) // Blue
      gradient.addColorStop(1, `rgba(76, 29, 149, ${currentOpacity})`) // Purple

      ctx.strokeStyle = gradient
      ctx.lineWidth = 3
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.stroke()

      // Add pulsing effect with varying frequencies
      const basePulse = 15 + Math.sin(timeRef.current * 1.5) * 5

      // Draw enhanced glowing points
      pointsRef.current.forEach((point, index) => {
        // Vary pulse size based on point index for more organic movement
        const pulseSize = basePulse + Math.sin(timeRef.current * 2 + index * 0.5) * 5 * point.size

        // Create more complex gradient for points
        const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, pulseSize)

        // Vary colors based on position and time
        const hue1 = (240 + Math.sin(timeRef.current + index) * 30) % 360
        const hue2 = (280 + Math.cos(timeRef.current + index) * 30) % 360

        const pointOpacity = opacityRef.current

        glow.addColorStop(0, `hsla(${hue1}, 80%, 60%, ${pointOpacity * 0.8})`)
        glow.addColorStop(0.5, `hsla(${hue2}, 90%, 50%, ${pointOpacity * 0.3})`)
        glow.addColorStop(1, `rgba(76, 29, 149, 0)`)

        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(point.x, point.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()
      })

      // Use a lower frame rate for better performance
      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Don't animate if reduced motion is preferred
    if (!prefersReducedMotion) {
      animate()
    } else {
      // Just draw a static gradient background
      const gradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight)
      gradient.addColorStop(0, "rgba(30, 20, 60, 1)")
      gradient.addColorStop(1, "rgba(20, 30, 70, 1)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    }

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [mousePosition, prefersReducedMotion, isLowPerformance])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ opacity: opacity }}
    />
  )
}
