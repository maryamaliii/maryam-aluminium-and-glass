"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import RecentProjects from "@/app/components/RecentProjects"
import TrustMetrics from "@/app/components/sections/TrustMetrics"
import { MdBuild, MdPalette, MdConstruction, MdHandshake, MdShoppingCart, MdRocketLaunch } from "react-icons/md"

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
}

const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
}

const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
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

function HeroSection() {
  return (
    <section className="relative min-h-[80vh] bg-transparent flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          variants={slideInLeftVariants}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-white"
        >
          About{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Meer Engineering
          </span>
        </motion.h1>

        <motion.p
          variants={slideInRightVariants}
          className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed"
        >
          A decade of excellence in aluminium fabrication and glass innovation,
          crafted with precision and delivered with integrity.
        </motion.p>

        <motion.div
          variants={fadeInVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto text-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
          >
            Get in Touch
          </Link>
          <Link
            href="#journey"
            className="w-full sm:w-auto text-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors duration-300"
          >
            Learn Our Story
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

function StorySection() {
  return (
    <section id="journey" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
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
                  A Foundation Built on Quality
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
              </div>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                With over a decade in the aluminium and glass industry, Meer Engineering
                has evolved from a passionate startup into a trusted partner for
                residential and commercial projects across the region.
              </p>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Today, we blend traditional precision metalworking with modern
                design sensibilities. Every project we undertake reflects our
                commitment to excellence—from initial consultation through final
                installation.
              </p>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Our team consists of experienced craftsmen and designers who
                understand that aluminium and glass are not merely materials—they
                are mediums for creating beauty, light, and functionality.
              </p>

              <div className="pt-4">
                <Link
                  href="#expertise"
                  className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                >
                  Discover Our Expertise
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
            className="relative h-64 sm:h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/about-workspace.jpg"
              alt="Meer Engineering workshop — aluminium fabrication and glass workspace in Pakistan"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const values = [
    {
      icon: MdBuild,
      title: "Precision Craftsmanship",
      description:
        "Every cut, weld, and installation meets exacting standards. We employ advanced machinery paired with traditional expertise to deliver flawless results.",
    },
    {
      icon: MdPalette,
      title: "Modern Design Philosophy",
      description:
        "We stay current with contemporary aesthetics and trends, ensuring your installations are both timeless and forward-thinking.",
    },
    {
      icon: MdConstruction,
      title: "Reliable Installation",
      description:
        "Our installation teams are trained to handle residential and commercial projects with meticulous attention to detail and timeline adherence.",
    },
    {
      icon: MdHandshake,
      title: "Customer Trust",
      description:
        "Transparency, honesty, and accountability guide every interaction. Your satisfaction is not just a goal—it's our foundation.",
    },
    {
      icon: MdShoppingCart,
      title: "Quality Materials",
      description:
        "We source premium-grade aluminium and glass from trusted suppliers, ensuring durability and performance for years to come.",
    },
    {
      icon: MdRocketLaunch,
      title: "Continuous Innovation",
      description:
        "We invest in new technologies and techniques to offer cutting-edge solutions that enhance both performance and aesthetics.",
    },
  ]

  return (
    <section id="values" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Core Values
          </motion.h2>
          <motion.div variants={itemVariants} className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6" />
          <motion.p variants={itemVariants} className="text-lg text-gray-300 max-w-2xl mx-auto">
            These principles guide every decision we make, from material selection
            to customer relationships.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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

function ExpertiseSection() {
  return (
    <section id="expertise" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleInVariants}
            className="relative h-80 sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
          >
            <Image
              src="/images/about-installation.jpg"
              alt="Professional aluminium and glass installation by Meer Engineering team"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRightVariants}
            className="order-1 lg:order-2 bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Our Expertise in Action
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
              </div>

              <div className="space-y-6">
                {[
                  { title: "Residential Solutions", desc: "Custom windows, doors, and glass partitions that elevate home aesthetics while ensuring energy efficiency and security." },
                  { title: "Commercial Projects", desc: "Large-scale installations for offices, retail spaces, and industrial facilities with rigorous structural standards." },
                  { title: "Design Consultation", desc: "Our designers work collaboratively to translate your vision into functional, beautiful architectural elements." },
                  { title: "Maintenance & Support", desc: "Ongoing maintenance services ensure your installations remain pristine and functionally optimal for years." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600/20 text-blue-400 font-bold">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Consultation",
      description:
        "We listen closely to understand your vision, budget, and timeline. Our experts conduct site assessments to identify opportunities and constraints.",
    },
    {
      number: "02",
      title: "Design & Planning",
      description:
        "Our design team creates detailed proposals with 3D visualizations. We refine designs based on your feedback until perfection is achieved.",
    },
    {
      number: "03",
      title: "Fabrication & Quality Control",
      description:
        "Skilled craftsmen fabricate your custom pieces using precision machinery. Each component undergoes rigorous quality checks before production completion.",
    },
    {
      number: "04",
      title: "Professional Installation",
      description:
        "Our installation experts ensure flawless execution with minimal disruption. We conduct thorough finishing and testing before project handover.",
    },
  ]

  return (
    <section id="process" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Process
          </motion.h2>
          <motion.div variants={itemVariants} className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6" />
          <motion.p variants={itemVariants} className="text-lg text-gray-300 max-w-2xl mx-auto">
            A structured approach ensuring transparency and excellence at every stage.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-0.5 bg-gradient-to-r from-blue-500/40 to-transparent" />
              )}
              <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 h-full hover:bg-gray-700/60 hover:shadow-xl group">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function RecentProjectsSection() {
  return (
    <RecentProjects
      title="Recent Projects"
      subtitle="A showcase of our finest work—testament to our commitment to quality and innovation."
      limit={3}
      showViewAll={true}
    />
  );
}

function CTASection() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-4xl mx-auto text-center bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 sm:p-12 border border-gray-700/50"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Ready to Transform Your Space?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed"
        >
          Let&apos;s discuss your project. Contact our team today for a free
          consultation and discover how Meer Engineering can bring your
          vision to life.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto text-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
          >
            Start Your Project
          </Link>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto text-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors duration-300"
          >
            View Portfolio
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default function AboutPageClient() {
  return (
    <div className="w-full" style={{
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    }}>
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-0" />
      <div className="relative z-10">
        <Header />
        <main className="w-full">
          <HeroSection />
          <StorySection />
          <ValuesSection />
          <ExpertiseSection />
          <ProcessSection />
          <RecentProjectsSection />
          <TrustMetrics />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
