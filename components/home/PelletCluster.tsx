"use client";

import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export function PelletCluster({ count = 12, scale = 1 }) {
  const groupRef = useRef<THREE.Group>(null!);

  const pellets = useMemo(() => {
    const colors = ["#14b8a6", "#10b981", "#06b6d4", "#34d399"];

    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
      ] as [number, number, number],
      scale: 0.2 + Math.random() * 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {pellets.map((pellet, i) => (
        <Float key={i} speed={1} floatIntensity={1}>
          <mesh position={pellet.position} scale={pellet.scale}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshPhysicalMaterial
              color={pellet.color}
              roughness={0.15}
              metalness={0}
              clearcoat={1}
              clearcoatRoughness={0.05}
              reflectivity={1}
              envMapIntensity={1.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
