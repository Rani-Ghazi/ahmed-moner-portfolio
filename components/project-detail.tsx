"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category?: string
  featured?: boolean
  year?: string
  client?: string
  role?: string
  duration?: string
  challenge?: string
  solution?: string
  results?: string
  images?: string[]
}

interface ProjectDetailProps {
  project: Project
  onClose: () => void
  onViewLive?: () => void
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 })
  const images = project.images || [project.image]
  const isMobile = useMobile()

  useEffect(() => {
    // Set loaded after a short delay to allow for animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Add keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        nextImage()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    // Prevent body scrolling when gallery is open
    document.body.style.overflow = "hidden"

    return () => {
      clearTimeout(timer)
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
  }

  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }

  const handleTouchEnd = () => {
    const horizontalDistance = touchStart.x - touchEnd.x
    const verticalDistance = touchStart.y - touchEnd.y

    // Only register as a swipe if horizontal movement is greater than vertical
    // and greater than a minimum threshold
    if (Math.abs(horizontalDistance) > Math.abs(verticalDistance) && Math.abs(horizontalDistance) > 50) {
      if (horizontalDistance > 0) {
        nextImage() // Swipe left, go to next
      } else {
        prevImage() // Swipe right, go to previous
      }
    }
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Controls overlay - always visible on mobile, visible on hover for desktop */}
      <div
        className={`absolute inset-0 z-10 flex flex-col ${!isMobile ? "opacity-0 hover:opacity-100 transition-opacity duration-300" : ""}`}
      >
        {/* Top bar with close button and title */}
        <div className="p-4 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent">
          <h3 className="text-lg sm:text-xl font-bold text-white/90 truncate max-w-[70%]">{project.title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full bg-black/50 hover:bg-black/70">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Bottom controls */}
        <div className="mt-auto p-4 bg-gradient-to-t from-black/70 to-transparent">
          {/* Image counter and zoom button */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-white/70">
              {currentImageIndex + 1} / {images.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleZoom}
              className="rounded-full bg-black/50 hover:bg-black/70 text-white/90"
            >
              {isZoomed ? <ZoomOut className="h-4 w-4 mr-2" /> : <ZoomIn className="h-4 w-4 mr-2" />}
              {isZoomed ? "Zoom Out" : "Zoom In"}
            </Button>
          </div>

          {/* Image indicators */}
          <div className="flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? "bg-white scale-125 w-4" : "bg-white/50 hover:bg-white/80"
                }`}
                onClick={() => {
                  setCurrentImageIndex(index)
                  setIsZoomed(false)
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main image container */}
      <div
        className="h-full w-full flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`w-full h-full transition-transform duration-300 ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                onClick={toggleZoom}
              >
                <Image
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  width={1920}
                  height={1080}
                  className={`w-full h-full transition-all duration-300 ${
                    isZoomed ? "object-cover" : "object-contain"
                  }`}
                  onLoad={() => setIsLoaded(true)}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && isLoaded && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full h-10 w-10 sm:h-12 sm:w-12 z-20"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full h-10 w-10 sm:h-12 sm:w-12 z-20"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
