"use client";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Home, Package, Factory, Cpu, Phone, FileText, Shield, Map } from "lucide-react";
import Link from "next/link";

const sitemapData = [
  {
    category: "Main Pages",
    icon: Home,
    color: "teal",
    links: [
      { label: "Home", href: "/", anchor: false },
      { label: "About Us", href: "/#about", anchor: true },
      { label: "Industries", href: "/#industries", anchor: true },
      { label: "Products", href: "/#products", anchor: true },
      { label: "Technology & Innovation", href: "/#technology", anchor: true },
      { label: "Contact Us", href: "/#contact", anchor: true },
    ],
  },
  {
    category: "Products",
    icon: Package,
    color: "emerald",
    links: [
      { label: "Colour Masterbatch", href: "/#products", anchor: true },
      { label: "White Masterbatch", href: "/#products", anchor: true },
      { label: "Black Masterbatch", href: "/#products", anchor: true },
      { label: "Additive Masterbatch", href: "/#products", anchor: true },
      { label: "Custom Polymer Solutions", href: "/#products", anchor: true },
    ],
  },
  {
    category: "Industries Served",
    icon: Factory,
    color: "steel",
    links: [
      { label: "Packaging", href: "/#industries", anchor: true },
      { label: "Pipes & Agriculture", href: "/#industries", anchor: true },
      { label: "Wire & Cable", href: "/#industries", anchor: true },
      { label: "Fibres & Textiles", href: "/#industries", anchor: true },
      { label: "Healthcare", href: "/#industries", anchor: true },
      { label: "Appliances", href: "/#industries", anchor: true },
      { label: "Custom OEM Solutions", href: "/#industries", anchor: true },
    ],
  },
  {
    category: "Technology",
    icon: Cpu,
    color: "teal",
    links: [
      { label: "Colour Matching & Spectrometry", href: "/#technology", anchor: true },
      { label: "Application Testing Lab", href: "/#technology", anchor: true },
      { label: "Sustainable Formulations", href: "/#technology", anchor: true },
      { label: "Twin-Screw Extrusion Facility", href: "/#technology", anchor: true },
      { label: "Quality Control Systems", href: "/#technology", anchor: true },
    ],
  },
  {
    category: "Contact & Sales",
    icon: Phone,
    color: "emerald",
    links: [
      { label: "Contact Sales", href: "/#contact", anchor: true },
      { label: "Request a Quote", href: "/#contact", anchor: true },
      { label: "Technical Discussion", href: "/#contact", anchor: true },
      { label: "Download Product Brochure", href: "/#contact", anchor: true },
    ],
  },
  {
    category: "Resources",
    icon: FileText,
    color: "steel",
    links: [
      { label: "Technical Data Sheets", href: "#", anchor: false },
      { label: "Product Brochure", href: "#", anchor: false },
      { label: "Color Matching Guide", href: "#", anchor: false },
      { label: "Processing Guidelines", href: "#", anchor: false },
    ],
  },
  {
    category: "Legal",
    icon: Shield,
    color: "teal",
    links: [
      { label: "Privacy Policy", href: "/privacy", anchor: false },
      { label: "Terms & Conditions", href: "/terms", anchor: false },
      { label: "Sitemap", href: "/sitemap", anchor: false },
    ],
  },
];

const colorMap: Record<string, string> = {
  teal: "bg-teal/10 text-teal group-hover:bg-teal/20",
  emerald: "bg-emerald-deep/10 text-emerald-deep group-hover:bg-emerald-deep/20",
  steel: "bg-steel/10 text-steel group-hover:bg-steel/20",
};

const dotMap: Record<string, string> = {
  teal: "bg-teal",
  emerald: "bg-emerald-deep",
  steel: "bg-steel",
};

export default function Sitemap() {
  return (
     <main className="pt-32 pb-24">
      <div className="page_container mx-auto px-6 lg:px-12 relative z-10">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-teal/5 rounded-full blur-3xl pointer-events-none" />
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
              <span className="inline-block text-xs font-semibold text-teal uppercase tracking-widest m6-6 px-3 py-1 rounded-full border border-teal/20 bg-teal/5">
                Navigation
              </span>
              <div className="flex items-center gap-4 mt-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center">
                  <Map className="w-7 h-7 text-teal" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                  Site
                  <span className="bg-gradient-to-r from-emerald-deep to-teal bg-clip-text text-transparent">
                    map
                  </span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A complete overview of all pages and sections available on the 
                PolyCore Industries website.
              </p>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Grid */}
        <div className="container mx-auto px-6 lg:px-12 mt-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sitemapData.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="glass-card rounded-2xl p-6 border border-border/60 hover:border-teal/20 transition-all duration-300 group"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${colorMap[cat.color]}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{cat.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {cat.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="flex items-center justify-between text-sm text-muted-foreground hover:text-teal transition-colors group/link py-1"
                        >
                          <span className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-40 group-hover/link:opacity-100 transition-opacity ${dotMap[cat.color]}`} />
                            {link.label}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 glass-card rounded-2xl p-8 border border-border/60"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "7", label: "Site Sections" },
                { value: "5", label: "Product Lines" },
                { value: "7", label: "Industries Served" },
                { value: "4", label: "Resource Downloads" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-teal mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        </div>
      </main>
    
   
  );
}
