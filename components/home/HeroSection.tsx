"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import heroBg from "@/public/assets/hero-bg.avif";
import ParticalCluster from "./ParticalCluster";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { PelletCluster } from "./PelletCluster";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  /* ================= Scroll Parallax ================= */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* ================= Variants ================= */
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Altchemix Hero Section"
    >
      {/* ================= CINEMATIC BACKGROUND ================= */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0"
      >
        <Image
          src={heroBg}
          alt="Polymer masterbatch pellets"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover"
        />

        {/* WebGL Premium Layer */}
        <ParticalCluster />

        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay opacity-40 pointer-events-none" />

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-black/80" />

        {/* Moving Light Gradient */}
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-linear-to-r from-teal/10 via-transparent to-emerald-400/10 mix-blend-overlay"
        />
      </motion.div>

      {/* ================= Animated Noise Texture ================= */}
      <div className="absolute inset-0 noise-overlay opacity-40 pointer-events-none" />

      {/* ================= CONTENT ================= */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 page_container mx-auto px-6 lg:px-12 pt-32 pb-20"
      >
        <div className="max-w-4xl pt-6">
          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-6xl font-bold leading-[1.05] text-white"
          >
            Innovative{" "}
            <span className="bg-linear-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
              Color & Additive
            </span>{" "}
            Formulations for Responsible Polymers
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mt-8 text-xl md:text-2xl text-white/80 max-w-2xl"
          >
            Shaping a Sustainable Future Through Smart Material Science.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col sm:flex-row gap-5"
          >
            <Button
              size="xl"
              className="group bg-linear-to-r from-teal-500 to-emerald-500 text-white hover:scale-105 transition-all duration-300 shadow-2xl shadow-teal-500/30"
            >
              Contact Sales
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="xl"
              variant="outline"
              className="border-white/30 text-white backdrop-blur-md hover:bg-white/10 transition"
            >
              <Play className="mr-2" size={18} />
              View Products
            </Button>
          </motion.div>

          {/* Trust Row */}
          <div className="max-w-[90%]">
            <motion.div
              variants={fadeUp}
              className="mt-16 border-t border-white/30 pt-8"
            >
              <p className="text-sm text-white mb-6">
                Trusted by leading manufacturers worldwide
              </p>

              <div className="flex flex-wrap gap-10 text-white text-sm tracking-wider">
                {["ISO 9001", "REACH", "RoHS", "FDA Compliant"].map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.1, color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ================= Floating Glass Orb ================= */}

      {/* <motion.div
        className="hidden lg:block absolute right-20 top-[60%] -translate-y-1/2 z-20"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-90 h-90">
          <div className="absolute inset-0 rounded-full bg-teal-500/10 blur-3xl" />

          <motion.div
            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 shadow-2xl shadow-teal-500/40"
            style={{ top: "5%", left: "15%" }}
            animate={{ rotate: 360, x: [0, 15, -15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-2 left-3 w-6 h-6 bg-white/30 rounded-full blur-sm" />
          </motion.div>

          <motion.div
            className="absolute w-18 h-18 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-2xl shadow-cyan-500/40"
            style={{ top: "45%", left: "65%" }}
            animate={{ rotate: -360, y: [0, 20, -20, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-2 left-2 w-5 h-5 bg-white/30 rounded-full blur-sm" />
          </motion.div>

          <motion.div
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-emerald-300 to-green-600 shadow-2xl shadow-emerald-500/40"
            style={{ bottom: "10%", left: "30%" }}
            animate={{ rotate: 360, x: [0, -12, 12, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1 left-3 w-4 h-4 bg-white/30 rounded-full blur-sm" />
          </motion.div>

          <motion.div
            className="absolute w-22 h-22 rounded-full bg-gradient-to-br from-green-400 to-emerald-700 shadow-2xl shadow-green-500/40"
            style={{ top: "20%", right: "5%" }}
            animate={{ rotate: -360, y: [0, -18, 18, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-3 left-4 w-6 h-6 bg-white/30 rounded-full blur-sm" />
          </motion.div>

          <motion.div
            className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-teal-500 shadow-2xl shadow-sky-500/40"
            style={{ bottom: "5%", right: "25%" }}
            animate={{ rotate: 360, x: [0, 10, -10, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1 left-2 w-4 h-4 bg-white/30 rounded-full blur-sm" />
          </motion.div>

          <motion.div
            className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-emerald-200 to-teal-400 shadow-xl shadow-teal-400/30"
            style={{ top: "70%", left: "10%" }}
            animate={{ rotate: -360, y: [0, 14, -14, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1 left-2 w-3 h-3 bg-white/30 rounded-full blur-sm" />
          </motion.div>
        </div>
      </motion.div> */}

      <div className="hidden lg:block absolute right-20 top-[60%] -translate-y-1/2 z-20 w-90 h-90 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <Environment preset="studio" />

          <PelletCluster count={10} scale={0.9} />
        </Canvas>
      </div>
    </section>
  );
}
