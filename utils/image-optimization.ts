/**
 * Utility functions for image optimization
 */

// Preload critical images
export const preloadImages = (imagePaths: string[]) => {
  if (typeof window === "undefined") return

  imagePaths.forEach((path) => {
    const img = new Image()
    img.src = path
  })
}

// Generate responsive image sizes
export const getResponsiveImageSizes = (baseWidth: number) => {
  return `(max-width: 640px) ${Math.round(baseWidth * 0.8)}px, 
          (max-width: 768px) ${baseWidth}px, 
          (max-width: 1024px) ${Math.round(baseWidth * 1.2)}px, 
          ${Math.round(baseWidth * 1.5)}px`
}

// Generate placeholder image URL with dimensions
export const getPlaceholderImage = (width: number, height: number) => {
  return `/placeholder.svg?height=${height}&width=${width}`
}
