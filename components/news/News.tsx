
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Innovation",
  "Sustainability",
  "Company",
  "Industry",
  "Awards",
];

const featured = {
  category: "Innovation",
  date: "March 12, 2024",
  readTime: "6 min read",
  title:
    "PolyCore launches next-gen bio-based masterbatch range for food packaging",
  excerpt:
    "Our R&D team unveils a portfolio of compostable colour and additive masterbatches engineered for direct food contact, reducing carbon footprint by up to 40% versus conventional formulations.",
};

const articles = [
  {
    category: "Sustainability",
    date: "March 4, 2024",
    readTime: "5 min",
    title:
      "Closing the loop: how recycled-content masterbatches are reshaping packaging",
    excerpt:
      "A deep dive into formulating masterbatches for PCR substrates without compromising colour consistency.",
  },
  {
    category: "Company",
    date: "February 22, 2024",
    readTime: "3 min",
    title: "PolyCore expands Navi Mumbai facility with third twin-screw line",
    excerpt:
      "Adding 8,000 MT of annual capacity to meet growing demand across Southeast Asia.",
  },
  {
    category: "Awards",
    date: "February 14, 2024",
    readTime: "2 min",
    title: "Recognised among India's Top 50 Manufacturing Innovators",
    excerpt:
      "Industry Today award acknowledges two decades of R&D leadership in polymer additives.",
  },
  {
    category: "Industry",
    date: "January 30, 2024",
    readTime: "7 min",
    title:
      "UV stabiliser trends: what agriculture film manufacturers should know in 2024",
    excerpt:
      "New regulations and farmer expectations are pushing 5-year film durability to the standard baseline.",
  },
  {
    category: "Innovation",
    date: "January 18, 2024",
    readTime: "4 min",
    title:
      "Why ΔE < 1.0 matters more than you think in brand-critical packaging",
    excerpt:
      "How spectrometry-driven colour matching prevents costly market recalls and rebrand cycles.",
  },
  {
    category: "Company",
    date: "January 5, 2024",
    readTime: "3 min",
    title: "PolyCore named preferred supplier by leading global appliance OEM",
    excerpt:
      "Multi-year agreement covers white and additive masterbatches for white goods production.",
  },
  {
    category: "Sustainability",
    date: "December 20, 2023",
    readTime: "6 min",
    title: "Scope 3 emissions: a masterbatch supplier's roadmap to net zero",
    excerpt:
      "Sharing our public commitment, baselines, and the technology bets we're making.",
  },
  {
    category: "Industry",
    date: "December 8, 2023",
    readTime: "5 min",
    title:
      "Flame retardant additives for wire & cable — meeting the new IS standards",
    excerpt:
      "Practical guidance for cable compounders navigating updated Indian fire-safety norms.",
  },
];

const categoryColors: Record<string, string> = {
  Innovation: "text-teal bg-teal/10 border-teal/20",
  Sustainability: "text-emerald-deep bg-emerald-deep/10 border-emerald-deep/20",
  Company: "text-steel bg-steel/10 border-steel/20",
  Industry: "text-teal bg-teal/10 border-teal/20",
  Awards: "text-emerald-deep bg-emerald-deep/10 border-emerald-deep/20",
};

export default function News() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? articles : articles.filter((a) => a.category === filter);

  return (
    <main className="pt-32 pb-24">
      <div className="page_container mx-auto px-6 lg:px-12 relative z-10">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-teal/5 rounded-full blur-3xl pointer-events-none" />
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
                Newsroom
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">
                News &{" "}
                <span className="bg-gradient-to-r from-emerald-deep to-teal bg-clip-text text-transparent">
                  Updates
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Product launches, R&D breakthroughs, industry insights, and the
                moments that define our journey.
              </p>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Featured */}
        <div className="container mx-auto px-6 lg:px-12 mt-16">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl border border-border/60 hover:border-teal/25 transition-all duration-300 group cursor-pointer overflow-hidden grid lg:grid-cols-[1.1fr_1fr]"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-gradient-to-br from-emerald-deep/20 via-teal/10 to-background">
              <div className="absolute inset-0 grid-overlay opacity-40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-teal/20 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-deep to-teal opacity-80 blur-sm" />
              </div>
              <div className="absolute top-5 left-5">
                <span className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md bg-background/60 border border-border/60 text-teal">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span
                  className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-widest ${categoryColors[featured.category]}`}
                >
                  {featured.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {featured.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight group-hover:text-teal transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-teal">
                Read full story{" "}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </motion.article>
        </div>

        {/* Filter */}
        <div className="container mx-auto px-6 lg:px-12 mt-16">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === c
                    ? "bg-teal text-accent-foreground shadow-glow"
                    : "border border-border bg-muted/30 text-muted-foreground hover:border-teal/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((a, i) => (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl border border-border/60 hover:border-teal/25 transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col"
              >
                {/* Visual */}
                <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-muted via-background to-muted/50">
                  <div className="absolute inset-0 grid-overlay opacity-30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-teal/15 blur-2xl group-hover:bg-teal/25 transition-colors" />
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-widest backdrop-blur-sm ${categoryColors[a.category]}`}
                    >
                      {a.category}
                    </span>
                  </div>
                </div>
                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {a.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {a.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-teal transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
                    {a.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal">
                    Read more{" "}
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="container mx-auto px-6 lg:px-12 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-10 md:p-14 border border-border/60 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-teal/10 rounded-full blur-3xl pointer-events-none" />
            <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-center relative">
              <div>
                <span className="text-xs font-semibold text-teal uppercase tracking-widest">
                  Stay informed
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-3">
                  Polymer insights, monthly
                </h2>
                <p className="text-muted-foreground">
                  Receive curated industry analysis, R&D breakthroughs, and
                  PolyCore announcements delivered to your inbox.
                </p>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  placeholder="your@company.com"
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-background outline-none text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all"
                />
                <Button variant="hero" type="submit">
                  Subscribe
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
