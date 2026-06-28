"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { usePageMetadata } from "@/lib/use-page-metadata";
import type { ProjectResponse } from "@/types";

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-transparent flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          variants={slideInLeftVariants}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight text-white"
        >
          Project <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">Portfolio</span>
        </motion.h1>

        <motion.p
          variants={slideInRightVariants}
          className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0"
        >
          A curated collection of precision-crafted aluminium and glass solutions across residential and commercial spaces.
        </motion.p>

        <motion.div variants={fadeInVariants} className="flex justify-center px-4 sm:px-0">
          <Link
            href="#showcase"
            className="w-full sm:w-auto text-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Explore Projects
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProjectShowcaseSection({ projects }: { projects: ProjectResponse[] }) {
  return (
    <section
      id="showcase"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Proven Solutions
          </motion.h2>
          <motion.div variants={itemVariants} className="w-16 h-1 bg-gradient-to-r from-blue-600 to-slate-700 mx-auto mb-6"></motion.div>
          <motion.p variants={itemVariants} className="text-lg text-gray-200 max-w-2xl mx-auto">
            Real projects with measurable outcomes across residential and commercial environments.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
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
      </div>
    </section>
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
        className="max-w-4xl mx-auto text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6"
        >
          Discuss Your Requirements
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed"
        >
          Each project in our portfolio began with a consultation. Schedule yours to explore
          how our precision craftsmanship can address your specific space challenges.
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center px-4 sm:px-0">
          <Link
            href="/contact"
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Schedule Consultation
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function PortfolioPage() {
  usePageMetadata(
    "Portfolio",
    "Browse Meer Engineering portfolio — a curated collection of precision-crafted aluminium and glass solutions."
  )
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProjects(data.data.projects);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
      <div className="fixed inset-0 bg-black/30 pointer-events-none z-0" />

      <div className="relative z-10">
        <Header />

        <main className="w-full">
          <HeroSection />
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <ProjectShowcaseSection projects={projects} />
          )}
          <CTASection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
