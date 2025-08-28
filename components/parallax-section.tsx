"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  speed?: number
  threshold?: [number, number]
}

export default function ParallaxSection({
  children,
  className = "",
  direction = "up",
  speed = 0.2,
  threshold = [0, 1],
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const transformUp = useTransform(scrollYProgress, threshold, ["0%", `${-100 * speed}%`])
  const transformDown = useTransform(scrollYProgress, threshold, ["0%", `${100 * speed}%`])
  const transformLeft = useTransform(scrollYProgress, threshold, ["0%", `${-100 * speed}%`])
  const transformRight = useTransform(scrollYProgress, threshold, ["0%", `${100 * speed}%`])

  // Calculate transform based on direction
  let transform
  switch (direction) {
    case "up":
      transform = transformUp
      break
    case "down":
      transform = transformDown
      break
    case "left":
      transform = transformLeft
      break
    case "right":
      transform = transformRight
      break
    default:
      transform = transformUp
  }

  // Set the style based on direction
  const style = direction === "up" || direction === "down" ? { y: transform } : { x: transform }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={style}>{children}</motion.div>
    </div>
  )
}
