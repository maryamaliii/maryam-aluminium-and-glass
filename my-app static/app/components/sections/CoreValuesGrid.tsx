"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { MdBuild, MdPalette, MdConstruction } from "react-icons/md"

// Animation Variants (matching About page patterns)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function CoreValuesGrid() {
  // Select top 3 values for landing page (vs 6 on About page)
  const values = [
    {
      icon: MdBuild,
      title: "Precision Craftsmanship",
      description:
        "Every cut, weld, and installation meets exacting standards. Advanced machinery paired with traditional expertise.",
    },
    {
      icon: MdPalette,
      title: "Modern Design Philosophy",
      description:
        "Contemporary aesthetics and trends guide our work. Timeless solutions with forward-thinking execution.",
    },
    {
      icon: MdConstruction,
      title: "Reliable Installation",
      description:
        "Expert teams trained for residential and commercial projects. Meticulous attention to detail and timeline adherence.",
    },
  ]

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4"
          >
            What Sets Us Apart
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-16 h-1 bg-gradient-to-r from-blue-600 to-slate-700 mx-auto mb-6"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            These principles guide every decision we make, from material selection
            to customer relationships.
          </motion.p>
        </motion.div>

        {/* Values Grid - matching About page glass card style */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-white/20 hover:bg-white/10 hover:scale-105"
              >
                <div className="text-5xl mb-4 transition-transform duration-300 text-blue-600">
                  <IconComponent />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
