"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

// Animation Variants (matching About page patterns)
const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
}

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8 },
  },
}

export default function CompanyStory() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeftVariants}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                  Precision & Trust
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-slate-700"></div>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed">
                With over a decade in aluminium and glass, we've evolved from a
                passionate startup into a trusted partner for residential and
                commercial projects. We began with one belief: premium materials
                and skilled craftsmanship create lasting solutions.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed">
                Today, we blend traditional precision with modern design. Every
                project reflects our commitment to excellence—from consultation
                through final installation. We craft architectural solutions that
                enhance spaces and stand the test of time.
              </p>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Read Our Full Story →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right: Image Block - matching About page image card style */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleInVariants}
            className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/about-workspace.jpg"
              alt="Company workspace and team"
              fill
              className="object-cover"
              priority={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
