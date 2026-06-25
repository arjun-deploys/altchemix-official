"use client";

import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const industries = [
  "Packaging",
  "Pipes & Agriculture",
  "Wire & Cable",
  "Fibres & Textiles",
  "Healthcare",
  "Appliances",
  "Custom OEM",
  "Other",
];

const products = [
  "Colour Masterbatch",
  "White Masterbatch",
  "Black Masterbatch",
  "Additive Masterbatch",
  "Custom Solutions",
];

export function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    product: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      alert("Submitted successfully ✅");

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        industry: "",
        product: "",
        message: "",
      });
    } catch (error) {
      alert("Something went wrong ❌");
    }
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
    <motion.div
      initial={!shouldReduceMotion ? { opacity: 100, x: 30 } : false}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-2xl p-8 lg:p-10 shadow-card"
        noValidate
      >
        <fieldset className="space-y-6">
          <legend className="sr-only">Contact Form</legend>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Smith"
            />
            <InputField
              label="Company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              placeholder="Acme Plastics Inc."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@acme.com"
            />
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <SelectField
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              options={industries}
            />
            <SelectField
              label="Product Interest"
              name="product"
              value={formData.product}
              onChange={handleChange}
              options={products}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors resize-none text-foreground"
              placeholder="Tell us about your project requirements..."
            />
          </div>
        </fieldset>

        <Button
          type="submit"
          variant="hero"
          size="xl"
          className="w-full group mt-8"
        >
          <span>Submit Inquiry</span>

          <Send
            className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
            focusable="false"
          />
        </Button>
      </form>
    </motion.div>
  );
}

/* ================= Reusable Fields ================= */

function InputField({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  placeholder,
}: any) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground mb-2"
      >
        {label} {required && "*"}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={name}
        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors text-foreground"
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
        className="block text-sm font-medium text-foreground mb-2"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors text-foreground"
      >
        <option value="">Select {label}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
