"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import ProjectCard from "@/components/ProjectCard"
import type { ProjectResponse, ServiceResponse } from "@/types"
import { MdDesignServices, MdBuild, MdWindow, MdKitchen, MdCheckCircle, MdStar, MdPhone, MdEmail, MdArrowForward } from "react-icons/md"
import Image from "next/image"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-gray-900/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-32">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.span
            variants={fadeUp}
            className="inline-block px-4 py-1.5 bg-blue-600/10 border border-blue-600/30 rounded-full text-blue-500 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            Premium Glass & Aluminium Solutions
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Architectural Excellence in{" "}
            <span className="text-blue-500">Glass & Aluminium</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Crafting premium aluminium fabrications and modern glass installations 
            for residential and commercial spaces with unmatched precision and durability.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-base transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
            >
              Get a Free Quote
            </Link>
            <a
              href="https://wa.me/923233541250"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-gray-300 hover:border-blue-500 text-gray-200 hover:text-blue-500 font-semibold rounded-xl text-base transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MdPhone size={18} />
              Contact on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function ServicesSection({ services }: { services: ServiceResponse[] }) {
  if (services.length === 0) return null
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="text-blue-500 text-sm font-semibold uppercase tracking-widest">What We Do</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Our Services
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive glass and aluminium solutions for every architectural need
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => {
            const firstImage = service.images?.[0]
            return (
              <motion.div
                key={service.id}
                variants={fadeUp}
                className="group bg-gray-800 border border-gray-700 hover:border-blue-600/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/5"
              >
                <div className="relative h-48 overflow-hidden">
                  {firstImage ? (
                    <Image
                      src={firstImage.url}
                      alt={firstImage.alt || service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <MdDesignServices className="text-gray-500" size={40} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">{service.description}</p>
                  <Link
                    href={`/services?slug=${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-blue-500 font-medium text-sm hover:text-blue-400 transition-colors"
                  >
                    View Details <MdArrowForward size={14} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

const whyUs = [
  { title: "Premium Quality Materials", description: "We source only the finest aluminium and glass from trusted suppliers, ensuring durability and performance." },
  { title: "Expert Craftsmanship", description: "Our skilled team combines traditional expertise with modern techniques for flawless results." },
  { title: "Timely Delivery", description: "We respect your timeline and deliver projects on schedule without compromising quality." },
  { title: "Customer-Centric Approach", description: "Your vision guides our process. We collaborate closely to bring your ideas to life." },
]

function WhyChooseUsSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="text-blue-500 text-sm font-semibold uppercase tracking-widest">Why Meer Architectural</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Why Choose Us
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto text-lg">
            A decade of excellence in architectural glass and aluminium solutions
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {whyUs.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex gap-4 p-6 rounded-xl bg-gray-800 border border-gray-700 hover:border-blue-600/30 transition-all duration-300"
            >
              <div className="shrink-0">
                <MdCheckCircle className="text-blue-500" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedProjectsSection({ projects }: { projects: ProjectResponse[] }) {
  if (projects.length === 0) return null
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="text-blue-500 text-sm font-semibold uppercase tracking-widest">Our Portfolio</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Featured Projects
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto text-lg">
            Showcasing our finest work across residential and commercial spaces
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project.id}
              project={{
                id: project.id,
                title: project.title,
                service: project.service.title,
                image: project.image,
                description: project.description,
              }}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white font-semibold rounded-xl transition-all duration-300"
          >
            View All Projects <MdArrowForward size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const testimonials = [
  { name: "Ahmed Khan", role: "Homeowner", text: "Exceptional craftsmanship! The aluminium windows transformed our home. Professional team from start to finish." },
  { name: "Fatima Hassan", role: "Architect", text: "We've partnered with Meer Architectural on multiple commercial projects. Their attention to detail is outstanding." },
  { name: "Usman Malik", role: "Contractor", text: "Reliable, punctual, and high-quality work. Our go-to partner for all glass and aluminium installations." },
]

function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="text-blue-500 text-sm font-semibold uppercase tracking-widest">Testimonials</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            What Our Clients Say
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 relative"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, j) => (
                  <MdStar key={j} className="text-blue-500" size={16} />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="border-t border-gray-700 pt-3">
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const faqs = [
  { q: "What types of aluminium do you use?", a: "We use premium-grade aluminium alloys that are corrosion-resistant, lightweight, and designed for long-term durability in various weather conditions." },
  { q: "Do you offer custom designs?", a: "Yes, we specialize in custom fabrication. Our design team works with you to create bespoke solutions tailored to your specific requirements." },
  { q: "What is the typical project timeline?", a: "Timelines vary based on project scope. A standard residential window installation takes 1-2 weeks, while larger commercial projects may take 3-6 weeks." },
  { q: "Do you provide installation services?", a: "Yes, we offer professional installation for all our products. Our trained installation teams ensure precise fitting and finishing." },
  { q: "What areas do you serve?", a: "We serve clients across Pakistan, with a focus on residential and commercial projects in major cities and surrounding areas." },
  { q: "Do you offer warranty on your products?", a: "Yes, all our products come with a comprehensive warranty covering manufacturing defects. Please contact us for specific warranty details." },
]

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="text-blue-500 text-sm font-semibold uppercase tracking-widest">FAQ</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-blue-500 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`transition-all duration-300 ${openIndex === i ? "max-h-60 pb-5 px-5" : "max-h-0"}`}>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ContactCTASection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Start Your Project?
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Get in touch with our team for a free consultation and quote. 
          Let&apos;s bring your architectural vision to life.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25"
          >
            Get a Free Quote
          </Link>
          <a
            href="https://wa.me/923233541250"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-gray-600 hover:border-blue-600 text-gray-300 hover:text-blue-500 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MdPhone size={18} />
            WhatsApp Us
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default function HomePage() {
  const [projects, setProjects] = useState<ProjectResponse[]>([])
  const [services, setServices] = useState<ServiceResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/projects?limit=3&featured=true").then((r) => r.json()),
      fetch("/api/services").then((r) => r.json()),
    ])
      .then(([projectData, serviceData]) => {
        if (projectData.success) setProjects(projectData.data.projects)
        if (serviceData.success) setServices(serviceData.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="w-full bg-gray-900">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection services={services} />
        <WhyChooseUsSection />
        {!loading && projects.length > 0 && <FeaturedProjectsSection projects={projects} />}
        <TestimonialsSection />
        <FAQSection />
        <ContactCTASection />
      </main>
      <Footer />
    </div>
  )
}
