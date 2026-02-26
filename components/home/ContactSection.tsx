'use client';

import { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Send, MapPin, Mail, ReceiptIndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const industries = [
  'Packaging',
  'Pipes & Agriculture',
  'Wire & Cable',
  'Fibres & Textiles',
  'Healthcare',
  'Appliances',
  'Custom OEM',
  'Other',
];

const products = [
  'Colour Masterbatch',
  'White Masterbatch',
  'Black Masterbatch',
  'Additive Masterbatch',
  'Custom Solutions',
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    product: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: connect API endpoint here

    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      industry: '',
      product: '',
      message: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id='contact'
      role='region'
      aria-labelledby='contact-heading'
      className='py-32 relative overflow-hidden'
    >
      {/* Background */}
      <div className='absolute inset-0 bg-muted/30' aria-hidden='true' />
      <div
        className='absolute inset-0 grid-overlay opacity-30'
        aria-hidden='true'
      />

      <div className='page_container mx-auto px-6 lg:px-12 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-16'>
          {/* Left Info */}
          <motion.div
            ref={ref}
            initial={!shouldReduceMotion ? { opacity: 0, x: -30 } : false}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className='inline-block text-sm font-semibold text-teal uppercase tracking-widest mb-4'>
              Get in Touch
            </span>

            <h2
              id='contact-heading'
              className='text-4xl md:text-5xl font-bold text-foreground mb-6'
            >
              Let's Discuss Your Project
            </h2>

            <p className='text-lg text-muted-foreground mb-12'>
              Whether you need custom color matching, additive solutions, or
              technical consultation, our team is ready to help you achieve
              optimal results.
            </p>

            {/* Contact Info */}
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div
                  className='w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0'
                  aria-hidden='true'
                >
                  <MapPin className='w-6 h-6 text-teal' />
                </div>
                <address className='not-italic'>
                  <h4 className='font-semibold text-foreground mb-1'>
                    ALTCHEMIX MATERIALS LLP
                  </h4>
                  <p className='text-muted-foreground'>
                    Plot No. PAP V-72/1/2, Wauli MIDC Chakan Phase 2 <br />
                    Chakan Police Station, Khed, Pune
                  </p>
                </address>
              </div>

              <div className='flex items-start gap-4'>
                <div
                  className='w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0'
                  aria-hidden='true'
                >
                  <Mail className='w-6 h-6 text-teal' />
                </div>
                <div>
                  <h4 className='font-semibold text-foreground mb-1'>Email</h4>
                  <a
                    href='mailto:info@altchemix.com'
                    className='text-muted-foreground hover:text-teal transition-colors'
                  >
                    info@altchemix.com
                  </a>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div
                  className='w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0'
                  aria-hidden='true'
                >
                  <ReceiptIndianRupee className='w-6 h-6 text-teal' />
                </div>
                <div>
                  <h4 className='font-semibold text-foreground mb-1'>
                    GSTIN/UIN
                  </h4>
                  <p className='text-muted-foreground'>27ACKFA2023M1ZE</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={!shouldReduceMotion ? { opacity: 0, x: 30 } : false}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className='glass-card rounded-2xl p-8 lg:p-10 shadow-card'
              noValidate
            >
              <fieldset className='space-y-6'>
                <legend className='sr-only'>Contact Form</legend>

                <div className='grid md:grid-cols-2 gap-6'>
                  <InputField
                    label='Full Name'
                    name='name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='John Smith'
                  />
                  <InputField
                    label='Company'
                    name='company'
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder='Acme Plastics Inc.'
                  />
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <InputField
                    label='Email'
                    name='email'
                    type='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='john@acme.com'
                  />
                  <InputField
                    label='Phone'
                    name='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='+1 234 567 8900'
                  />
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <SelectField
                    label='Industry'
                    name='industry'
                    value={formData.industry}
                    onChange={handleChange}
                    options={industries}
                  />
                  <SelectField
                    label='Product Interest'
                    name='product'
                    value={formData.product}
                    onChange={handleChange}
                    options={products}
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-foreground mb-2'
                  >
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className='w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors resize-none text-foreground'
                    placeholder='Tell us about your project requirements...'
                  />
                </div>
              </fieldset>

              <Button
                type='submit'
                variant='hero'
                size='xl'
                className='w-full group mt-8'
                aria-label='Submit contact inquiry'
              >
                Submit Inquiry
                <Send
                  className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform'
                  aria-hidden='true'
                />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================= Reusable Fields ================= */

function InputField({
  label,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  placeholder,
}: any) {
  return (
    <div>
      <label
        htmlFor={name}
        className='block text-sm font-medium text-foreground mb-2'
      >
        {label} {required && '*'}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={name}
        className='w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors text-foreground'
        placeholder={placeholder}
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }: any) {
  return (
    <div>
      <label
        htmlFor={name}
        className='block text-sm font-medium text-foreground mb-2'
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className='w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors text-foreground'
      >
        <option value=''>Select {label}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
