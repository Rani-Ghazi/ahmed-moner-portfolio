"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface TypingAnimationProps {
  text: string
  className?: string
  cursorClassName?: string
  typingSpeed?: number
  delayStart?: number
  cursorBlinkSpeed?: number
  onComplete?: () => void
}

export default function TypingAnimation({
  text,
  className = "",
  cursorClassName = "bg-purple-400",
  typingSpeed = 70,
  delayStart = 500,
  cursorBlinkSpeed = 500,
  onComplete,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Handle typing animation
  useEffect(() => {
    // If user prefers reduced motion, show the full text immediately
    if (prefersReducedMotion) {
      setDisplayedText(text)
      setIsTypingComplete(true)
      onComplete?.()
      return
    }

    let currentIndex = 0
    let typingTimer: NodeJS.Timeout

    // Start typing after delay
    const startTypingTimeout = setTimeout(() => {
      typingTimer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typingTimer)
          setIsTypingComplete(true)
          onComplete?.()
        }
      }, typingSpeed)
    }, delayStart)

    return () => {
      clearTimeout(startTypingTimeout)
      clearInterval(typingTimer)
    }
  }, [text, typingSpeed, delayStart, prefersReducedMotion, onComplete])

  // Handle cursor blinking
  useEffect(() => {
    if (prefersReducedMotion) {
      setCursorVisible(false)
      return
    }

    // Only start blinking after typing is complete
    if (!isTypingComplete) {
      setCursorVisible(true)
      return
    }

    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, cursorBlinkSpeed)

    return () => clearInterval(blinkInterval)
  }, [isTypingComplete, cursorBlinkSpeed, prefersReducedMotion])

  return (
    <div className={`relative inline-flex ${className}`}>
      <span>{displayedText}</span>
      <motion.span
        className={`inline-block w-[0.1em] h-[1.2em] ml-1 ${cursorClassName}`}
        animate={{ opacity: cursorVisible ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        style={{ alignSelf: "center" }}
      />
    </div>
  )
}
