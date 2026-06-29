"use client"

import Link from "next/link"
import { Montserrat } from "next/font/google"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import CompanyStory from "@/app/components/sections/CompanyStory"
import CoreValuesGrid from "@/app/components/sections/CoreValuesGrid"
import TrustMetrics from "@/app/components/sections/TrustMetrics"
import ProjectsSection from "@/components/ProjectsSection"

const montserrat = Montserrat({ subsets: ["latin"] })

// ============================================================================
// Animation Variants
// ============================================================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0,
    },
  },
}

const headingVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0,
    },
  },
}

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0,
    },
  },
}

// ============================================================================
// Navigation Links
// ============================================================================
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
]

// ============================================================================
// Header Component (Landing Page Only)
// ============================================================================
function LandingPageHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header 
      className="sticky top-0 z-50 bg-transparent shadow-sm"
      style={{
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo - Matches Logo.tsx component exactly */}
        <Link 
          href="/" 
          className="text-xl text-grey hover:text-gray-400 font-semibold tracking-wide"
        >
          Maryam Aluminium & Glass
        </Link>

        {/* Navbar - Matches Navbar.tsx component exactly */}
        <nav className="relative">
          <button
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none focus-visible:ring-2 ring-white text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            ☰
          </button>

          <ul
            className={`absolute right-0 top-12 w-48 rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300
            md:static md:flex md:w-auto md:shadow-none md:bg-transparent md:border-0
            ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 md:opacity-100 md:translate-y-0"}
            `}
          >
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 py-2 transition-colors
                  ${pathname === link.href ? "text-white font-semibold" : "text-gray-200 hover:text-white"}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

// ============================================================================
// Footer Component (Landing Page Only)
// ============================================================================
function LandingPageFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      className="relative text-gray-300 bg-transparent"
      style={{
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              Maryam Aluminium & Glass
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              High-quality aluminium fabrication and modern glass solutions.
              Excellence in precision, durability, and professional finishing.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Aluminium Windows
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Glass Doors
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Custom Fabrication
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Installation
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition">
                  Portfolio
                </Link>
              </li>
              <li>
                {/* Warranty page does not exist */}
                <Link href="/about" className="hover:text-white transition">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact Info
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>Email: harisanwarali@gmail.com</li>
              <li>Phone: +92 3233541250</li>
              <li>Location: Pakistan</li>
              <li>Available: 9 AM - 6 PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-600 pt-6 text-center text-sm text-gray-400">
          © {currentYear} Maryam Aluminium & Glass. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// Main Landing Page Component
// ============================================================================
export default function HomePage() {
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
      {/* Black overlay with 30% opacity - matching About page */}
      <div className="fixed inset-0 bg-black/30 pointer-events-none z-0"></div>

      {/* Content Wrapper - Flex Container */}
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {/* Header */}
        <LandingPageHeader />

        {/* Main Content - Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <motion.div
            className="max-w-3xl w-full text-center text-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Heading */}
            <motion.h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent ${montserrat.className}`}
              variants={headingVariants}
            >
              Maryam Aluminium & Glass
              <motion.span
                className="block mt-2 text-2xl md:text-3xl font-medium text-gray-200"
                variants={itemVariants}
              >
                Where Precision Aluminium Meets Modern Glass Design
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-5 text-base md:text-lg text-gray-200"
              variants={itemVariants}
            >
              We specialize in high-quality aluminium fabrication and modern glass
              solutions. From windows and doors to custom glass work, we deliver
              durability, precision, and professional finishing.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-8 flex justify-center gap-4 flex-wrap"
              variants={containerVariants}
            >
              <Link
                href="/contact"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-gray-200 transition inline-block"
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  Get a Quote
                </motion.div>
              </Link>

              <Link
                href="/services"
                className="rounded-lg border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-black transition inline-block"
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  Our Services
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </main>

        {/* Landing Page Sections - Referenced from About Page */}
        <div className="w-full">
          {/* Company Story Section */}
          <CompanyStory />

          {/* Core Values Section */}
          <CoreValuesGrid />

          {/* Projects Section */}
          <ProjectsSection
            projects={[
              {
                id: '1',
                title: 'Modern Glass Facade',
                service: 'Glass Partitions',
                image: '/images/services/partitions/partition1.jpg',
                description: 'Stunning frameless glass walls that create an open, bright workspace while maintaining functionality.'
              },
              {
                id: '2',
                title: 'Aluminium Window System',
                service: 'Windows & Doors',
                image: '/images/services/windows/windows1.jpg',
                description: 'Energy-efficient aluminium windows with sleek design and superior thermal performance.'
              },
              {
                id: '3',
                title: 'Custom Kitchen Solution',
                service: 'Kitchens',
                image: '/images/services/kitchen/kitchen1.jpg',
                description: 'Premium kitchen cabinetry with modern aluminium and glass elements for contemporary appeal.'
              }
            ]}
            title="Recent Projects"
            subtitle="Showcasing our finest work"
            showViewAll={false}
            limit={3}
          />

          {/* Projects CTA - aligned with Company Story button style */}
          <section className="py-12 bg-transparent">
            <div className="max-w-7xl mx-auto px-6">
              <div className="pt-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  View All Projects →
                </Link>
              </div>
            </div>
          </section>

          {/* Trust Metrics Section */}
          <TrustMetrics />
        </div>

        {/* Footer */}
        <LandingPageFooter />
      </div>
    </div>
  )
}
