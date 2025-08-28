"use client"

import { motion } from "framer-motion"

export default function FloatingElements() {
  const elements = [
    { size: 60, delay: 0, duration: 20, top: "10%", left: "10%" },
    { size: 80, delay: 2, duration: 25, top: "20%", right: "15%" },
    { size: 40, delay: 4, duration: 18, bottom: "30%", left: "20%" },
    { size: 100, delay: 1, duration: 30, bottom: "20%", right: "10%" },
    { size: 50, delay: 3, duration: 22, top: "60%", left: "70%" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-2xl"
          style={{
            width: element.size,
            height: element.size,
            top: element.top,
            left: element.left,
            right: element.right,
            bottom: element.bottom,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
