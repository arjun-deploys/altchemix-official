"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  Database,
  Globe,
  UserCheck,
  Bell,
  Trash2,
} from "lucide-react";

const sections = [
  {
    id: "overview",
    icon: Shield,
    title: "Overview",
    content: `PolyCore Industries ("we", "us", or "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or submit inquiries through our contact forms.

Please read this policy carefully. If you disagree with its terms, please discontinue use of our Site.`,
  },
  {
    id: "collection",
    icon: Database,
    title: "Information We Collect",
    content: `We collect information you voluntarily provide to us when you:

• Submit an inquiry or contact form (name, company, email, phone, industry, product interest, message)
• Download technical resources or product brochures
• Subscribe to industry updates or newsletters
• Request product samples or technical consultations

We also automatically collect certain technical data when you visit our Site, including IP address, browser type, operating system, referring URLs, and pages visited — solely for analytics and site improvement purposes.

We do not collect sensitive personal data such as financial information, government IDs, or health-related data.`,
  },
  {
    id: "use",
    icon: Eye,
    title: "How We Use Your Information",
    content: `We use the information we collect to:

• Respond to your inquiries and provide technical support
• Send requested product information, data sheets, and quotations
• Process and fulfil orders and service requests
• Improve our website content and user experience
• Send periodic communications about products and industry insights (with your consent)
• Comply with legal obligations and protect our legitimate business interests

We will not sell, trade, or rent your personal information to third parties for their marketing purposes.`,
  },
  {
    id: "sharing",
    icon: Globe,
    title: "Information Sharing",
    content: `We may share your information with:

• Internal Sales and Technical Teams who process your inquiry
• Authorised Distributors in your region (only when relevant to your inquiry)
• Service Providers who assist with website hosting, analytics, and communication tools — bound by confidentiality agreements
• Legal Authorities when required by law, court order, or to protect our rights

All third parties with whom we share data are required to maintain the confidentiality and security of your information.`,
  },
  {
    id: "security",
    icon: Lock,
    title: "Data Security",
    content: `We implement industry-standard technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These include:

• SSL/TLS encryption for all data transmitted to our Site
• Secure server infrastructure with regular security audits
• Access controls limiting data access to authorised personnel only
• Regular employee training on data protection practices

However, no method of internet transmission or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.`,
  },
  {
    id: "cookies",
    icon: UserCheck,
    title: "Cookies & Tracking",
    content: `We use cookies and similar tracking technologies to enhance your browsing experience. Cookies we use include:

• Essential Cookies — Required for Site functionality and navigation
• Analytics Cookies — Help us understand how visitors interact with the Site (e.g., Google Analytics)
• Preference Cookies — Remember your settings and preferences

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of the Site may not function properly if cookies are disabled.`,
  },
  {
    id: "rights",
    icon: Bell,
    title: "Your Rights",
    content: `Under applicable data protection laws, you have the right to:

• Access — Request a copy of the personal data we hold about you
• Correction — Request correction of inaccurate or incomplete data
• Deletion — Request erasure of your personal data ("right to be forgotten")
• Portability — Receive your data in a structured, machine-readable format
• Objection — Object to processing of your data for direct marketing
• Withdrawal — Withdraw consent at any time where processing is based on consent

To exercise any of these rights, please contact us at privacy@polycore.com. We will respond to all requests within 30 days.`,
  },
  {
    id: "retention",
    icon: Trash2,
    title: "Data Retention",
    content: `We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected, including legal, accounting, or reporting requirements.

• Inquiry data: Retained for 3 years from last contact
• Customer transaction data: Retained for 7 years as required by tax law
• Marketing opt-in data: Retained until you unsubscribe
• Website analytics data: Anonymised after 26 months

After retention periods expire, data is securely deleted or anonymised.`,
  },
  {
    id: "contact",
    icon: Shield,
    title: "Contact Us",
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact our Data Protection Officer:

PolyCore Industries — Data Protection
Email: privacy@polycore.com
Phone: +91 22 4567 8900
Address: Industrial Estate, Navi Mumbai, Maharashtra 400710, India

Last updated: March 2024`,
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="pt-32 pb-24">
      <div className="page_container mx-auto px-6 lg:px-12 relative z-10">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-deep/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-6 lg:px-12 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-teal transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <span className="inline-block text-xs font-semibold text-teal uppercase tracking-widest  px-3 py-1 rounded-full border border-teal/20 bg-teal/5 ml-6">
                Legal
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">
                Privacy{" "}
                <span className="bg-gradient-to-r from-emerald-deep to-teal bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Your privacy matters to us. This policy details exactly what
                data we collect, how we use it, and the rights you hold over
                your information.
              </p>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 lg:px-12 mt-16">
          <div className="lg:grid lg:grid-cols-[280px_1fr] gap-16">
            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-32 glass-card rounded-2xl p-6"
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                  Contents
                </p>
                <nav className="space-y-1">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-teal transition-colors py-1.5 pl-3 border-l-2 border-transparent hover:border-teal group"
                    >
                      <sec.icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </motion.div>
            </aside>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((sec, i) => (
                <SectionBlock key={sec.id} section={sec} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function SectionBlock({
  section,
  index,
}: {
  section: (typeof sections)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = section.icon;

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="glass-card rounded-2xl p-8 border border-border/60 hover:border-teal/20 transition-colors group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-teal/20 transition-colors">
          <Icon className="w-5 h-5 text-teal" />
        </div>
        <h2 className="text-xl font-bold text-foreground pt-1.5">
          {section.title}
        </h2>
      </div>
      <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm pl-14">
        {section.content}
      </div>
    </motion.div>
  );
}
