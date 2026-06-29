"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeftVariants}
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Precision & Trust
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
              </div>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                With over a decade in aluminium and glass, we&apos;ve evolved from a
                passionate startup into a trusted partner for residential and
                commercial projects. We began with one belief: premium materials
                and skilled craftsmanship create lasting solutions.
              </p>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Today, we blend traditional precision with modern design. Every
                project reflects our commitment to excellence—from consultation
                through final installation. We craft architectural solutions that
                enhance spaces and stand the test of time.
              </p>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors group"
                >
                  Read Our Full Story
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleInVariants}
            className="relative h-56 sm:h-72 lg:h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/about-workspace.jpg"
              alt="Company workspace and team"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              priority={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
