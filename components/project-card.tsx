"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight, Eye } from "lucide-react"
import { memo } from "react"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category?: string
  featured?: boolean
  year?: string
}

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Simplified animations for better performance
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div
      className="project-card group relative overflow-hidden rounded-2xl cursor-pointer glass-card hover-lift border-0"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={cardVariants}
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      onClick={onClick}
      layoutId={`project-card-${project.id}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="aspect-[3/2] sm:aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-t-2xl">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          layoutId={`project-image-${project.id}`}
        >
          {/* Show loading shimmer until image loads */}
          {!isImageLoaded && <div className="w-full h-full loading-shimmer" />}
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={600}
            className={`w-full h-full transition-all duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"} ${
              project.category === "social-media"
                ? "object-cover"
                : "object-contain bg-gradient-to-br from-gray-900 to-gray-800"
            }`}
            onLoad={() => setIsImageLoaded(true)}
            priority={index < 3} // Prioritize loading first 3 images
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 flex flex-col justify-end rounded-2xl"
        initial={{
          background: "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.6), transparent)",
        }}
        whileHover={{
          background: "linear-gradient(to top, rgba(76,29,149,0.95), rgba(139,92,246,0.7), rgba(59,130,246,0.3))",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="transform group-hover:translate-y-0 translate-y-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col h-full">
          {/* Top badges row - now empty but kept for structure */}
          <div className="mb-auto"></div>

          {/* Spacer to push content to bottom */}
          <div className="flex-grow"></div>

          {/* Content container - pushed to bottom */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <motion.h3
                className="text-xl sm:text-2xl font-bold line-clamp-1"
                layoutId={`project-title-${project.id}`}
              >
                {project.title}
              </motion.h3>

              {/* View project button with animation */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ rotate: 0 }}
                animate={{ rotate: isHovered ? 0 : -45 }}
                transition={{ duration: 0.3 }}
              >
                {isHovered ? (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </motion.div>
            </div>

            <motion.p
              className="text-gray-300 mb-4 text-sm sm:text-base line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              layoutId={`project-description-${project.id}`}
            >
              {project.description}
            </motion.p>

            <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              {project.tags.slice(0, 3).map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-2 py-1 sm:px-3 sm:py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overlay effect on hover */}
      <motion.div
        className="absolute inset-0 bg-purple-600/10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(ProjectCard)
