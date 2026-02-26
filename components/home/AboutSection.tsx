"use client";

import {
  Easing,
  motion,
  useInView,
  Variants,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, memo } from "react";
import { Palette, Award, Recycle, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const features = [
  {
    icon: Palette,
    title: "Custom Color & Fast Turnaround",
    text: "Precision-matched solutions delivered with speed and consistency.",
  },
  {
    icon: Award,
    title: "Certified Premium Quality",
    text: "Global standards ensuring reliability across every application.",
  },
  {
    icon: Recycle,
    title: "Sustainable Additive Systems",
    text: "Eco-ready formulations supporting circular plastic ecosystems.",
  },
  {
    icon: Wrench,
    title: "Technical & Application Expertise",
    text: "Hands-on support to optimize processing and performance.",
  },
];

const ease: Easing = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

/* ===============================
   3D CARD COMPONENT
================================ */

function TiltCard({ item }: any) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });

  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-teal/40 via-transparent to-purple-500/30"
    >
      <div
        className="relative rounded-2xl bg-background/80 backdrop-blur-xl p-7 h-full overflow-hidden transition-shadow duration-500 group-hover:shadow-2xl"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Floating Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-12 -right-12 w-40 h-40 bg-teal/20 blur-3xl rounded-full"
        />

        {/* Icon Layer */}
        <motion.div
          style={{ transform: "translateZ(50px)" }}
          className="relative z-10 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal/20 to-purple-500/20 mb-5 shadow-inner"
        >
          <item.icon className="w-6 h-6 text-teal" />
        </motion.div>

        {/* Title */}
        <motion.h3
          style={{ transform: "translateZ(40px)" }}
          className="relative z-10 text-base font-semibold mb-2"
        >
          {item.title}
        </motion.h3>

        {/* Text */}
        <motion.p
          style={{ transform: "translateZ(30px)" }}
          className="relative z-10 text-sm text-muted-foreground leading-relaxed"
        >
          {item.text}
        </motion.p>

        {/* Animated Border Glow */}
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl border border-teal/30 pointer-events-none"
        />
      </div>
    </motion.div>
  );
}

/* ===============================
   MAIN SECTION
================================ */

export const AboutSection = memo(function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-120px",
  });

  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden perspective-[1200px]"
    >
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute inset-0 grid-overlay opacity-30" />

      <div className="page_container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-[1fr_2fr] gap-16 items-center"
        >
          {/* LEFT */}
          <div>
            <motion.span
              variants={fadeUp}
              className="inline-block text-sm font-semibold uppercase tracking-widest text-teal mb-4"
            >
              About Us
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-3xl font-bold leading-tight mb-6"
            >
              Engineering Advanced
              <span className="gradient-text"> Polymer Solutions</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              We combine advanced manufacturing, material science expertise, and
              sustainable innovation to deliver premium masterbatch and additive
              solutions for demanding global industries.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10">
              <Link href="/about">
                <Button variant="hero" size="xl" className="group">
                  Know More
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-2 transition-transform duration-300"
                    size={18}
                  />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT GRID */}
          <motion.div
            variants={container}
            className="grid sm:grid-cols-2 gap-8"
          >
            {features.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <TiltCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});
