"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import type { ProjectResponse } from "@/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface RecentProjectsProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showViewAll?: boolean;
}

export default function RecentProjects({
  title = "Recent Projects",
  subtitle = "Showcasing our finest work",
  limit = 3,
  showViewAll = true,
}: RecentProjectsProps) {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects?limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProjects(data.data.projects);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [limit]);

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
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
        )}

        {showViewAll && (
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors group"
            >
              View All Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
