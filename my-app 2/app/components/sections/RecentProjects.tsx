"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

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

export default function RecentProjects() {
  const galleryItems = [
    {
      id: 1,
      title: "Modern Residential Windows",
      category: "Residential",
      placeholder: "from-purple-300 to-slate-400",
    },
    {
      id: 2,
      title: "Commercial Glass Façade",
      category: "Commercial",
      placeholder: "from-cyan-300 to-slate-500",
    },
    {
      id: 3,
      title: "Custom Glass Partitions",
      category: "Commercial",
      placeholder: "from-emerald-300 to-slate-400",
    },
    {
      id: 4,
      title: "Aluminium Door Systems",
      category: "Residential",
      placeholder: "from-orange-300 to-slate-400",
    },
    {
      id: 5,
      title: "Architectural Glass Installations",
      category: "Commercial",
      placeholder: "from-pink-300 to-slate-400",
    },
    {
      id: 6,
      title: "Contemporary Glass Solutions",
      category: "Residential",
      placeholder: "from-indigo-300 to-slate-500",
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
            Recent Projects
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-16 h-1 bg-gradient-to-r from-blue-600 to-slate-700 mx-auto mb-6"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            A showcase of our finest work—testament to our commitment to quality
            and innovation.
          </motion.p>
        </motion.div>

        {/* Gallery Grid - matching About page style exactly */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer backdrop-blur-sm border border-white/10 hover:border-white/30"
            >
              {/* Placeholder Image */}
              <div
                className={`w-full h-full bg-gradient-to-br ${item.placeholder} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all duration-300`}
              >
                <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-12 h-12 mx-auto mb-2 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm font-semibold">Project Image</p>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-semibold text-blue-300 mb-2">
                  {item.category}
                </p>
                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
