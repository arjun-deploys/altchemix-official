'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowRight,
  Package,
  Cable,
  Shirt,
  Heart,
  Home,
  Cog,
  Tractor,
  Car,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ================= CONTENT ================= */

const industries = [
  {
    id: 'packaging',
    icon: Package,
    title: 'Packaging',
    subtitle: 'Food & Consumer Goods',
    description:
      'Enhancing visual appeal, regulatory compliance and processing efficiency—while supporting recyclability and sustainability goals.',
    applications: [
      'Food packaging',
      'Flexible films',
      'Rigid containers',
      'Caps & closures',
    ],
    image:
      'https://plus.unsplash.com/premium_photo-1736583008967-d0e92d28ce23?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'wire-cable',
    icon: Cable,
    title: 'Wires & Cables',
    subtitle: 'Electrical Infrastructure',
    description:
      'Masterbatches engineered for superior insulation, durability, and electrical performance in demanding operating environments.',
    applications: [
      'Power cables',
      'Telecom cables',
      'Automotive wiring',
      'Industrial cables',
    ],
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&fit=crop',
  },

  {
    id: 'agriculture',
    icon: Tractor,
    title: 'Agriculture',
    subtitle: 'Films, Pipes & Nets',
    description:
      'UV-stable formulations for agricultural films, pipes, nets, and greenhouse applications—designed to withstand harsh conditions and extend product life.',
    applications: [
      'Greenhouse films',
      'Mulch films',
      'Irrigation pipes',
      'Agro nets',
    ],
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&fit=crop',
  },
  {
    id: 'appliances',
    icon: Home,
    title: 'Appliances',
    subtitle: 'Consumer Durables',
    description:
      'High-performance aesthetics combined with scratch resistance, thermal stability, and long-lasting durability for household appliances.',
    applications: [
      'White goods',
      'Small appliances',
      'Electronic housings',
      'HVAC components',
    ],
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&fit=crop',
  },
  {
    id: 'healthcare',
    icon: Heart,
    title: 'Healthcare',
    subtitle: 'Medical Applications',
    description:
      'Medical-grade solutions developed to meet global safety, hygiene, and regulatory compliance standards for critical healthcare applications.',
    applications: [
      'Medical devices',
      'Pharma packaging',
      'Diagnostic equipment',
      'Healthcare disposables',
    ],
    image:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&fit=crop',
  },
  {
    id: 'custom-compounds',
    icon: Layers,
    title: 'Custom Compound Solutions',
    subtitle: 'Engineered to Your Application Needs',
    description:
      'Custom-designed polymer compounds tailored to meet specific performance, processing, and regulatory requirements with consistent quality and long-term reliability.',
    applications: [
      'Injection molding applications',
      'Extrusion and blow molding',
    ],
    image:
      'https://plus.unsplash.com/premium_photo-1685082778205-8665f65e8c2c?w=1200&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D',
  },
];

/* ================= SECTION ================= */

export function IndustriesSection() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id='industries' className='py-32 relative overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 bg-linear-to-br from-emerald-deep via-primary to-graphite' />
      <div className='absolute inset-0 grid-overlay opacity-10' />
      <div className='absolute inset-0 noise-overlay' />

      {/* Glow effects */}
      <div className='absolute top-1/2 left-1/4 w-125 h-125 bg-teal/20 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-1/4 w-100 h-100 bg-emerald-light/10 rounded-full blur-3xl' />

      <div className='page_container mx-auto px-6 lg:px-12 relative z-10'>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <span className='inline-block text-sm font-semibold text-teal uppercase tracking-widest mb-4'>
            Industries We Serve
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-primary-foreground mb-6'>
            Tailored Solutions Across Industries
          </h2>
          <p className='text-xl text-stone max-w-3xl mx-auto'>
            Our masterbatch and additive technologies support diverse sectors
            with performance, compliance, and sustainability at their core.
          </p>
        </motion.div>

        {/* Selector Layout */}
        <div className='grid lg:grid-cols-12 gap-8 items-start'>
          {/* Left Menu */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='lg:col-span-4 space-y-1'
          >
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setActiveIndustry(industry)}
                className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 group flex items-center gap-4 ${
                  activeIndustry.id === industry.id
                    ? 'bg-teal/20 border-l-4 border-teal'
                    : 'hover:bg-primary-foreground/5 border-l-4 border-transparent'
                }`}
              >
                <industry.icon
                  className={`w-5 h-5 ${
                    activeIndustry.id === industry.id
                      ? 'text-teal'
                      : 'text-stone group-hover:text-primary-foreground'
                  }`}
                />
                <div>
                  <span
                    className={`block font-semibold ${
                      activeIndustry.id === industry.id
                        ? 'text-primary-foreground'
                        : 'text-stone group-hover:text-primary-foreground'
                    }`}
                  >
                    {industry.title}
                  </span>
                  <span className='text-sm text-steel-light'>
                    {industry.subtitle}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>

          {/* Right Content */}
          <div className='lg:col-span-8'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className='relative rounded-2xl overflow-hidden'
              >
                {/* Image */}
                <div className='relative w-full h-105 lg:h-130'>
                  <img
                    src={activeIndustry.image}
                    alt={activeIndustry.title}
                    className='absolute inset-0 w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-linear-to-t from-graphite via-graphite/60 to-transparent' />
                </div>

                {/* Content */}
                <div className='absolute bottom-0 left-0 right-0 p-8 lg:p-12'>
                  <h3 className='text-3xl font-bold text-primary-foreground mb-3'>
                    {activeIndustry.title}
                  </h3>

                  <p className='text-lg text-silver mb-6 max-w-2xl'>
                    {activeIndustry.description}
                  </p>

                  {activeIndustry && (
                    <div className='flex flex-wrap gap-2 mb-8'>
                      {activeIndustry?.applications.map((app) => (
                        <span
                          key={app}
                          className='px-3 py-1 rounded-full bg-primary-foreground/10 text-sm text-silver border border-primary-foreground/20'
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  )}

                  <Button variant='teal' size='lg' className='group'>
                    Explore Solutions
                    <ArrowRight
                      className='ml-2 group-hover:translate-x-1 transition-transform'
                      size={18}
                    />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
