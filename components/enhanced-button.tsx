"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg" | "xl"
  children: React.ReactNode
  icon?: React.ReactNode
  loading?: boolean
  gradient?: boolean
  pulse?: boolean
}

const buttonVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className,
      icon,
      loading = false,
      gradient = false,
      pulse = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "relative overflow-hidden font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
      primary: gradient
        ? "bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25"
        : "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/25",
      secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 hover:border-gray-500",
      outline: "border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white bg-transparent",
      ghost: "text-gray-300 hover:text-white hover:bg-gray-800/50",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-xl",
      lg: "px-8 py-4 text-lg rounded-xl",
      xl: "px-12 py-5 text-xl rounded-2xl",
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], pulse && "animate-pulse", className)}
        variants={buttonVariants}
        initial="initial"
        whileHover={!disabled ? "hover" : "initial"}
        whileTap={!disabled ? "tap" : "initial"}
        disabled={disabled || loading}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            />
          ) : icon ? (
            <span className="flex items-center">{icon}</span>
          ) : null}
          {children}
        </span>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 -top-2 -bottom-2 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "300%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.button>
    )
  },
)

EnhancedButton.displayName = "EnhancedButton"

export default EnhancedButton
