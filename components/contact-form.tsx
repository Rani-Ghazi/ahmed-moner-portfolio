"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import EnhancedButton from "@/components/enhanced-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const { toast } = useToast()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Form validation error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({ name: "", email: "", message: "" })
      }, 3000)
    }, 1500)
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="glass-card p-8 rounded-2xl hover-lift">
      {isSubmitted ? (
        <motion.div
          className="flex flex-col items-center justify-center text-center py-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            }}
          >
            <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
          </motion.div>
          <motion.h3
            className="text-2xl font-bold mb-2 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Message Sent!
          </motion.h3>
          <motion.p
            className="text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Thank you for reaching out. I'll get back to you as soon as possible.
          </motion.p>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="name" className={focusedField === "name" ? "text-purple-400" : ""}>
              Name
            </Label>
            <div className="relative">
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                placeholder="Your name"
                required
                className={`bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 rounded-xl ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: focusedField === "name" ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="email" className={focusedField === "email" ? "text-purple-400" : ""}>
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                placeholder="Your email address"
                required
                className={`bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 rounded-xl ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: focusedField === "email" ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="message" className={focusedField === "message" ? "text-purple-400" : ""}>
              Message
            </Label>
            <div className="relative">
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                onFocus={() => handleFocus("message")}
                onBlur={handleBlur}
                placeholder="Tell me about your project..."
                required
                className={`min-h-[150px] bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 rounded-xl ${
                  errors.message ? "border-red-500" : ""
                }`}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: focusedField === "message" ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <EnhancedButton
              type="submit"
              size="lg"
              gradient={true}
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full"
              icon={!isSubmitting && <Send className="w-5 h-5" />}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </EnhancedButton>
          </motion.div>
        </motion.form>
      )}
    </div>
  )
}
