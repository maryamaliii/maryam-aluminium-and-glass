"use client"

import { motion, useInView } from "framer-motion"
import type { Variants } from "framer-motion"
import { useEffect, useRef, useState } from "react"

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

function useAnimatedCounter(target: string) {
  const match = target.match(/^(\d+(?:\.\d+)?)\s*(.*)$/)
  const cannotAnimate = !match || target.includes("/")
  const [count, setCount] = useState(target)
  const hasAnimated = useRef(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const inView = useInView(elementRef, { once: true, margin: "-50px" })
  const rafRef = useRef(0)
  const parsedRef = useRef({ numericPart: 0, suffix: "", isInteger: false })

  if (match) {
    parsedRef.current = {
      numericPart: parseFloat(match[1]),
      suffix: match[2],
      isInteger: Number.isInteger(parseFloat(match[1])),
    }
  }

  useEffect(() => {
    if (!inView || cannotAnimate || hasAnimated.current) return

    hasAnimated.current = true

    const { numericPart, suffix, isInteger } = parsedRef.current
    const duration = 2000
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * numericPart

      setCount(
        `${isInteger ? Math.floor(current) : current.toFixed(1)}${suffix}`
      )

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, target, cannotAnimate])

  return { count, ref: elementRef }
}

interface StatItem {
  number: string
  label: string
}

export default function TrustMetrics() {
  const stats: StatItem[] = [
    { number: "10+", label: "Years of Experience" },
    { number: "250+", label: "Projects Completed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Customer Support" },
  ]

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
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
              className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/30 transition-all duration-300 hover:bg-white/15 hover:shadow-lg hover:scale-105"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                <AnimatedCounter number={stat.number} />
              </div>
              <p className="text-base sm:text-lg text-gray-200">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          className="mt-16 text-center"
        >
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Over a decade of consistent delivery has earned us the trust of
            hundreds of satisfied clients. We&apos;re not just a service
            provider&mdash;we&apos;re a partner invested in your project&apos;s
            success.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

interface AnimatedCounterProps {
  number: string
}

function AnimatedCounter({ number }: AnimatedCounterProps) {
  const { count, ref } = useAnimatedCounter(number)

  return <span ref={ref}>{count}</span>
}
