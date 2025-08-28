"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

// Tool data with real logos
const tools = [
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    description: "UI/UX design, prototyping, and collaboration",
    color: "#A259FF",
  },
  {
    name: "Adobe Photoshop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
    description: "Photo editing, digital painting, and compositing",
    color: "#31A8FF",
  },
  {
    name: "Adobe Illustrator",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
    description: "Vector graphics and illustration",
    color: "#FF9A00",
  },
  {
    name: "After Effects",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
    description: "Motion graphics and visual effects",
    color: "#9999FF",
  },
  {
    name: "HTML/CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description: "Frontend development and web design",
    color: "#E34F26",
  },
  {
    name: "Canva",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
    description: "Graphic design and visual content creation",
    color: "#00C4CC",
  },
  {
    name: "Adobe InDesign",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg",
    description: "Print design and layout",
    color: "#FF3366",
  },
  {
    name: "Photography",
    logo: "https://cdn-icons-png.flaticon.com/512/685/685655.png",
    description: "Product and brand photography",
    color: "#00C853",
  },
  {
    name: "Typography",
    logo: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
    description: "Font selection and text layout",
    color: "#FF5722",
  },
  {
    name: "CapCut",
    logo: "https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/capcut/resource/image/logo.png",
    description: "Video editing and content creation",
    color: "#00FFA3",
  },
]

export default function ToolsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Tools & Technologies</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            The digital tools I use to bring creative concepts to life
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tools.map((tool, index) => (
            <ToolCardWithLogo
              key={tool.name}
              name={tool.name}
              logo={tool.logo}
              description={tool.description}
              color={tool.color}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Enhanced ToolCard component with real logos
function ToolCardWithLogo({
  name,
  logo,
  description,
  color,
  index,
}: {
  name: string
  logo: string
  description: string
  color: string
  index: number
}) {
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

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 hover:border-gray-700 transition-all duration-300 group"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-4">
        <motion.div
          className="p-3 rounded-lg mr-4 bg-white/10 backdrop-blur-sm"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <div className="w-8 h-8 relative">
            <Image
              src={logo || "/placeholder.svg"}
              alt={`${name} logo`}
              width={32}
              height={32}
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback to a generic icon if logo fails to load
                const target = e.target as HTMLImageElement
                target.src = "https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
              }}
            />
          </div>
        </motion.div>
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
      <p className="text-gray-300">{description}</p>

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-br pointer-events-none"
        style={{ backgroundImage: `linear-gradient(to bottom right, ${color}10, transparent)` }}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Subtle border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${color}30`,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
