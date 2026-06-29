"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import CompanyStory from "@/app/components/sections/CompanyStory"
import CoreValuesGrid from "@/app/components/sections/CoreValuesGrid"
import TrustMetrics from "@/app/components/sections/TrustMetrics"
import ProjectsSection from "@/components/ProjectsSection"
import ProcessWorkflow from "@/components/ProcessWorkflow"
import type { ProjectResponse } from "@/types"

const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), {
  loading: () => <div className="py-20 text-center text-gray-400">Loading...</div>,
})
const QuoteRequestForm = dynamic(() => import("@/components/QuoteRequestForm"), {
  loading: () => <div className="py-20 text-center text-gray-400">Loading...</div>,
})

export default function HomePageClient() {
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
    <div className="w-full bg-overlay">
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl w-full text-center text-white">
            <h1 className="hero-fade-in text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Meer Engineering
              </span>
              <span className="block mt-3 text-xl sm:text-2xl md:text-3xl font-medium text-gray-200">
                Where Precision Aluminium Meets Modern Glass Design
              </span>
            </h1>

            <p className="hero-fade-in hero-fade-in-delay-1 mt-6 text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
              We specialize in high-quality aluminium fabrication and modern glass
              solutions. From windows and doors to custom glass work, we deliver
              durability, precision, and professional finishing.
            </p>

            <div className="hero-fade-in hero-fade-in-delay-2 mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-lg bg-white px-8 py-4 text-base font-semibold text-gray-900 hover:bg-gray-100 transition text-center shadow-lg hover:shadow-xl"
              >
                Get a Free Quote
              </Link>

              <Link
                href="/services"
                className="w-full sm:w-auto rounded-lg border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 hover:border-white/50 transition text-center"
              >
                Our Services
              </Link>
            </div>
          </div>
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
                  <div className="pt-2 sm:pt-4 text-center">
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors text-sm sm:text-base group"
                    >
                      View All Projects
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
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
