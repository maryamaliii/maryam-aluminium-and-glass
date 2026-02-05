"use client"

import { motion, useInView } from "framer-motion"
import type { Variants } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// Animation Variants (matching About page patterns)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
}

// Custom hook for animated counting
function useAnimatedCounter(target: string) {
  const [count, setCount] = useState<string>(target);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || hasAnimated) return;

    // Parse the target string to extract numeric part and suffix
    const match = target.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
    
    // If not a number or contains "/" (like "24/7"), don't animate
    if (!match || target.includes("/")) {
      setCount(target);
      setHasAnimated(true);
      return;
    }

    const numericPart = parseFloat(match[1]);
    const suffix = match[2];
    const isInteger = Number.isInteger(numericPart);

    setHasAnimated(true);

    let startTime: number | null = null;
    const duration = 1800; // 1.8 seconds for smooth premium feel

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for natural, premium acceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = easedProgress * numericPart;

      // Format the display value
      const displayValue = isInteger 
        ? Math.floor(currentValue) 
        : parseFloat(currentValue.toFixed(1));

      setCount(`${displayValue}${suffix}`);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final value is set exactly
        setCount(`${numericPart}${suffix}`);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup: cancel animation frame if component unmounts
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [inView, target, hasAnimated]);

  return { count, ref };
}

interface StatItem {
  number: string;
  label: string;
}

export default function TrustMetrics() {
  const stats: StatItem[] = [
    { number: "10+", label: "Years of Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Customer Support" },
  ]

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Stats Grid - matching About page dark glass style but lighter backdrop */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:scale-105"
            >
              <div
                ref={index < 3 ? undefined : undefined} // We'll add refs conditionally for animated items
                className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent mb-2"
              >
                <AnimatedCounter number={stat.number} />
              </div>
              <p className="text-lg text-slate-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Supporting Text - matching About page narrative style */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          className="mt-16 text-center"
        >
          <p className="text-xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Over a decade of consistent delivery has earned us the trust of
            hundreds of satisfied clients. We're not just a service provider—we're
            a partner invested in your project's success.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

interface AnimatedCounterProps {
  number: string;
}

function AnimatedCounter({ number }: AnimatedCounterProps) {
  const { count, ref } = useAnimatedCounter(number);

  return (
    <div ref={ref}>
      {count}
    </div>
  );
}
