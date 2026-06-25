"use client";

import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const shouldReduceMotion = useReducedMotion();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    product: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        industry: "",
        product: "",
        message: "",
      });

      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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
    <>
      {/* Loading Overlay */}
      {isSubmitting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-background/90 backdrop-blur-md flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-16 h-16 border-4 border-teal border-t-transparent rounded-full mx-auto"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg font-semibold"
            >
              Sending your inquiry...
            </motion.p>

            <p className="text-muted-foreground mt-2">
              Please wait while we process your request.
            </p>
          </div>
        </motion.div>
      )}

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              <CheckCircle2 className="h-20 w-20 text-green-500" />
            </motion.div>

            <DialogHeader className="mt-4">
              <DialogTitle className="text-2xl">
                Inquiry Submitted 🎉
              </DialogTitle>

              <DialogDescription className="mt-2 text-base">
                Thank you for contacting us.
                <br />
                Our team will review your requirements and get back to you
                shortly.
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Form */}
      <motion.div
        ref={ref}
        initial={!shouldReduceMotion ? { opacity: 0, x: 30 } : false}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: 0.15,
        }}
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
                placeholder="Tell us about your project requirements..."
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors resize-none text-foreground"
              />
            </div>
          </fieldset>

          <Button
            type="submit"
            variant="hero"
            size="xl"
            disabled={isSubmitting}
            className="w-full mt-8"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Inquiry
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </>
  );
}

/* ===========================
   Reusable Input Component
=========================== */

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
        {label}
        {required && " *"}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        autoComplete={name}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-colors text-foreground"
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

        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
