import ClientPage from "./ClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ahmed Moner Portfolio",
  description:
    "Portfolio website for Ahmed Moner, a graphic designer specializing in brand identity, visual design, and social media marketing.",
}

export default function Home() {
  return <ClientPage />
}
