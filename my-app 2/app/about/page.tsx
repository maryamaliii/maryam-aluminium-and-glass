"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import Link from "next/link"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import {
  MdBuild,
  MdPalette,
  MdConstruction,
  MdHandshake,
  MdVerified,
  MdLightbulb,
  MdHome,
  MdBusiness,
  MdDesignServices,
  MdSupportAgent,
  MdRocketLaunch,
  MdOutlineCheckCircle,
} from "react-icons/md"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          About{" "}
          <span className="text-blue-600">Meer Architectural</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting premium aluminium and glass solutions that blend elegance with
          durability — transforming spaces across residential and commercial
          landscapes.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Get in Touch
          </Link>
          <Link
            href="#story"
            className="px-8 py-4 border-2 border-gray-400 text-gray-200 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-500 transition-all duration-300"
          >
            Our Story
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

function StorySection() {
  return (
    <section id="story" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <span className="block w-16 h-1 bg-blue-600 mb-6" />
            </motion.div>
            <motion.p variants={fadeUp} className="text-lg text-gray-700 leading-relaxed mb-4">
              Meer Architectural Glass & Aluminium was founded on a simple
              principle: every space deserves precision-crafted aluminium and
              glass work that stands the test of time. What started as a small
              workshop has grown into a trusted name in architectural solutions.
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg text-gray-700 leading-relaxed mb-4">
              With years of hands-on experience, we combine traditional
              metalworking expertise with modern fabrication technology. Every
              project — from a single window to a full commercial facade —
              receives the same meticulous attention to detail.
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg text-gray-700 leading-relaxed">
              Our team believes that aluminium and glass are not just materials;
              they are mediums for creating light, space, and architectural
              beauty. We partner with architects, builders, and homeowners to
              bring visionary designs to life.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative h-80 sm:h-96 lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200"
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MdConstruction className="text-6xl mx-auto mb-4 opacity-60" />
                <p className="text-lg font-semibold">Workspace / Team</p>
                <p className="text-sm mt-1 opacity-60">Replace with: /images/about-story.jpg</p>
              </div>
            </div>
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
        "Every cut, weld, and installation meets exacting standards. We combine advanced machinery with seasoned expertise for flawless results.",
    },
    {
      icon: MdPalette,
      title: "Modern Design",
      description:
        "We stay ahead of architectural trends, delivering designs that are both contemporary and timeless.",
    },
    {
      icon: MdConstruction,
      title: "Reliable Installation",
      description:
        "Trained teams handle every project with meticulous care, adhering to timelines and safety standards.",
    },
    {
      icon: MdHandshake,
      title: "Customer Trust",
      description:
        "Transparency and accountability drive every interaction. Your satisfaction is our foundation.",
    },
    {
      icon: MdVerified,
      title: "Premium Materials",
      description:
        "We source top-grade aluminium and glass from trusted suppliers, ensuring durability and performance.",
    },
    {
      icon: MdLightbulb,
      title: "Continuous Innovation",
      description:
        "Investing in new techniques and technologies to offer cutting-edge solutions for modern architecture.",
    },
  ]

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Core Values
          </motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-blue-600 mx-auto mb-6" />
          <motion.p variants={fadeUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
            The principles that guide every decision we make.
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {values.map((val, i) => {
            const Icon = val.icon
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/5 hover:-translate-y-1"
              >
                <div className="text-4xl text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                <p className="text-gray-400 leading-relaxed">{val.description}</p>
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
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Expertise
          </motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-blue-600 mx-auto mb-6" />
          <motion.p variants={fadeUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive aluminium and glass services for every need.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={fadeUp} className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <MdHome />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Residential Solutions</h3>
                <p className="text-gray-400 leading-relaxed">
                  Custom windows, doors, balustrades, and glass partitions designed to elevate home aesthetics while ensuring energy efficiency and security.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <MdBusiness />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Commercial Projects</h3>
                <p className="text-gray-400 leading-relaxed">
                  Large-scale installations for offices, retail spaces, and industrial facilities with rigorous structural and safety standards.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <MdDesignServices />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Design Consultation</h3>
                <p className="text-gray-400 leading-relaxed">
                  Our designers collaborate closely with architects and clients to translate vision into functional, beautiful architectural elements.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <MdSupportAgent />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Maintenance & Support</h3>
                <p className="text-gray-400 leading-relaxed">
                  Ongoing maintenance services to keep your installations pristine and functionally optimal for years to come.
                </p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative h-80 sm:h-96 lg:h-full min-h-[300px] rounded-2xl overflow-hidden shadow-2xl bg-gray-700"
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MdConstruction className="text-6xl mx-auto mb-4 opacity-40" />
                <p className="text-lg font-semibold">Installation / Product</p>
                <p className="text-sm mt-1 opacity-50">Replace with: /images/about-expertise.jpg</p>
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
        "We listen to understand your vision, budget, and timeline. Our team conducts site assessments to identify opportunities and constraints.",
    },
    {
      number: "02",
      title: "Design & Planning",
      description:
        "Detailed proposals with visual mockups are created and refined based on your feedback until every detail is perfected.",
    },
    {
      number: "03",
      title: "Fabrication & Quality Control",
      description:
        "Skilled craftsmen fabricate components using precision machinery. Each piece undergoes rigorous quality checks before completion.",
    },
    {
      number: "04",
      title: "Professional Installation",
      description:
        "Our experts execute flawless installation with minimal disruption. We conduct thorough finishing and testing before handover.",
    },
  ]

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Process
          </motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-blue-600 mx-auto mb-6" />
          <motion.p variants={fadeUp} className="text-lg text-gray-400 max-w-2xl mx-auto">
            A structured approach ensuring transparency and excellence at every stage.
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/5"
            >
              <span className="text-4xl font-bold text-blue-600/60 group-hover:text-blue-600 transition-colors duration-300 block mb-4">
                {step.number}
              </span>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TrustSection() {
  const stats = [
    { number: "10+", label: "Years of Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Customer Support" },
  ]

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group bg-gray-700 p-8 rounded-xl text-center border border-gray-600 hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/5"
            >
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <p className="text-gray-300 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            Years of consistent delivery have earned us the trust of hundreds of
            clients. We are not just a service provider — we are a partner
            invested in your project&apos;s success.
          </p>
          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            {["Licensed & Insured", "ISO Quality Standards", "Eco-Conscious Practices"].map(
              (badge, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-blue-500 text-sm font-medium"
                >
                  <MdOutlineCheckCircle className="text-lg" /> {badge}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl sm:text-5xl font-bold text-white mb-6"
        >
          Ready to Transform Your Space?
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-xl text-gray-400 mb-8 leading-relaxed"
        >
          Let&apos;s discuss your project. Contact our team for a free
          consultation and discover how Meer Architectural can bring your vision
          to life.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Start Your Project
          </Link>
          <Link
            href="/portfolio"
            className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-500 transition-all duration-300"
          >
            View Portfolio
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <div
      className="w-full min-h-screen bg-gray-900"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed inset-0 bg-black/60 pointer-events-none z-0" />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <StorySection />
          <ValuesSection />
          <ExpertiseSection />
          <ProcessSection />
          <TrustSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
