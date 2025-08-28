import type React from "react"
import "@/app/globals.css"
import ClientLayout from "./ClientLayout"

export const metadata = {
  title: "Jane Designer Portfolio",
  description:
    "Portfolio website for Jane Designer, a graphic designer specializing in brand identity, UI/UX, and motion graphics.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
