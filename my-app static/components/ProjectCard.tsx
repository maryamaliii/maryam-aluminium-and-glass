'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index ? index * 0.1 : 0
      }
    },
    hover: {
      y: -12,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      className="group overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: '-100px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[280px] sm:h-[320px] lg:h-[340px] overflow-hidden">
        <motion.div variants={imageVariants}
          className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600/90 backdrop-blur-sm rounded-full border border-white/20">
            {project.service}
          </span>
        </div>
      </div>

      <div className="p-6 bg-white/5 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-200 leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;