"use client";

import { motion, type Variants } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "We discuss your project requirements, budget, and timeline. Free site visit and assessment.",
  },
  {
    number: "02",
    title: "Design & Proposal",
    description: "Our team creates detailed designs, material recommendations, and a transparent quote.",
  },
  {
    number: "03",
    title: "Fabrication",
    description: "Precision manufacturing using quality aluminium and glass, with rigorous quality checks.",
  },
  {
    number: "04",
    title: "Installation",
    description: "Professional installation by experienced teams with minimal disruption to your space.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProcessWorkflow() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            How We Work
          </motion.h2>
          <motion.div variants={itemVariants} className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6" />
          <motion.p variants={itemVariants} className="text-lg text-gray-300 max-w-2xl mx-auto">
            A transparent, structured approach from consultation to completion.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(100%-0.5rem)] w-[calc(100%-1rem)] h-0.5 bg-gradient-to-r from-blue-500/40 to-transparent" />
              )}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 h-full hover:bg-gray-700/60 hover:shadow-xl group">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
