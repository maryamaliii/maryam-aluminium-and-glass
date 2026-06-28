"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { MdBuild, MdPalette, MdConstruction } from "react-icons/md"

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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            What Sets Us Apart
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6"
          />
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            These principles guide every decision we make, from material selection
            to customer relationships.
          </motion.p>
        </motion.div>

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
                className="bg-gray-800/60 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-700/60 h-full group"
              >
                <div className="text-4xl sm:text-5xl mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <IconComponent />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
