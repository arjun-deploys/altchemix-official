'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import {
  ShieldCheck,
  Sun,
  Bug,
  Flame,
  Droplet,
  Recycle,
  Zap,
  Snowflake,
  Wrench,
  Settings,
} from 'lucide-react';

const additives = [
  {
    icon: Droplet,
    title: 'Slip Additives',
    description: 'Improve surface smoothness and reduce friction.',
  },
  {
    icon: Sun,
    title: 'UV Stabilizers & Absorbers',
    description: 'Protect plastics from degradation under sunlight.',
  },
  {
    icon: ShieldCheck,
    title: 'VCI (Volatile Corrosion Inhibitors)',
    description: 'Prevent corrosion in sensitive applications.',
  },
  {
    icon: Bug,
    title: 'Anti-Rodent Additives',
    description: 'Safeguard cables and components from rodent damage.',
  },
  {
    icon: Zap,
    title: 'IV Boosters',
    description: 'Enhance intrinsic viscosity for PET and related polymers.',
  },
  {
    icon: Recycle,
    title: 'Recycling Support Additives',
    description: 'Odor absorbers and processability improvers for circularity.',
  },
  {
    icon: Flame,
    title: 'Flame Retardants',
    description: 'Superior fire resistance to meet safety standards.',
  },
  {
    icon: Snowflake,
    title: 'Anti-Fog Additives',
    description: 'Maintain clarity in packaging films and sheets.',
  },
  {
    icon: ShieldCheck,
    title: 'Antimicrobial Solutions',
    description: 'Protect surfaces from microbial growth.',
  },
  {
    icon: Zap,
    title: 'Anti-Static Additives',
    description: 'Reduce static build-up for safer handling.',
  },
  {
    icon: Wrench,
    title: 'Processing Aids',
    description: 'Optimize extrusion and molding efficiency.',
  },
  {
    icon: Settings,
    title: 'Tailor-Made Solutions',
    description: 'Customized formulations for unique performance needs.',
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function AdditiveCapabilitiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className='relative py-28 overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 bg-muted/20' />
      <div className='absolute inset-0 grid-overlay opacity-25' />

      <div className='page_container mx-auto px-6 lg:px-12 relative z-10'>
        {/* Header */}
        <motion.div
          ref={ref}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={container}
          className='max-w-3xl mb-16'
        >
          <motion.span
            variants={fadeUp}
            className='inline-block text-sm font-semibold uppercase tracking-widest text-teal mb-4'
          >
            Additive Capabilities
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className='text-4xl md:text-5xl font-bold leading-tight mb-6'
          >
            Performance-Driven
            <span className='gradient-text'> Additive Solutions</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className='text-lg text-muted-foreground leading-relaxed'
          >
            Our comprehensive range of additive masterbatches is engineered to
            enhance performance, durability, safety, and sustainability across
            diverse polymer applications.
          </motion.p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={container}
          className='grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10'
        >
          {additives.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className='flex gap-4 items-start'
            >
              <div className='w-10 h-10 rounded-lg glass flex items-center justify-center border border-border/50 shrink-0'>
                <item.icon className='w-5 h-5 text-teal' />
              </div>
              <div>
                <h4 className='text-base font-semibold mb-1'>{item.title}</h4>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom blueprint line */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px blueprint-line' />
    </section>
  );
}
