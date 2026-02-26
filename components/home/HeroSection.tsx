"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import heroBg from "@/public/assets/hero-bg.avif";
import HeroWebGL from "./ParticalCluster";

/* ================= Lazy WebGL ================= */

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false },
);

const Environment = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Environment),
  { ssr: false },
);

const PelletCluster = dynamic(
  () => import("./PelletCluster").then((mod) => mod.PelletCluster),
  { ssr: false },
);

export function HeroSection() {
  const [load3D, setLoad3D] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  /* ================= CSS Parallax ================= */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty(
        "--hero-parallax",
        `${scrollY * 0.15}px`,
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= Load 3D After Idle ================= */
  useEffect(() => {
    setIsDesktop(window.innerWidth > 1024);

    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(() => {
        setLoad3D(true);
      });
      return () => (window as any).cancelIdleCallback(id);
    } else {
      setTimeout(() => setLoad3D(true), 2000);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ================= Background ================= */}
      <div className="absolute inset-0 hero-parallax">
        <Image
          src={heroBg}
          alt="Polymer masterbatch pellets"
          fill
          priority
          quality={85}
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
      </div>

      <HeroWebGL />

      {/* ================= Content ================= */}
      <div className="relative z-10 hero-text-parallax page_container mx-auto px-6 lg:px-12 pt-32 pb-20">
        <div className="max-w-4xl pt-6">
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold leading-[1.05] text-white">
            Innovative{" "}
            <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
              Color & Additive
            </span>{" "}
            Formulations for Responsible Polymers
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-white/80 max-w-2xl">
            Shaping a Sustainable Future Through Smart Material Science.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-5">
            <Button
              type="button"
              size="xl"
              className="group bg-gradient-to-r from-teal-500 to-emerald-500 text-white transition-transform hover:scale-105"
            >
              <span>Contact Sales</span>

              <ArrowRight
                className="ml-2 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
                focusable="false"
              />
            </Button>

            <Button
              type="button"
              size="xl"
              variant="outline"
              className="border-white/30 text-white backdrop-blur-md hover:bg-white/10"
            >
              <Play
                className="mr-2"
                size={18}
                aria-hidden="true"
                focusable="false"
              />

              <span>View Products</span>
            </Button>
          </div>

          <div className="mt-16 border-t border-white/30 pt-8 max-w-[90%]">
            <p className="text-sm text-white mb-6">
              Trusted by leading manufacturers worldwide
            </p>

            <div className="flex flex-wrap gap-10 text-white text-sm tracking-wider">
              {["ISO 9001", "REACH", "RoHS", "FDA Compliant"].map((item) => (
                <span
                  key={item}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3D Orb (Idle Loaded) ================= */}
      {isDesktop && load3D && (
        <div className="hidden lg:block absolute right-20 top-[60%] -translate-y-1/2 z-20 w-90 h-90 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 40 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: false,
              powerPreference: "high-performance",
            }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.3} />
            <Environment preset="studio" />
            <PelletCluster count={8} scale={0.9} />
          </Canvas>
        </div>
      )}
    </section>
  );
}
