"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200); // loader duration

    return () => clearTimeout(timer);
  }, []);

  const letters = "ALTCHEMIX".split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="relative flex gap-1 text-4xl md:text-6xl font-bold tracking-[0.4em] text-white">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="relative"
              >
                {letter}
              </motion.span>
            ))}

            {/* Subtle glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1 }}
              className="absolute inset-0 blur-3xl bg-teal/30"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
