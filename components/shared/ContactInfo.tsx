"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { MapPin, Mail, ReceiptIndianRupee } from "lucide-react";
import React, { useRef } from "react";

export default function ContactInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={!shouldReduceMotion ? { opacity: 0, x: -30 } : false}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block text-sm font-semibold text-teal uppercase tracking-widest mb-4">
        Get in Touch
      </span>

      <h2
        id="contact-heading"
        className="text-4xl md:text-5xl font-bold text-foreground mb-6"
      >
        Let's Discuss Your Project
      </h2>

      <p className="text-lg text-muted-foreground mb-12">
        Whether you need custom color matching, additive solutions, or technical
        consultation, our team is ready to help you achieve optimal results.
      </p>

      {/* Contact Info */}
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <MapPin className="w-6 h-6 text-teal" />
          </div>
          <address className="not-italic">
            <h4 className="font-semibold text-foreground mb-1">
              ALTCHEMIX MATERIALS LLP
            </h4>
            <p className="text-muted-foreground">
              Plot No. PAP V-72/1/2, Wauli MIDC Chakan Phase 2 <br />
              Chakan Police Station, Khed, Pune
            </p>
          </address>
        </div>

        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <Mail className="w-6 h-6 text-teal" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Email</h4>
            <a
              href="mailto:info@altchemix.com"
              className="text-muted-foreground hover:text-teal transition-colors"
            >
              info@altchemix.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <ReceiptIndianRupee className="w-6 h-6 text-teal" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">GSTIN/UIN</h4>
            <p className="text-muted-foreground">27ACKFA2023M1ZE</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
