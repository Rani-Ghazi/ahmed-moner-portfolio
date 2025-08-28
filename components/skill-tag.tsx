"use client"

import { memo } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface SkillTagProps {
  skill: string
  index: number
}

function SkillTag({ skill, index }: SkillTagProps) {
  const prefersReducedMotion = useReducedMotion()

  // If reduced motion is preferred, use simpler animations
  if (prefersReducedMotion) {
    return (
      <div className="px-6 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-lg">
        {skill}
      </div>
    )
  }

  return (
    <motion.div
      className="relative px-6 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-lg overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        borderColor: "rgba(139, 92, 246, 0.5)",
      }}
    >
      <span className="relative z-10">{skill}</span>
    </motion.div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(SkillTag)
