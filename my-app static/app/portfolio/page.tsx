'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

// Animation Variants
const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Mock data for projects - in a real app, this would come from an API or CMS
const projects = [
  {
    id: '1',
    title: 'Corporate Office Glass Walls',
    service: 'Commercial • Open Workspace',
    image: '/images/services/partitions/partition7.jpg',
    description: 'Frameless glass partitions enhanced natural light distribution while maintaining acoustic privacy in high-traffic areas.'
  },
  {
    id: '2',
    title: 'Residential Thermal Windows',
    service: 'Residential • Energy Efficiency',
    image: '/images/services/windows/windows2.jpg',
    description: 'Custom aluminium frames with thermal breaks reduced energy costs by 30% while improving indoor comfort.'
  },
  {
    id: '3',
    title: 'Modern Kitchen Renovation',
    service: 'Residential • Storage Solution',
    image: '/images/services/kitchen/kitchen1.jpg',
    description: 'Integrated glass and aluminium cabinetry created a seamless flow between kitchen and living spaces.'
  },
  {
    id: '4',
    title: 'Spa Interior Enhancement',
    service: 'Commercial • Aesthetic Impact',
    image: '/images/spa interior.jpg',
    description: 'Strategically placed mirrors expanded visual space and enhanced the calming atmosphere for guests.'
  },
  {
    id: '5',
    title: 'Executive Office Dividers',
    service: 'Commercial • Privacy Solution',
    image: '/images/services/partitions/partition2.jpg',
    description: 'Sound-dampening glass partitions maintained open office benefits while enabling confidential discussions.'
  },
  {
    id: '6',
    title: 'Master Bedroom Organization',
    service: 'Residential • Space Optimization',
    image: '/images/services/wardrobes/wardrobe6.jpg',
    description: 'Custom sliding systems maximized storage capacity while maintaining clean, uncluttered aesthetics.'
  },
  {
    id: '7',
    title: 'Staircase Safety Upgrade',
    service: 'Residential • Structural Enhancement',
    image: '/images/staircase.jpg',
    description: 'Modern balustrade system met safety codes while adding architectural interest to the main staircase.'
  },
  {
    id: '8',
    title: 'Living Room Transition',
    service: 'Residential • Spatial Flow',
    image: '/images/livingroom.jpg',
    description: 'Frameless glass doors eliminated visual barriers while maintaining temperature control between zones.'
  },
  {
    id: '9',
    title: 'Retail Entrance Solution',
    service: 'Commercial • Customer Appeal',
    image: '/images/storefront.jpg',
    description: 'Custom storefront design increased foot traffic by creating an inviting, transparent shopping experience.'
  }
];

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-transparent flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* Background Accent Elements */}
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
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white"
        >
          Project <span className="bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">Portfolio</span>
        </motion.h1>

        <motion.p
          variants={slideInRightVariants}
          className="text-xl sm:text-2xl text-slate-300 mb-8 leading-relaxed"
        >
          A curated collection of precision-crafted aluminium and glass solutions across residential and commercial spaces.
        </motion.p>

        <motion.div
          variants={fadeInVariants}
          className="flex justify-center"
        >
          <Link
            href="#showcase"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Explore Projects
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProjectShowcaseSection() {
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
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Proven Solutions
          </motion.h2>
          <motion.div variants={itemVariants} className="w-16 h-1 bg-gradient-to-r from-blue-600 to-slate-700 mx-auto mb-6"></motion.div>
          <motion.p variants={itemVariants} className="text-lg text-slate-600 max-w-2xl mx-auto">
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
            <ProjectCard key={project.id} project={project} index={index} />
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
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6"
        >
          Discuss Your Requirements
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xl text-slate-600 mb-8 leading-relaxed"
        >
          Each project in our portfolio began with a consultation. Schedule yours to explore
          how our precision craftsmanship can address your specific space challenges.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <Link
            href="/contact"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Schedule Consultation
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <div className="w-full" style={{
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    }}>
      {/* Black overlay with 20% opacity */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Header />

        <main className="w-full">
          <HeroSection />
          <ProjectShowcaseSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </div>
  );
}