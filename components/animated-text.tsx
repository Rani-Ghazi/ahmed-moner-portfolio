"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation, useReducedMotion, type Variants } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  highlightWords?: string[]
}

export default function AnimatedText({
  text,
  className = "",
  once = true,
  delay = 0,
  highlightWords = [],
}: AnimatedTextProps) {
  const controls = useAnimation()
  const [isInView, setIsInView] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (isInView && shouldAnimate) {
      controls.start("visible")
      if (once) {
        setShouldAnimate(false)
      }
    }
  }, [isInView, controls, shouldAnimate, once])

  // Split text into words
  const words = text.split(" ")

  // Simplified animation variants for better performance
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  }

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

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
    <motion.h1
      className={`${className} overflow-hidden`}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => {
        if (!once) {
          setIsInView(false)
          controls.start("hidden")
        }
      }}
      viewport={{ once: false, amount: 0.5 }}
    >
      {words.map((word, wordIndex) => {
        // Check if this word should be highlighted
        const isHighlighted = highlightWords.includes(word)

        return (
          <motion.span
            key={wordIndex}
            className={`inline-block mr-2 ${isHighlighted ? "gradient-text font-bold" : ""}`}
            variants={wordVariants}
          >
            {word}
          </motion.span>
        )
      })}
    </motion.h1>
  )
}
