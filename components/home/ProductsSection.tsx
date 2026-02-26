"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Palette,
  Circle,
  CircleDot,
  FlaskConical,
  Cog,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import colorMasterbatch from "@/public/assets/color-masterbatch.jpg";
import whiteMasterbatch from "@/public/assets/white-masterbatch.jpg";
import blackMasterbatch from "@/public/assets/black-masterbatch.jpg";
import additiveMasterbatch from "@/public/assets/additive-masterbatch.jpg";
import customSolutions from "@/public/assets/custom-solutions.jpg";

const products = [
  {
    id: "color",
    icon: Palette,
    title: "Color Masterbatches",
    description:
      "Vibrant, consistent pigments with superior dispersion and long-term color stability across polymer systems.",
    features: ["Wide color gamut", "Precision matching", "Multi-polymer use"],
    image: colorMasterbatch,
    accent: "from-rose-500/20 to-amber-500/20",
  },
  {
    id: "smart",
    icon: Sparkles,
    title: "Smart Masterbatches",
    description:
      "Intelligent blends combining color with functional additives to deliver aesthetics and performance in one solution.",
    features: ["Color + function", "Process efficiency", "Application-driven"],
    image: whiteMasterbatch,
    accent: "from-slate-200/30 to-white/20",
  },
  {
    id: "black",
    icon: CircleDot,
    title: "Specialty Black Masterbatches",
    description:
      "Deep, rich blacks engineered for high opacity, conductivity options, and demanding thermal conditions.",
    features: ["High jetness", "Conductive grades", "Thermal stability"],
    image: blackMasterbatch,
    accent: "from-slate-800/30 to-slate-600/20",
  },
  {
    id: "additive",
    icon: FlaskConical,
    title: "Additive Masterbatches",
    description:
      "Functional additives designed to enhance durability, performance, and sustainability in real-world applications.",
    features: [
      "UV & heat stability",
      "Flame retardancy",
      "Process enhancement",
    ],
    image: additiveMasterbatch,
    accent: "from-teal/20 to-emerald-deep/20",
  },
  {
    id: "custom",
    icon: Cog,
    title: "Custom Solutions",
    description:
      "Bespoke masterbatch formulations developed in close collaboration with your technical and R&D teams.",
    features: [
      "Tailored formulations",
      "Pilot & scale-up support",
      "Dedicated technical partnership",
    ],
    image: customSolutions,
    accent: "from-teal/20 to-emerald-deep/10",
  },
];

// Standard product card with 3D tilt
function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group cursor-pointer perspective-1000 rounded-xl border border-border/20"
    >
      <motion.div
        className="glass-card  overflow-hidden h-full rounded-xl"
        animate={{
          y: isHovered ? -10 : 0,
          boxShadow: isHovered
            ? "0 30px 60px -15px hsl(var(--teal) / 0.3)"
            : "0 10px 30px -10px hsl(var(--foreground) / 0.1)",
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Image */}
        <div className="aspect-3/2 relative overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.15 : 1 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-graphite/90 via-graphite/40 to-transparent" />

          {/* Colored accent overlay */}
          <motion.div
            className={`absolute inset-0 bg-linear-to-br ${product.accent} opacity-0`}
            animate={{ opacity: isHovered ? 0.5 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Light sweep effect */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "200%" : "-100%" }}
            transition={{ duration: 0.8 }}
          />

          {/* Floating particles */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: -60,
                      x: (Math.random() - 0.5) * 40,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className="absolute bottom-0 left-1/2 w-1.5 h-1.5 rounded-full bg-teal/60"
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Icon badge with pulse */}
          <motion.div
            className="absolute top-4 right-4 w-12 h-12 rounded-xl glass flex items-center justify-center border border-white/20"
            animate={
              isHovered
                ? {
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 0 hsl(var(--teal) / 0.4)",
                      "0 0 0 10px hsl(var(--teal) / 0)",
                    ],
                  }
                : { scale: 1 }
            }
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          >
            <product.icon className="w-6 h-6 text-teal" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 bg-linear-to-t from-teal/5 to-transparent opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.h3
            className="text-xl font-bold text-foreground mb-2 relative z-10"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {product.title}
          </motion.h3>

          <motion.p
            className="text-muted-foreground text-sm mb-4 line-clamp-2 relative z-10"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            {product.description}
          </motion.p>

          {/* Animated CTA */}
          <motion.div
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <Button
              variant="ghost"
              className="w-full group/btn justify-between hover:bg-teal/10"
            >
              <span>View Details</span>
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Wide Custom Solutions card spanning 2 columns
function CustomSolutionsCard({ product }: { product: (typeof products)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="md:col-span-2 relative group cursor-pointer perspective-1000"
    >
      <motion.div
        className="relative  rounded-xl h-full overflow-hidden border border-border/50"
        animate={{
          y: isHovered ? -6 : 0,
          boxShadow: isHovered
            ? "0 25px 50px -15px hsl(var(--teal) / 0.25)"
            : "0 0 0 0 transparent",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-graphite via-graphite/80 to-transparent" />

        {/* Light sweep */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-teal/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "200%" : "-100%" }}
          transition={{ duration: 0.8 }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-center max-w-md">
          {/* Icon badge with pulse */}
          <motion.div
            className="w-12 h-12 mb-5 rounded-xl glass flex items-center justify-center border border-white/20"
            animate={
              isHovered
                ? {
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 0 hsl(var(--teal) / 0.4)",
                      "0 0 0 10px hsl(var(--teal) / 0)",
                    ],
                  }
                : { scale: 1 }
            }
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          >
            <product.icon className="w-6 h-6 text-teal" />
          </motion.div>

          <motion.h3
            className="text-2xl lg:text-3xl font-semibold text-primary-foreground mb-3"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {product.title}
          </motion.h3>

          <p className="text-silver mb-6">{product.description}</p>

          <motion.div
            animate={{ y: isHovered ? 0 : 5, opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Button variant="teal" className="group/btn">
              Start Project
              <motion.span animate={{ x: isHovered ? 3 : 0 }}>
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/30 to-background" />
      <div className="absolute inset-0 grid-overlay opacity-30" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-teal/5 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-emerald-deep/5 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -40, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <div className="page_container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header with enhanced animation */}
        <motion.div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block text-sm font-semibold text-teal uppercase tracking-widest mb-4 px-4 py-2 rounded-full bg-teal/10 border border-teal/20"
          >
            Product Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Precision-Engineered Masterbatches
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            From vibrant colors to advanced functional additives, our
            comprehensive range delivers consistent performance across all
            polymer applications.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Row 1: 3 cards */}
          {products.slice(0, 3).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}

          {/* Row 2: 1 regular card + Custom Solutions (2 cols) */}
          <ProductCard product={products[3]} index={3} />
          <CustomSolutionsCard product={products[4]} />
        </div>
      </div>
    </section>
  );
}
