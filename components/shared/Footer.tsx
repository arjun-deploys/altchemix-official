"use client";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Youtube, Mail } from "lucide-react";
import BrandLogo from "./BrandLogo";
import Link from "next/link";

const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "/careers" },
    { label: "News & Updates", href: "/news" },
    { label: "Sustainability", href: "#" },
  ],
  products: [
    { label: "Colour Masterbatch", href: "#products" },
    { label: "White Masterbatch", href: "#products" },
    { label: "Black Masterbatch", href: "#products" },
    { label: "Additive Masterbatch", href: "#products" },
    { label: "Custom Solutions", href: "#products" },
  ],
  industries: [
    { label: "Packaging", href: "#industries" },
    { label: "Pipes & Agriculture", href: "#industries" },
    { label: "Wire & Cable", href: "#industries" },
    { label: "Healthcare", href: "#industries" },
  ],
  resources: [
    { label: "Technical Data Sheets", href: "#" },
    { label: "Product Brochure", href: "#" },
    { label: "Color Matching Guide", href: "#" },
    { label: "Processing Guidelines", href: "#" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-graphite text-primary-foreground relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-deep via-primary to-graphite" />
      <div className="absolute inset-0 grid-overlay opacity-10" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/4 w-125 h-125 bg-teal/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-emerald-light/10 rounded-full blur-3xl" />

      {/* Main Footer */}
      <div className="page_container mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="pb-6">
              <BrandLogo variant="light" />
            </div>
            <p className="text-silver leading-relaxed mb-6">
              Global leader in masterbatch and additive solutions for the
              plastics industry. Engineering polymer excellence since 1998.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-teal/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-silver hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-silver hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Industries</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-silver hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-silver hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="page_container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white">
            <p>© 2026 Altchemix Industries. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                target="_blank"
                className="text-xs hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                target="_blank"
                className="text-xs hover:text-primary-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                target="_blank"
                className="text-xs hover:text-primary-foreground transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
