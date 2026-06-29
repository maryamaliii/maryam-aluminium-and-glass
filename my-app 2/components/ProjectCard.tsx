"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  service: string;
  image: string;
  description: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index ? index * 0.1 : 0 },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className="group overflow-hidden rounded-xl bg-gray-800 border border-gray-700 shadow-lg hover:shadow-xl hover:border-blue-600/30 transition-all duration-300"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="relative h-[260px] sm:h-[300px] overflow-hidden">
        <motion.div variants={imageVariants} className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600/90 rounded-full">
            {project.service}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
