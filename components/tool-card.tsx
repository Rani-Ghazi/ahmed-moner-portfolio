"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ToolCardProps {
  name: string
  icon: LucideIcon
  description: string
  color: string
  index: number
}

export default function ToolCard({ name, icon: Icon, description, color, index }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { rotate: 5, scale: 1.1 },
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-4">
        <motion.div
          className={`p-3 rounded-lg mr-4`}
          style={{ backgroundColor: `${color}20` }}
          variants={iconVariants}
          animate={isHovered ? "hover" : "initial"}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </motion.div>
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
      <p className="text-gray-300">{description}</p>

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-br"
        style={{ backgroundImage: `linear-gradient(to bottom right, ${color}10, transparent)` }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
