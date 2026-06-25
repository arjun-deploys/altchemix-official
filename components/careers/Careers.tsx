"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  ArrowUpRight,
  Heart,
  GraduationCap,
  Plane,
  Trophy,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const departments = [
  "All",
  "R&D",
  "Manufacturing",
  "Sales",
  "Quality",
  "Operations",
];

const openings = [
  {
    id: 1,
    title: "Senior Polymer Chemist",
    department: "R&D",
    location: "Navi Mumbai, India",
    type: "Full-time",
    experience: "5-8 years",
    description:
      "Lead colour matching and additive formulation projects with cross-functional teams.",
  },
  {
    id: 2,
    title: "Production Engineer — Twin Screw",
    department: "Manufacturing",
    location: "Navi Mumbai, India",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "Optimise twin-screw extrusion lines for precision dispersion and quality output.",
  },
  {
    id: 3,
    title: "Technical Sales Manager — North India",
    department: "Sales",
    location: "Delhi, India",
    type: "Full-time",
    experience: "6-10 years",
    description:
      "Build relationships with plastics manufacturers across North India region.",
  },
  {
    id: 4,
    title: "Quality Control Analyst",
    department: "Quality",
    location: "Navi Mumbai, India",
    type: "Full-time",
    experience: "2-4 years",
    description:
      "Conduct spectrometry, rheology, and mechanical testing on incoming and outgoing batches.",
  },
  {
    id: 5,
    title: "Application Development Engineer",
    department: "R&D",
    location: "Navi Mumbai, India",
    type: "Full-time",
    experience: "4-7 years",
    description:
      "Partner with customers on application trials and scale-up support.",
  },
  {
    id: 6,
    title: "Supply Chain Lead",
    department: "Operations",
    location: "Navi Mumbai, India",
    type: "Full-time",
    experience: "5-8 years",
    description:
      "Manage raw material procurement, vendor relationships, and inventory planning.",
  },
  {
    id: 7,
    title: "Export Sales Executive",
    department: "Sales",
    location: "Navi Mumbai, India",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "Drive growth in Southeast Asia, Middle East, and African markets.",
  },
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description:
      "Comprehensive medical cover for you and your family, plus on-site wellness programmes.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description:
      "Sponsored certifications, technical conferences, and an annual learning budget.",
  },
  {
    icon: Plane,
    title: "Global Exposure",
    description:
      "Travel opportunities to international trade shows and partner facilities.",
  },
  {
    icon: Trophy,
    title: "Performance Rewards",
    description:
      "Competitive variable pay, milestone bonuses, and long-term incentive plans.",
  },
];

export default function Careers() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = openings.filter((o) => {
    const matchDept = filter === "All" || o.department === filter;
    const matchSearch =
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.location.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <main className="pt-32 pb-24">
      <div className="page_container mx-auto px-6 lg:px-12 relative z-10">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl pointer-events-none" />
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
              <span className="inline-block text-xs font-semibold text-teal uppercase tracking-widest ml-6 px-3 py-1 rounded-full border border-teal/20 bg-teal/5">
                Careers
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">
                Build the future of{" "}
                <span className="bg-gradient-to-r from-emerald-deep to-teal bg-clip-text text-transparent">
                  polymers
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Join 500+ engineers, chemists, and operators shaping how the
                world's most demanding manufacturers colour and engineer their
                plastics.
              </p>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Benefits */}
        <div className="container mx-auto px-6 lg:px-12 mt-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-6 border border-border/60 hover:border-teal/25 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center mb-4 group-hover:bg-teal/20 transition-colors">
                  <b.icon className="w-5 h-5 text-teal" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Open Roles */}
        <div className="container mx-auto px-6 lg:px-12 mt-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-semibold text-teal uppercase tracking-widest">
                Open Roles
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
                {filtered.length}{" "}
                {filtered.length === 1 ? "opening" : "openings"} live
              </h2>
            </div>
            <div className="flex items-center gap-2 w-full md:w-72 px-4 py-2.5 rounded-xl border border-border bg-muted/30 focus-within:border-teal focus-within:ring-1 focus-within:ring-teal/30 transition-all">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search roles or locations"
                className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Dept filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === d
                    ? "bg-teal text-accent-foreground shadow-glow"
                    : "border border-border bg-muted/30 text-muted-foreground hover:border-teal/40 hover:text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Listings */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center border border-border/60">
                <p className="text-muted-foreground">
                  No roles match your filters. Try a different search.
                </p>
              </div>
            ) : (
              filtered.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  whileHover={{ x: 4 }}
                  className="glass-card rounded-2xl p-6 border border-border/60 hover:border-teal/30 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-semibold text-teal uppercase tracking-widest px-2 py-0.5 rounded-full bg-teal/10 border border-teal/20">
                          {job.department}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-teal transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-3">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5" /> {job.experience}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="heroOutline"
                      size="default"
                      className="flex-shrink-0"
                    >
                      Apply Now
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-6 lg:px-12 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-10 md:p-14 border border-border/60 text-center relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 relative">
              Don't see your role?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 relative">
              We're always interested in meeting exceptional polymer talent.
              Send us your résumé and we'll reach out when the right opportunity
              opens.
            </p>
            <div className="relative">
              <a href="mailto:careers@polycore.com">
                <Button variant="hero" size="lg">
                  Email careers@polycore.com
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
