"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { usePageMetadata } from "@/lib/use-page-metadata";
import type { ProjectResponse, ServiceResponse } from "@/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ProjectsPage() {
  usePageMetadata(
    "Projects",
    "Explore our portfolio of premium aluminium and glass projects — residential and commercial installations crafted with precision."
  )
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then((r) => r.json()),
      fetch("/api/services").then((r) => r.json()),
    ])
      .then(([projectsData, servicesData]) => {
        if (projectsData.success) setProjects(projectsData.data.projects);
        if (servicesData.success) setServices(servicesData.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = activeFilter
    ? projects.filter((p) => p.service.slug === activeFilter)
    : projects;

  return (
    <div
      className="w-full min-h-screen"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Header />

        <main className="pt-20 sm:pt-24 pb-16 sm:pb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-20 px-6"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
            >
              Our <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">Projects</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto px-2 sm:px-0"
            >
              Discover our portfolio of premium aluminium and glass solutions crafted with precision and attention to detail.
            </motion.p>
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* Filter Buttons */}
                {services.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
                    <button
                      onClick={() => setActiveFilter("")}
                      className={`px-4 sm:px-5 py-2.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                        activeFilter === ""
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20"
                      }`}
                    >
                      All
                    </button>
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setActiveFilter(s.slug)}
                        className={`px-4 sm:px-5 py-2.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                          activeFilter === s.slug
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20"
                        }`}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                )}

                {/* No results */}
                {filteredProjects.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-gray-400 text-lg">No projects found in this category.</p>
                  </div>
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {filteredProjects.map((project, index) => (
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
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
