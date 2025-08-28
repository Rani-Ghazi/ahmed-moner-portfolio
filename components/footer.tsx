"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <motion.footer
      className="relative py-8 px-4 sm:px-6 border-t border-gray-800/50 bg-gradient-to-t from-gray-900/50 to-transparent backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <motion.div
            className="text-gray-400 text-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            © 2025 Ahmed Moner. All rights reserved. |
            <a
              href="mailto:ahmedmonery6@gmail.com"
              className="text-purple-400 hover:text-purple-300 transition-colors ml-1"
            >
              ahmedmonery6@gmail.com
            </a>
          </motion.div>

          {/* Developer Credit */}
          <motion.div
            className="flex items-center gap-2 text-sm text-gray-400"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>Developed with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>by</span>
            <motion.span
              className="font-medium text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Rani Ghazi
            </motion.span>
          </motion.div>
        </div>

        {/* Decorative line */}
        <motion.div
          className="mt-6 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
    </motion.footer>
  )
}
