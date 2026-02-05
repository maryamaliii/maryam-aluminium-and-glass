"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import RecentProjects from "@/app/components/RecentProjects"
import { MdBuild, MdPalette, MdConstruction, MdHandshake, MdShoppingCart, MdRocketLaunch } from "react-icons/md"

// ============================================================================
// Animation Variants
// ============================================================================

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

// ============================================================================
// Hero Section Component
// ============================================================================

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-transparent flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* Background Accent Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          variants={slideInLeftVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white"
        >
          About{" "}
          <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
            Maryam Aluminium & Glass
          </span>
        </motion.h1>

        <motion.p
          variants={slideInRightVariants}
          className="text-xl sm:text-2xl text-slate-600 mb-8 leading-relaxed"
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
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Get in Touch
          </Link>
          <Link
            href="#journey"
            className="px-8 py-4 border-2 border-slate-300 text-slate-900 font-semibold rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors duration-300"
          >
            Learn Our Story
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// Company Story Section
// ============================================================================

function StorySection() {
  return (
    <section
      id="journey"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
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
                  A Foundation Built on Quality
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-slate-700"></div>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed">
                With over a decade in the aluminium and glass industry, Maryam
                has evolved from a passionate startup into a trusted partner for
                residential and commercial projects across the region. We began
                with a simple belief: premium materials and skilled craftsmanship
                create lasting solutions.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed">
                Today, we blend traditional precision metalworking with modern
                design sensibilities. Every project we undertake reflects our
                commitment to excellence—from initial consultation through final
                installation. We don't just build windows and glass structures;
                we craft architectural solutions that enhance spaces and stand
                the test of time.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed">
                Our team consists of experienced craftsmen and designers who
                understand that aluminium and glass are not merely materials—they
                are mediums for creating beauty, light, and functionality.
              </p>

              <div className="pt-4">
                <Link
                  href="#expertise"
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Discover Our Expertise →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right: Image Block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleInVariants}
            className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Placeholder for company/workspace image */}
            <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
              <div className="text-center text-white">
                <svg
                  className="w-24 h-24 mx-auto mb-4 opacity-50"
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
                <p className="text-lg font-semibold">Workspace/Team Image</p>
                <p className="text-sm mt-2 opacity-75">
                  Replace with: /images/about-workspace.jpg
                </p>
              </div>
            </div>
            <Image
              src="/images/about-workspace.jpg"
              alt="Maryam Aluminium & Glass workspace"
              fill
              className="object-cover"
            />
            
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Core Values Section
// ============================================================================

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
    <section
      id="values"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Our Core Values
          </motion.h2>
          <motion.div variants={itemVariants} className="w-16 h-1 bg-gradient-to-r from-blue-600 to-slate-700 mx-auto mb-6"></motion.div>
          <motion.p variants={itemVariants} className="text-lg text-slate-600 max-w-2xl mx-auto">
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
                className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-white/20 hover:border-white/40 hover:bg-white/20 hover:scale-105"
              >
                <div className="text-5xl mb-4 transition-transform duration-300 text-blue-400">
                  <IconComponent />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/80 leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// Expertise & Services Section
// ============================================================================

function ExpertiseSection() {
  return (
    <section
      id="expertise"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image Block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleInVariants}
            className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
          >
            {/* Placeholder for product/installation image */}
            <div className="w-full h-full bg-gradient-to-br from-blue-300 to-slate-500 flex items-center justify-center">
              <div className="text-center text-white">
                <svg
                  className="w-24 h-24 mx-auto mb-4 opacity-50"
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
                <p className="text-lg font-semibold">Installation/Product Image</p>
                <p className="text-sm mt-2 opacity-75">
                  Replace with: /images/about-installation.jpg
                </p>
              </div>
            </div>
      
            <Image
              src="/images/about-installation.jpg"
              alt="Professional aluminium and glass installation"
              fill
              className="object-cover"
            />
          
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRightVariants}
            className="order-1 lg:order-2"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                  Our Expertise in Action
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-slate-700"></div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Residential Solutions
                    </h3>
                    <p className="text-slate-700">
                      Custom windows, doors, and glass partitions that elevate
                      home aesthetics while ensuring energy efficiency and
                      security.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Commercial Projects
                    </h3>
                    <p className="text-slate-700">
                      Large-scale installations for offices, retail spaces, and
                      industrial facilities with rigorous structural standards.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Design Consultation
                    </h3>
                    <p className="text-slate-700">
                      Our designers work collaboratively to translate your vision
                      into functional, beautiful architectural elements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Maintenance & Support
                    </h3>
                    <p className="text-slate-700">
                      Ongoing maintenance services ensure your installations
                      remain pristine and functionally optimal for years.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Process Section
// ============================================================================

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
    <section
      id="process"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Our Process
          </motion.h2>
          <motion.div variants={itemVariants} className="w-16 h-1 bg-gradient-to-r from-blue-600 to-slate-700 mx-auto mb-6"></motion.div>
          <motion.p variants={itemVariants} className="text-lg text-slate-600 max-w-2xl mx-auto">
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
              {/* Connection Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-1 bg-gradient-to-r from-blue-300 to-transparent"></div>
              )}

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 h-full hover:bg-white/20 hover:shadow-lg hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
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

// ============================================================================
// Recent Projects Section
// ============================================================================

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

// ============================================================================
// Testimonial/Trust Section
// ============================================================================

function TrustSection() {
  const stats = [
    { number: "10+", label: "Years of Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Customer Support" },
  ]

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105"
            >
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-lg text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          className="mt-16 text-center"
        >
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Over a decade of consistent delivery has earned us the trust of
            hundreds of satisfied clients. We're not just a service provider—we're
            a partner invested in your project's success.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA Section
// ============================================================================

function CTASection() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6"
        >
          Ready to Transform Your Space?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xl text-slate-600 mb-8 leading-relaxed"
        >
          Let's discuss your project. Contact our team today for a free
          consultation and discover how Maryam Aluminium & Glass can bring your
          vision to life.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Start Your Project
          </Link>
          <Link
            href="/portfolio"
            className="px-8 py-4 border-2 border-slate-300 text-slate-900 font-semibold rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors duration-300"
          >
            View Portfolio
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function AboutPage() {
  return (
    <div className="w-full" style={{
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    }}>
      {/* Black overlay with 30% opacity */}
      <div className="fixed inset-0 bg-black/30 pointer-events-none z-0"></div>
      <div className="relative z-10">
        <Header />
        <main className="w-full">
          <HeroSection />
          <StorySection />
          <ValuesSection />
          <ExpertiseSection />
          <ProcessSection />
          <RecentProjectsSection />
          <TrustSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
