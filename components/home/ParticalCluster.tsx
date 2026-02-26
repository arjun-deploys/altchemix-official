"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 8000; // more particles for full-screen richness
    const spread = 20; // larger area for true fullscreen depth
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }

    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.x += 0.0005;
    ref.current.rotation.y += 0.0008;

    // smooth mouse-based rotation
    ref.current.rotation.y += state.mouse.x * 0.002;
    ref.current.rotation.x += state.mouse.y * 0.002;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#14b8a6"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    if (!lightRef.current) return;

    lightRef.current.position.x = state.mouse.x * 10;
    lightRef.current.position.y = state.mouse.y * 6;
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={3} distance={50} color="#22d3ee" />
      <ambientLight intensity={0.35} />
    </>
  );
}

export default function HeroWebGL() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]} // sharp on retina
      >
        <Particles />
        <MouseLight />
      </Canvas>
    </div>
  );
}
