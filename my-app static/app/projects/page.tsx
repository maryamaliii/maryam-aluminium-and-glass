'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

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
    image: '/images/services/windows/windows2.jpg',
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
    image: '/images/services/fixtures/fixture8.jpg',
    description: 'Professional stair railings and balustrades with modern aluminium and glass design.'
  },
  {
    id: '8',
    title: 'Custom Glass Door',
    service: 'Windows & Doors',
    image: '/images/services/windows/windows4.jpg',
    description: 'Frameless glass doors that create seamless transitions between spaces.'
  },
  {
    id: '9',
    title: 'Retail Storefront',
    service: 'Custom Fabrication',
    image: '/images/storefront.jpg',
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

export default function ProjectsPage() {
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
      {/* dark overlay */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Header />

        <main className="pt-24 pb-20">
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-20 px-6"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Our <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">Projects</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-white/80 max-w-3xl mx-auto"
            >
              Discover our portfolio of premium aluminium and glass solutions crafted with precision and attention to detail.
            </motion.p>
          </motion.div>

          {/* Projects Grid */}
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}