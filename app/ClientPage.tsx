"use client"

import type React from "react"

import { useEffect, useRef, useState, lazy, Suspense } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion"
import { Menu, X, Download, ArrowRight, Sparkles, MessageCircle } from "lucide-react"
import Image from "next/image"
import EnhancedButton from "@/components/enhanced-button"
import SectionHeader from "@/components/section-header"
import FloatingElements from "@/components/floating-elements"
import AnimatedTextReveal from "@/components/animated-text-reveal"
import TypingAnimation from "@/components/typing-animation"
import ProjectCard from "@/components/project-card"
import AnimatedBackground from "@/components/animated-background"
import ContactForm from "@/components/contact-form"
import ProjectDetail from "@/components/project-detail"
import Footer from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

// Enhanced project data - Ahmed's actual work
const projects = [
  // Brand Projects
  {
    id: 1,
    title: "Al-Sabil Contracting Brand Identity",
    description:
      "Complete brand identity package including letterhead, business cards, merchandise, and promotional materials",
    image: "/images/projects/brand1.jpeg",
    tags: ["Brand Identity", "Print Design", "Corporate Design"],
    category: "brand",
    featured: true,
    year: "2023",
    client: "Al-Sabil Contracting",
    role: "Brand Designer",
    duration: "6 weeks",
    challenge: "Creating a professional construction company brand that conveys trust and reliability.",
    solution: "Developed a cohesive brand system with consistent red and white color scheme across all materials.",
    results: "Enhanced company professional image and improved client recognition.",
    images: ["/images/projects/brand1.jpeg"],
    imageType: "brand", // Add image type for better handling
  },
  {
    id: 2,
    title: "Lamsa Brand Identity",
    description: "Elegant brand identity design with warm orange and gold color palette for premium positioning",
    image: "/images/projects/brand2.jpeg",
    tags: ["Brand Identity", "Luxury Design", "Print Materials"],
    category: "brand",
    featured: true,
    year: "2023",
    client: "Lamsa",
    role: "Brand Designer",
    duration: "5 weeks",
    challenge: "Creating a premium brand identity that appeals to upscale clientele.",
    solution: "Used sophisticated orange and gold color scheme with elegant typography and consistent application.",
    results: "Successfully positioned the brand in the premium market segment.",
    images: ["/images/projects/brand2.jpeg"],
    imageType: "brand",
  },
  {
    id: 3,
    title: "Sawna Jewelry Brand Identity",
    description: "Comprehensive brand identity for jewelry company with green and gold luxury aesthetic",
    image: "/images/projects/brand3.jpeg",
    tags: ["Jewelry Branding", "Luxury Design", "Brand Identity"],
    category: "brand",
    featured: true,
    year: "2023",
    client: "Sawna Jewelry",
    role: "Brand Designer",
    duration: "7 weeks",
    challenge: "Creating a luxury jewelry brand that stands out in a competitive market.",
    solution: "Developed an elegant green and gold brand system with diamond motifs and premium materials.",
    results: "Established strong brand recognition in the luxury jewelry market.",
    images: ["/images/projects/brand3.jpeg"],
    imageType: "brand",
  },
  // Logo Projects
  {
    id: 4,
    title: "Basma Clinic Logo",
    description: "Medical clinic logo design featuring dental theme with modern blue color scheme",
    image: "/images/projects/logo1.jpeg",
    tags: ["Logo Design", "Medical Branding", "Healthcare"],
    category: "logo",
    featured: true,
    year: "2023",
    client: "Basma Clinic",
    role: "Logo Designer",
    duration: "2 weeks",
    challenge: "Creating a trustworthy and professional medical logo.",
    solution: "Designed a clean tooth-shaped logo with heartbeat elements in calming blue tones.",
    results: "Enhanced clinic's professional image and patient trust.",
    images: ["/images/projects/logo1.jpeg"],
    imageType: "logo",
  },
  {
    id: 5,
    title: "Basma Africa Logo",
    description: "Logo design featuring Africa continent with fingerprint pattern and Arabic typography",
    image: "/images/projects/logo2.jpeg",
    tags: ["Logo Design", "Cultural Design", "Typography"],
    category: "logo",
    featured: false,
    year: "2023",
    client: "Basma Organization",
    role: "Logo Designer",
    duration: "3 weeks",
    challenge: "Creating a logo that represents African identity and cultural connection.",
    solution: "Combined Africa silhouette with fingerprint pattern symbolizing unique identity.",
    results: "Strong visual representation of cultural pride and identity.",
    images: ["/images/projects/logo2.jpeg"],
    imageType: "logo",
  },
  {
    id: 6,
    title: "Al-Sabil Contracting Logo",
    description: "Construction company logo with building silhouettes in professional color scheme",
    image: "/images/projects/logo3.jpeg",
    tags: ["Logo Design", "Construction", "Corporate"],
    category: "logo",
    featured: false,
    year: "2023",
    client: "Al-Sabil Contracting",
    role: "Logo Designer",
    duration: "2 weeks",
    challenge: "Designing a logo that represents strength and reliability in construction.",
    solution: "Created building silhouettes with strong geometric forms in red and gold.",
    results: "Professional logo that conveys construction expertise and reliability.",
    images: ["/images/projects/logo3.jpeg"],
    imageType: "logo",
  },
  {
    id: 7,
    title: "Play Station Mega Logo",
    description: "Gaming logo design with PlayStation controller and vibrant gaming elements",
    image: "/images/projects/logo4.jpeg",
    tags: ["Logo Design", "Gaming", "Entertainment"],
    category: "logo",
    featured: false,
    year: "2023",
    client: "Play Station Mega",
    role: "Logo Designer",
    duration: "1 week",
    challenge: "Creating an exciting gaming logo that appeals to gamers.",
    solution: "Used PlayStation controller with colorful gaming symbols on dynamic background.",
    results: "Eye-catching logo that resonates with gaming community.",
    images: ["/images/projects/logo4.jpeg"],
    imageType: "logo",
  },
  {
    id: 8,
    title: "Jewelry Company Logo",
    description: "Elegant jewelry logo with diamond motif and radiating design elements",
    image: "/images/projects/logo5.jpeg",
    tags: ["Logo Design", "Jewelry", "Luxury"],
    category: "logo",
    featured: false,
    year: "2023",
    client: "Luxury Jewelry Company",
    role: "Logo Designer",
    duration: "2 weeks",
    challenge: "Creating a luxury logo that represents premium jewelry craftsmanship.",
    solution: "Designed diamond with radiating lines symbolizing brilliance and quality.",
    results: "Sophisticated logo that enhances brand's luxury positioning.",
    images: ["/images/projects/logo5.jpeg"],
    imageType: "logo",
  },
  {
    id: 9,
    title: "Lamsa Beauty Logo",
    description: "Elegant beauty logo featuring stylized woman's profile in warm tones",
    image: "/images/projects/logo6.jpeg",
    tags: ["Logo Design", "Beauty", "Feminine"],
    category: "logo",
    featured: false,
    year: "2023",
    client: "Lamsa Beauty",
    role: "Logo Designer",
    duration: "2 weeks",
    challenge: "Creating a feminine and elegant beauty brand logo.",
    solution: "Designed stylized woman's profile with flowing hair in gold tones.",
    results: "Beautiful logo that appeals to target female demographic.",
    images: ["/images/projects/logo6.jpeg"],
    imageType: "logo",
  },
  {
    id: 10,
    title: "Environmental Services Logo",
    description: "Logo design with palm tree and protective hands symbolizing environmental care",
    image: "/images/projects/logo7.jpeg",
    tags: ["Logo Design", "Environmental", "Care"],
    category: "logo",
    featured: false,
    year: "2023",
    client: "Environmental Services Company",
    role: "Logo Designer",
    duration: "2 weeks",
    challenge: "Creating a logo that represents environmental protection and care.",
    solution: "Combined palm tree with protective hands in green and orange colors.",
    results: "Meaningful logo that communicates environmental responsibility.",
    images: ["/images/projects/logo7.jpeg"],
    imageType: "logo",
  },
  // Print Projects
  {
    id: 11,
    title: "Wedding Invitation Cards",
    description: "Elegant wedding invitation designs with Arabic calligraphy and floral elements",
    image: "/images/projects/print1.jpeg",
    tags: ["Print Design", "Wedding", "Invitations"],
    category: "print",
    featured: true,
    year: "2023",
    client: "Private Clients",
    role: "Print Designer",
    duration: "2 weeks",
    challenge: "Creating elegant and culturally appropriate wedding invitations.",
    solution: "Designed beautiful cards with Arabic calligraphy and traditional floral patterns.",
    results: "Clients were delighted with the sophisticated and culturally rich designs.",
    images: ["/images/projects/print1.jpeg"],
    imageType: "print",
  },
  {
    id: 12,
    title: "Mixed Promotional Materials",
    description: "Gym membership pricing and back-to-school promotional designs",
    image: "/images/projects/print2.jpeg",
    tags: ["Print Design", "Promotional", "Marketing"],
    category: "print",
    featured: false,
    year: "2023",
    client: "Various Clients",
    role: "Print Designer",
    duration: "1 week",
    challenge: "Creating engaging promotional materials for different industries.",
    solution: "Designed eye-catching layouts with clear pricing and promotional information.",
    results: "Effective promotional materials that increased client engagement.",
    images: ["/images/projects/print2.jpeg"],
    imageType: "print",
  },
  {
    id: 13,
    title: "Beauty Salon Service Menu",
    description: "Professional hair salon service flyer with pricing and treatment details",
    image: "/images/projects/print3.jpeg",
    tags: ["Print Design", "Beauty", "Service Menu"],
    category: "print",
    featured: true,
    year: "2023",
    client: "Beauty Salon",
    role: "Print Designer",
    duration: "1 week",
    challenge: "Creating an attractive service menu that showcases all treatments clearly.",
    solution: "Designed elegant flyer with warm colors and clear service categorization.",
    results: "Improved customer understanding of services and increased bookings.",
    images: ["/images/projects/print3.jpeg"],
    imageType: "print",
  },
  {
    id: 14,
    title: "Restaurant Menu Design",
    description: "Comprehensive restaurant menu with bilingual content and food photography",
    image: "/images/projects/print4.jpeg",
    tags: ["Print Design", "Restaurant", "Menu"],
    category: "print",
    featured: false,
    year: "2023",
    client: "Yemeni Restaurant",
    role: "Print Designer",
    duration: "2 weeks",
    challenge: "Creating an appetizing menu design that works for both Arabic and English speakers.",
    solution: "Designed bilingual menu with food imagery and clear pricing structure.",
    results: "Enhanced dining experience and improved order efficiency.",
    images: ["/images/projects/print4.jpeg"],
    imageType: "print",
  },
  {
    id: 15,
    title: "Al-Ghanaim Restaurant Menu",
    description: "Colorful restaurant menu design with grilled specialties and contact information",
    image: "/images/projects/print5.jpeg",
    tags: ["Print Design", "Restaurant", "Branding"],
    category: "print",
    featured: true,
    year: "2023",
    client: "Al-Ghanaim Restaurant",
    role: "Print Designer",
    duration: "2 weeks",
    challenge: "Creating a vibrant menu that highlights the restaurant's grilled specialties.",
    solution: "Used warm yellow and orange colors with clear food categorization and pricing.",
    results: "Increased customer engagement and improved brand recognition.",
    images: ["/images/projects/print5.jpeg"],
    imageType: "print",
  },
  {
    id: 16,
    title: "Library Billboard Advertisement",
    description: "Large-scale outdoor billboard design for library and bookstore services",
    image: "/images/projects/print6.jpeg",
    tags: ["Print Design", "Billboard", "Advertising"],
    category: "print",
    featured: false,
    year: "2023",
    client: "Educational Library",
    role: "Print Designer",
    duration: "1 week",
    challenge: "Creating an impactful billboard design visible from a distance.",
    solution: "Used bold colors and large typography with clear service information.",
    results: "Increased library visibility and attracted new customers.",
    images: ["/images/projects/print6.jpeg"],
    imageType: "print",
  },
  // Social Media Projects
  {
    id: 17,
    title: "Digital Marketing Services Post",
    description: "Social media post promoting digital marketing services with 3D character illustration",
    image: "/images/projects/social1.jpeg",
    tags: ["Social Media", "Digital Marketing", "3D Design"],
    category: "social-media",
    featured: true,
    year: "2023",
    client: "Digital Marketing Agency",
    role: "Social Media Designer",
    duration: "1 day",
    challenge: "Creating engaging social media content that explains digital marketing services.",
    solution: "Used 3D character with megaphone and clear service descriptions in Arabic.",
    results: "High engagement rates and increased service inquiries.",
    images: ["/images/projects/social1.jpeg"],
    imageType: "social",
  },
  {
    id: 18,
    title: "Samsung Galaxy S25 Ultra Promo",
    description: "Product promotional post for Samsung smartphone with technical specifications",
    image: "/images/projects/social2.jpeg",
    tags: ["Social Media", "Product Design", "Technology"],
    category: "social-media",
    featured: true,
    year: "2023",
    client: "Electronics Retailer",
    role: "Social Media Designer",
    duration: "1 day",
    challenge: "Creating attractive product promotion with technical details.",
    solution: "Used space-themed background with clear product imagery and specifications.",
    results: "Increased product awareness and sales inquiries.",
    images: ["/images/projects/social2.jpeg"],
    imageType: "social",
  },
  {
    id: 19,
    title: "Delicious Burger Advertisement",
    description: "Mouth-watering burger social media advertisement with appetizing food photography",
    image: "/images/projects/social3.jpeg",
    tags: ["Social Media", "Food", "Advertising"],
    category: "social-media",
    featured: true,
    year: "2023",
    client: "Restaurant Chain",
    role: "Social Media Designer",
    duration: "1 day",
    challenge: "Creating a social media post that makes viewers crave the food.",
    solution: "Used high-quality food photography with bold typography and pricing.",
    results: "Significant increase in orders and social media engagement.",
    images: ["/images/projects/social3.jpeg"],
    imageType: "social",
  },
  {
    id: 20,
    title: "Real Estate Property Post",
    description: "Real estate social media post advertising house for sale with property details",
    image: "/images/projects/social4.jpeg",
    tags: ["Social Media", "Real Estate", "Property"],
    category: "social-media",
    featured: false,
    year: "2023",
    client: "Real Estate Agency",
    role: "Social Media Designer",
    duration: "1 day",
    challenge: "Creating attractive real estate content that highlights property features.",
    solution: "Used gradient design with property image and clear specifications.",
    results: "Increased property inquiries and faster sales conversion.",
    images: ["/images/projects/social4.jpeg"],
    imageType: "social",
  },
  {
    id: 21,
    title: "Business Leadership Course Promotion",
    description: "Social media post promoting business leadership development course with event details",
    image: "/images/projects/social6.jpeg",
    tags: ["Social Media", "Business", "Leadership"],
    category: "social-media",
    featured: true,
    year: "2025",
    client: "Business Development Institute",
    role: "Social Media Designer",
    duration: "1 day",
    challenge: "Creating engaging promotional content for a business leadership course.",
    solution: "Used professional imagery with clear event details and strong call-to-action in Arabic.",
    results: "High registration rates and increased course awareness.",
    images: ["/images/projects/social6.jpeg"],
    imageType: "social",
  },
  {
    id: 22,
    title: "Social Media Marketing Services",
    description: "Marketing post showcasing social media communication services with business imagery",
    image: "/images/projects/social5.jpeg",
    tags: ["Social Media", "Marketing", "Communication"],
    category: "social-media",
    featured: false,
    year: "2023",
    client: "Marketing Agency",
    role: "Social Media Designer",
    duration: "1 day",
    challenge: "Communicating complex marketing services in an engaging visual format.",
    solution: "Used multiple business images in circular frames with clear service descriptions.",
    results: "Improved client understanding of services and increased inquiries.",
    images: ["/images/projects/social5.jpeg"],
    imageType: "social",
  },
]

// Skills data
const skills = [
  "Brand Strategy",
  "Logo Design",
  "Typography",
  "UI/UX Design",
  "Motion Graphics",
  "Illustration",
  "3D Modeling",
  "Packaging",
  "Print Design",
  "Web Design",
]

// Project categories
const categories = [
  { id: "all", name: "All Projects" },
  { id: "brand", name: "Brand" },
  { id: "logo", name: "Logo" },
  { id: "print", name: "Print" },
  { id: "social-media", name: "Social Media" },
]

// Social media links
const socialLinks = []

// Lazy load heavy components
const ToolsSection = lazy(() => import("@/components/tools-section"))

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [introAnimationComplete, setIntroAnimationComplete] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  const { toast } = useToast()
  const isMobile = useMobile()

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [1, 0.8, 0.6, 0.4])

  const headerRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const lastScrollY = useRef(0)
  const [headerVisible, setHeaderVisible] = useState(true)

  const prefersReducedMotion = useReducedMotion()

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  // Handle mouse movement for background animation with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      // Clear the previous timeout
      clearTimeout(timeoutId)

      // Set a new timeout to update the position after a delay
      timeoutId = setTimeout(() => {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        })
      }, 50) // 50ms debounce
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [])

  // Handle scroll for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current + 10) {
        setHeaderVisible(false)
      } else if (currentScrollY < lastScrollY.current - 10) {
        setHeaderVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mark page as loaded after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Scroll to section functions
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (mobileMenuOpen) setMobileMenuOpen(false)
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle WhatsApp chat opening
  const openWhatsAppChat = () => {
    const phoneNumber = "96892848137" // Your WhatsApp number
    const message = "Hello Ahmed! I'm interested in discussing a design project with you."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, "_blank", "noopener,noreferrer")

    toast({
      title: "Opening WhatsApp",
      description: "Redirecting you to WhatsApp chat with Ahmed.",
    })
  }

  // Handle external link clicks
  const handleExternalLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // Handle project view live click
  const handleViewLiveProject = (projectId: number) => {
    toast({
      title: "Opening project",
      description: "This would open the live project in a new tab.",
    })
    // In a real implementation, this would open the actual project URL
    window.open(`https://example.com/projects/${projectId}`, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground
        mousePosition={mousePosition}
        prefersReducedMotion={prefersReducedMotion}
        opacity={backgroundOpacity}
      />
      <FloatingElements />

      {/* Header */}
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-black/20"
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: headerVisible ? 0 : -100,
          opacity: headerVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-xl font-bold gradient-text tracking-wide cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Ahmed.
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav>
            <ul className="flex gap-6">
              {[
                { name: "Work", ref: projectsRef },
                { name: "About", ref: aboutRef },
                { name: "Tools", ref: toolsRef },
                { name: "Contact", ref: contactRef },
              ].map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <button
                    onClick={() => scrollToSection(item.ref)}
                    className="hover:text-purple-400 transition-colors relative animated-underline"
                  >
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <EnhancedButton
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white"
          >
            <Menu className="h-6 w-6" />
          </EnhancedButton>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <EnhancedButton
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              <X className="h-6 w-6" />
            </EnhancedButton>

            <nav className="flex flex-col items-center gap-8">
              {[
                { name: "Work", ref: projectsRef },
                { name: "About", ref: aboutRef },
                { name: "Tools", ref: toolsRef },
                { name: "Contact", ref: contactRef },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <button
                    onClick={() => scrollToSection(item.ref)}
                    className="text-2xl font-bold hover:text-purple-400 transition-colors"
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        id="hero"
        className="h-screen flex flex-col justify-center items-center relative px-4 sm:px-6"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <motion.div
          className="text-xl sm:text-2xl text-purple-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <TypingAnimation
            text="Hello, I'm"
            typingSpeed={80}
            delayStart={300}
            onComplete={() => setIntroAnimationComplete(true)}
          />
        </motion.div>

        {introAnimationComplete && (
          <AnimatedTextReveal
            text="Ahmed Moner"
            className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 text-center glow-text"
            once={false}
            highlightWords={["Ahmed", "Moner"]}
            delay={0.1}
            staggerDelay={0.15}
            duration={0.8}
          />
        )}

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl text-center mb-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: introAnimationComplete ? 1 : 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Creating meaningful digital experiences through thoughtful design and creative innovation
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: introAnimationComplete ? 1 : 0, y: introAnimationComplete ? 0 : 20 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <EnhancedButton
              size="lg"
              gradient={true}
              icon={<ArrowRight className="w-5 h-5" />}
              onClick={() => scrollToSection(projectsRef)}
              className="group"
            >
              View My Work
            </EnhancedButton>

            <EnhancedButton
              size="lg"
              variant="outline"
              icon={<Download className="w-5 h-5" />}
              onClick={() => {
                const link = document.createElement("a")
                link.href = "/ahmed-moner-cv.pdf"
                link.download = "Ahmed_Moner_CV.pdf"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                toast({
                  title: "CV Download",
                  description: "Ahmed Moner's CV is being downloaded.",
                })
              }}
            >
              Download CV
            </EnhancedButton>
          </div>
        </motion.div>

        {/* Floating elements for depth */}
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-purple-500/10 blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          }}
          style={{ top: "20%", left: "15%" }}
        />

        <motion.div
          className="absolute w-32 h-32 rounded-full bg-blue-500/10 blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "easeInOut",
          }}
          style={{ bottom: "15%", right: "10%" }}
        />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: introAnimationComplete ? 1 : 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <motion.div
            className="w-1 h-10 relative overflow-hidden"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full bg-purple-400"
              style={{ height: "100%" }}
              animate={{ y: [-40, 40] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
          <span className="text-xs text-gray-400 mt-2">Scroll Down</span>
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <section id="work" ref={projectsRef} className="min-h-screen py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            subtitle="Portfolio"
            title="Featured Projects"
            description="A selection of my recent work across various design disciplines, showcasing creativity and technical expertise"
          />

          {/* Category filter - Desktop */}
          <div className="hidden md:flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <EnhancedButton
                key={category.id}
                variant={activeCategory === category.id ? "primary" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full ${
                  activeCategory === category.id
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500"
                }`}
              >
                {category.name}
              </EnhancedButton>
            ))}
          </div>

          {/* Enhanced Mobile Category Filter with scroll indicators */}
          <div className="md:hidden mb-8 relative">
            <div className="overflow-x-auto pb-4 scrollbar-hide relative">
              <div className="flex gap-2 min-w-max px-1">
                {categories.map((category) => (
                  <EnhancedButton
                    key={category.id}
                    variant={activeCategory === category.id ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full whitespace-nowrap ${
                      activeCategory === category.id
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "border-gray-600 text-gray-300 bg-gray-900/50 hover:bg-gray-800 hover:text-white hover:border-gray-500"
                    }`}
                  >
                    {category.name}
                  </EnhancedButton>
                ))}
              </div>
            </div>

            {/* Scroll indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none" />

            <div className="flex justify-center mt-2">
              <div className="flex gap-1">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeCategory === category.id ? "bg-purple-500" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {selectedProject === null ? (
              <motion.div
                key="project-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onClick={() => setSelectedProject(project.id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <ProjectDetail
                key="project-detail"
                project={projects.find((p) => p.id === selectedProject)!}
                onClose={() => setSelectedProject(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="min-h-screen py-20 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="aspect-square rounded-2xl overflow-hidden hover-lift">
                <Image
                  src="/images/ahmed-profile.jpeg"
                  alt="Ahmed Moner"
                  width={800}
                  height={800}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full opacity-50 blur-3xl float-animation"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 border border-purple-600/20 rounded-full text-purple-400 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                About Me
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">
                Creative Designer & Visual Storyteller
              </h2>

              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  I'm a motivated graphic designer with experience in creating compelling visual identities and digital
                  experiences. I specialize in Adobe Creative Suite, branding, and social media design.
                </p>
                <p>
                  My approach combines creative thinking with practical execution, ensuring that every design solution
                  not only looks professional but also meets business objectives and client needs.
                </p>
                <p>
                  I have experience working with printing equipment, managing social media campaigns, and collaborating
                  with clients to deliver custom visual solutions aligned with their goals.
                </p>
              </div>

              <div className="mt-8">
                <EnhancedButton
                  variant="primary"
                  gradient={true}
                  icon={<MessageCircle className="w-5 h-5" />}
                  onClick={openWhatsAppChat}
                >
                  Get in Touch
                </EnhancedButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" ref={toolsRef}>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading tools...</div>}>
          <ToolsSection />
        </Suspense>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="min-h-screen py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            subtitle="Contact"
            title="Let's Create Together"
            description="Have a project in mind? I'd love to hear about it. Let's discuss how we can collaborate to bring your vision to life."
          />

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col justify-center"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
                  <p className="text-gray-300">
                    Feel free to reach out through the form or directly via WhatsApp for quick communication.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">WhatsApp</h4>
                  <button
                    onClick={openWhatsAppChat}
                    className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    +968 9284 8137
                  </button>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Based In</h4>
                  <p className="text-gray-300">Saham, Oman</p>
                </div>

                {/* Quick WhatsApp Button */}
                <div className="pt-4">
                  <EnhancedButton
                    variant="primary"
                    gradient={true}
                    icon={<MessageCircle className="w-5 h-5" />}
                    onClick={openWhatsAppChat}
                    className="w-full sm:w-auto"
                  >
                    Chat on WhatsApp
                  </EnhancedButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
