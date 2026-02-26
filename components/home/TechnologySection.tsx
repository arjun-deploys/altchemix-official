"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Microscope,
  Beaker,
  Leaf,
  Factory,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import colorMasterbatch from "@/public/assets/color-masterbatch.jpg";
import customSolutions from "@/public/assets/custom-solutions.jpg";

/* ================= CONTENT ================= */

const technologies = [
  {
    icon: Microscope,
    title: "Custom Colour Development",
    description:
      "Precision colour formulation using advanced spectrophotometry for fast, accurate brand matching.",
    stats: "10,000+",
    statsLabel: "Colour Recipes",
    image: colorMasterbatch,
    alt: "Advanced laboratory colour matching using spectrophotometry equipment",
  },
  {
    icon: Beaker,
    title: "Rapid Prototyping & Sampling",
    description:
      "Accelerated development cycles with quick-turn samples and pilot-scale validation.",
  },
  {
    icon: Leaf,
    title: "Sustainability-Driven Solutions",
    description:
      "Eco-conscious formulations designed for recyclability and reduced environmental impact.",
  },
  {
    icon: Factory,
    title: "Advanced Compounding Technology",
    description:
      "Twin-screw extrusion systems delivering consistent dispersion, stability, and scalability.",
    stats: "99.9%",
    statsLabel: "Dispersion Consistency",
    image: customSolutions,
    alt: "Industrial twin-screw extrusion machinery for polymer compounding",
  },
  {
    icon: Shield,
    title: "Quality, Compliance & Innovation",
    description:
      "End-to-end support covering regulatory compliance, testing, and collaborative innovation.",
    badges: ["ISO 9001", "REACH"],
  },
];

/* ================= FEATURED CARD ================= */

function FeaturedCard({ tech, index }: any) {
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 280, damping: 28 });
  const sy = useSpring(y, { stiffness: 280, damping: 28 });

  const rotateX = useTransform(sy, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseEnter = () => {
    if (ref.current && !shouldReduceMotion) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    setHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current || shouldReduceMotion) return;

    const r = rectRef.current;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.article
      ref={ref}
      className="md:col-span-2 perspective-1000 will-change-transform transform-gpu"
      style={!shouldReduceMotion ? { rotateX, rotateY } : undefined}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      onMouseMove={onMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-labelledby={`tech-title-${index}`}
    >
      <motion.div
        className="relative h-80 rounded-3xl overflow-hidden"
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.45 }}
      >
        <Image
          src={tech.image}
          alt={tech.alt}
          fill
          priority={index === 0}
          quality={75}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />

        <div
          className="absolute inset-0 bg-linear-to-t from-graphite via-graphite/60 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div
            className="w-14 h-14 mb-5 rounded-xl glass flex items-center justify-center border border-teal/30"
            aria-hidden="true"
          >
            <tech.icon className="w-7 h-7 text-teal" />
          </div>

          <div className="flex items-end justify-between gap-6">
            <div>
              <h3
                id={`tech-title-${index}`}
                className="text-3xl font-bold text-white mb-2"
              >
                {tech.title}
              </h3>
              <p className="text-gray-200 max-w-md">{tech.description}</p>
            </div>

            {tech.stats && (
              <div className="text-right">
                <div className="text-4xl font-bold text-yellow-500">
                  {tech.stats}
                </div>
                <div className="text-sm text-white">{tech.statsLabel}</div>
              </div>
            )}
          </div>

          <motion.div
            className="mt-6"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          >
            <Button type="button" variant="glass">
              <span>
                Explore <span className="sr-only">{tech.title}</span>
              </span>

              <ArrowRight
                className="ml-2 w-4 h-4"
                aria-hidden="true"
                focusable="false"
              />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* ================= COMPACT CARD ================= */

function CompactCard({ tech, index }: any) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-8"
      aria-labelledby={`compact-title-${index}`}
    >
      <div
        className="w-12 h-12 rounded-xl bg-teal/15 flex items-center justify-center mb-5"
        aria-hidden="true"
      >
        <tech.icon className="w-6 h-6 text-teal" />
      </div>

      <h3 id={`compact-title-${index}`} className="text-xl font-semibold mb-3">
        {tech.title}
      </h3>

      <p className="text-muted-foreground leading-relaxed">
        {tech.description}
      </p>
    </motion.article>
  );
}

/* ================= WIDE CARD ================= */

function WideCard({ tech, index }: any) {
  return (
    <motion.article
      className="md:col-span-3 glass-card rounded-2xl p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      aria-labelledby={`wide-title-${index}`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div
          className="w-16 h-16 rounded-xl bg-teal/15 flex items-center justify-center"
          aria-hidden="true"
        >
          <tech.icon className="w-8 h-8 text-teal" />
        </div>

        <div className="flex-1">
          <h3 id={`wide-title-${index}`} className="text-2xl font-bold mb-2">
            {tech.title}
          </h3>
          <p className="text-muted-foreground mb-4">{tech.description}</p>

          <div className="flex gap-3 flex-wrap">
            {tech.badges?.map((b: string) => (
              <span
                key={b}
                className="px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-medium border border-teal/20"
              >
                <Sparkles className="inline w-3 h-3 mr-1" aria-hidden="true" />
                {b}
              </span>
            ))}
          </div>
        </div>

        <Button type="button" variant="teal">
          <span>View Certifications</span>

          <ArrowRight
            className="ml-2 w-4 h-4"
            aria-hidden="true"
            focusable="false"
          />
        </Button>
      </div>
    </motion.article>
  );
}

/* ================= SECTION ================= */

export function TechnologySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="technology"
      role="region"
      aria-labelledby="technology-heading"
      className="py-24 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 grid-overlay opacity-30"
        aria-hidden="true"
      />

      <div className="page_container mx-auto px-6 lg:px-12 relative z-10">
        <motion.header
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-teal uppercase tracking-widest mb-4">
            Services & Innovation
          </span>

          <h2
            id="technology-heading"
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Expertise That Drives Progress
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We combine advanced manufacturing, material science expertise, and
            sustainability-driven innovation to deliver high-performance polymer
            solutions worldwide.
          </p>
        </motion.header>

        <div className="grid md:grid-cols-3 gap-6">
          <FeaturedCard tech={technologies[0]} index={0} />
          <CompactCard tech={technologies[1]} index={1} />
          <CompactCard tech={technologies[2]} index={2} />
          <FeaturedCard tech={technologies[3]} index={3} />
          <WideCard tech={technologies[4]} index={4} />
        </div>
      </div>
    </section>
  );
}
