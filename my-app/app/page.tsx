"use client"

import { useState, useEffect, useSyncExternalStore } from "react"
import Link from "next/link"
import { Montserrat } from "next/font/google"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { usePathname } from "next/navigation"
import Logo from "@/app/components/Logo"
import Footer from "@/app/components/Footer"
import CompanyStory from "@/app/components/sections/CompanyStory"
import CoreValuesGrid from "@/app/components/sections/CoreValuesGrid"
import TrustMetrics from "@/app/components/sections/TrustMetrics"
import ProjectsSection from "@/components/ProjectsSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import QuoteRequestForm from "@/components/QuoteRequestForm"
import ProcessWorkflow from "@/components/ProcessWorkflow"
import { usePageMetadata } from "@/lib/use-page-metadata"
import type { ProjectResponse } from "@/types"

const montserrat = Montserrat({ subsets: ["latin"] })

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0 },
  },
}

const headingVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0 },
  },
}

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0 },
  },
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
]

function LandingPageHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isAdmin = useSyncExternalStore(() => () => {}, () => !!localStorage.getItem("token"), () => false)

  return (
    <header
      className="sticky top-0 z-50 bg-transparent shadow-sm"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Logo />

        <nav className="relative">
          <button
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none focus-visible:ring-2 ring-white text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            ☰
          </button>

          <ul
            className={`absolute right-0 top-14 w-56 rounded-xl bg-gray-900/95 backdrop-blur-md shadow-xl border border-white/10 transition-all duration-300 py-2
            md:static md:flex md:w-auto md:shadow-none md:bg-transparent md:border-0 md:py-0
            ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"}
            `}
          >
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 py-2.5 mx-2 rounded-lg text-sm transition-colors
                  ${pathname === link.href ? "text-white font-semibold bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  href="/admin/dashboard"
                  className="block px-4 py-2.5 mx-2 rounded-lg text-sm text-blue-300 hover:text-blue-200 hover:bg-white/5 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default function HomePage() {
  usePageMetadata(
    "Home",
    "Meer Engineering — Premium aluminium fabrication and modern glass solutions in Pakistan. Expert windows, doors, and custom glass work."
  )
  const [projects, setProjects] = useState<ProjectResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects?limit=3&featured=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProjects(data.data.projects)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const mappedProjects = loading
    ? []
    : projects.map((p) => ({
        id: p.id,
        title: p.title,
        service: p.service.title,
        image: p.image,
        description: p.description,
      }))

  return (
    <div
      className="w-full"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed inset-0 bg-black/30 pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <LandingPageHeader />

        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
          <motion.div
            className="max-w-3xl w-full text-center text-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent ${montserrat.className}`}
              variants={headingVariants}
            >
              Meer Engineering
              <motion.span
                className="block mt-2 text-xl sm:text-2xl md:text-3xl font-medium text-gray-200"
                variants={itemVariants}
              >
                Where Precision Aluminium Meets Modern Glass Design
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-200"
              variants={itemVariants}
            >
              We specialize in high-quality aluminium fabrication and modern glass
              solutions. From windows and doors to custom glass work, we deliver
              durability, precision, and professional finishing.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto"
              variants={containerVariants}
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-lg bg-white px-6 py-4 text-sm font-semibold text-black hover:bg-gray-200 transition text-center"
              >
                <motion.span variants={buttonVariants} whileHover={{ scale: 1.05 }} className="block">
                  Get a Quote
                </motion.span>
              </Link>

              <Link
                href="/services"
                className="w-full sm:w-auto rounded-lg border border-white px-6 py-4 text-sm font-semibold text-white hover:bg-white hover:text-black transition text-center"
              >
                <motion.span variants={buttonVariants} whileHover={{ scale: 1.05 }} className="block">
                  Our Services
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </main>

        <div className="w-full">
          <CompanyStory />
          <CoreValuesGrid />

          {!loading && mappedProjects.length > 0 && (
            <>
              <ProjectsSection
                projects={mappedProjects}
                title="Recent Projects"
                subtitle="Showcasing our finest work"
                showViewAll={false}
                limit={3}
              />

              <section className="py-8 sm:py-12 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="pt-2 sm:pt-4 text-center sm:text-left">
                    <Link
                      href="/projects"
                      className="inline-flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors text-sm sm:text-base"
                    >
                      View All Projects →
                    </Link>
                  </div>
                </div>
              </section>
            </>
          )}

          <ProcessWorkflow />
          <QuoteRequestForm />
          <TestimonialsSection />
          <TrustMetrics />
        </div>

        <Footer />
      </div>
    </div>
  )
}
