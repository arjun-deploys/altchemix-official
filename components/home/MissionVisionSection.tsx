"use client";

import { useRef, useMemo } from "react";
import { motion, useInView, Variants, useReducedMotion } from "framer-motion";
import {
  Target,
  Eye,
  ShieldCheck,
  Recycle,
  Award,
  Users,
  Zap,
} from "lucide-react";

/* ================= CORE VALUES ================= */

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We act with honesty, transparency, and accountability in every decision and partnership.",
  },
  {
    icon: Recycle,
    title: "Responsibility",
    description:
      "We are committed to sustainable practices that protect our planet and communities.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We pursue superior quality, innovation, and reliability in every solution we deliver.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We work closely with our customers and teams to achieve shared, long-term success.",
  },
  {
    icon: Zap,
    title: "Agility",
    description:
      "We adapt quickly to evolving market needs and technological advancements.",
  },
];

/* ================= SECTION ================= */

export function MissionVisionSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 },
      },
    }),
    [shouldReduceMotion],
  );

  const fadeUp: Variants = useMemo(
    () => ({
      hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.6,
          ease: "easeOut",
        },
      },
    }),
    [shouldReduceMotion],
  );

  return (
    <section
      aria-labelledby="mission-vision-heading"
      className="relative overflow-hidden py-24"
    >
      {/* Background (non-blocking & decorative) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-muted/20 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay opacity-25 pointer-events-none"
      />

      <div className="page_container mx-auto relative z-10">
        {/* Hidden semantic heading for SEO */}
        <h2 id="mission-vision-heading" className="sr-only">
          Our Mission and Vision
        </h2>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.article
              variants={fadeUp}
              className="glass-card rounded-3xl p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl bg-teal/15 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Target className="w-7 h-7 text-teal" strokeWidth={1.8} />
                </div>

                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to revolutionize plastics by delivering
                sustainable, high-performance masterbatch and additive
                technologies that enable superior aesthetics, functionality, and
                cost-efficiency—while shaping a greener future.
              </p>
            </motion.article>

            {/* Vision */}
            <motion.article
              variants={fadeUp}
              className="glass-card rounded-3xl p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl bg-teal/15 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Eye className="w-7 h-7 text-teal" strokeWidth={1.8} />
                </div>

                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                To become the most trusted masterbatch and additive solutions
                partner across Asia-Pacific and beyond— recognized for
                pioneering innovation, uncompising reliability, and leadership
                in sustainable practices.
              </p>
            </motion.article>
          </div>
        </motion.div>
      </div>

      {/* Decorative divider */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px blueprint-line pointer-events-none"
      />
    </section>
  );
}
