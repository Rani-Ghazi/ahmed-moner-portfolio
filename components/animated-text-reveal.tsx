"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface AnimatedTextRevealProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  highlightWords?: string[]
  staggerDelay?: number
  duration?: number
  onComplete?: () => void
}

export default function AnimatedTextReveal({
  text,
  className = "",
  once = true,
  delay = 0,
  highlightWords = [],
  staggerDelay = 0.05,
  duration = 0.7,
  onComplete,
}: AnimatedTextRevealProps) {
  const [isComplete, setIsComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Split text into words
  const words = text.split(" ")

  // Call onComplete when animation finishes
  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete?.()
      return
    }

    const totalDuration = delay + words.length * staggerDelay * 1000 + duration * 1000
    const timer = setTimeout(() => {
      setIsComplete(true)
      onComplete?.()
    }, totalDuration)

    return () => clearTimeout(timer)
  }, [delay, words.length, staggerDelay, duration, prefersReducedMotion, onComplete])

  // If user prefers reduced motion, render plain text
  if (prefersReducedMotion) {
    return (
      <h1 className={className}>
        {words.map((word, i) => (
          <span
            key={i}
            className={`inline-block mr-2 ${highlightWords.includes(word) ? "gradient-text font-bold" : ""}`}
          >
            {word}
          </span>
        ))}
      </h1>
    )
  }

  return (
    <h1 className={`${className} overflow-hidden`}>
      {words.map((word, wordIndex) => {
        // Check if this word should be highlighted
        const isHighlighted = highlightWords.includes(word)

        return (
          <div key={wordIndex} className="inline-block mr-2 overflow-hidden">
            <motion.span
              className={`inline-block ${isHighlighted ? "gradient-text font-bold" : ""}`}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: duration,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + wordIndex * staggerDelay,
              }}
            >
              {word}
            </motion.span>
          </div>
        )
      })}
    </h1>
  )
}
