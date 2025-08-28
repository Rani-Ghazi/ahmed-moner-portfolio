"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import LoadingScreen from "@/components/loading-screen"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  // Set up loading state
  useEffect(() => {
    // Simulate checking if all critical resources are loaded
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Show loading screen for at least 1.5 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      {isLoading ? <LoadingScreen /> : children}
    </ThemeProvider>
  )
}
