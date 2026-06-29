'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';

// Mock data for projects - in a real app, this would come from an API or CMS
const projects = [
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
  },
  {
    id: '4',
    title: 'Mirror Installation',
    service: 'Mirrors',
    image: '/images/services/mirrors/mirror1.jpg',
    description: 'Custom decorative mirrors that enhance space and bring elegance to any interior.'
  },
  {
    id: '5',
    title: 'Office Partition System',
    service: 'Glass Partitions',
    image: '/images/services/partitions/partition2.jpg',
    description: 'Professional glass office dividers that create privacy while maintaining an open feel.'
  },
  {
    id: '6',
    title: 'Sliding Wardrobe',
    service: 'Wardrobes',
    image: '/images/services/wardrobes/wardrobe1.jpg',
    description: 'Space-saving sliding wardrobes with custom storage solutions and premium finishes.'
  },
  {
    id: '7',
    title: 'Balustrade System',
    service: 'Installation',
    image: '/images/services/fixtures/fixture1.jpg',
    description: 'Professional stair railings and balustrades with modern aluminium and glass design.'
  },
  {
    id: '8',
    title: 'Custom Glass Door',
    service: 'Windows & Doors',
    image: '/images/services/windows/windows2.jpg',
    description: 'Frameless glass doors that create seamless transitions between spaces.'
  },
  {
    id: '9',
    title: 'Retail Storefront',
    service: 'Custom Fabrication',
    image: '/images/services/custom/custom1.jpg',
    description: 'Custom aluminium and glass storefront solutions for commercial applications.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
  showViewAll = true
}: RecentProjectsProps) {
  const displayedProjects = projects.slice(0, limit);

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center mb-20 px-6"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {showViewAll && (
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View All Projects →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}