"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing and using the PolyCore Industries website (the "Site"), you accept and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use this Site. These terms apply to all visitors, users, and others who access or use the Site.`,
  },
  {
    id: "use",
    title: "2. Use of the Site",
    content: `You agree to use this Site only for lawful purposes and in a manner that does not infringe the rights of others. You must not:
    
• Use the Site in any way that violates applicable local, national, or international laws or regulations.
• Transmit any unsolicited or unauthorised advertising or promotional material.
• Attempt to gain unauthorised access to any part of the Site or its related systems.
• Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site.
• Use automated tools to extract data from the Site without our express written consent.`,
  },
  {
    id: "ip",
    title: "3. Intellectual Property",
    content: `All content on this Site, including but not limited to text, graphics, logos, images, product specifications, technical data sheets, and software, is the property of PolyCore Industries or its content suppliers and is protected by applicable intellectual property laws.

You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any content from this Site without the prior written consent of PolyCore Industries.`,
  },
  {
    id: "products",
    title: "4. Product Information",
    content: `Product specifications, technical data, colour values, and performance parameters listed on this Site are provided for informational purposes only. While we strive for accuracy, PolyCore Industries does not warrant that product descriptions or other content is accurate, complete, reliable, or error-free.

Actual product performance may vary depending on processing conditions, substrate compatibility, and application requirements. We recommend requesting official Technical Data Sheets and conducting application testing before commercial production.`,
  },
  {
    id: "inquiry",
    title: "5. Inquiries and Quotations",
    content: `Submission of an inquiry or contact form on this Site does not constitute a binding order or contract. All pricing, availability, and delivery timelines are subject to formal quotation by our sales team and acceptance of our standard Sales Terms and Conditions.

PolyCore Industries reserves the right to decline any inquiry or refuse service at its sole discretion.`,
  },
  {
    id: "disclaimer",
    title: "6. Disclaimer of Warranties",
    content: `This Site and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. PolyCore Industries disclaims all warranties, including but not limited to:

• Implied warranties of merchantability and fitness for a particular purpose.
• Warranties that the Site will be uninterrupted, error-free, or free of viruses.
• Warranties regarding the accuracy, reliability, or completeness of any information.`,
  },
  {
    id: "liability",
    title: "7. Limitation of Liability",
    content: `To the fullest extent permitted by law, PolyCore Industries shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:

• Your access to or use of (or inability to access or use) the Site.
• Any conduct or content of any third party on the Site.
• Unauthorised access, use, or alteration of your transmissions or content.`,
  },
  {
    id: "links",
    title: "8. Third-Party Links",
    content: `Our Site may contain links to third-party websites. These links are provided solely for your convenience. PolyCore Industries has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.`,
  },
  {
    id: "governing",
    title: "9. Governing Law",
    content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra, India.`,
  },
  {
    id: "changes",
    title: "10. Changes to Terms",
    content: `PolyCore Industries reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site following any changes constitutes your acceptance of the new Terms.

Last updated: March 2024`,
  },
];

export default function TermsAndConditions() {
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
                Legal
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">
                Terms &{" "}
                <span className="bg-gradient-to-r from-emerald-deep to-teal bg-clip-text text-transparent">
                  Conditions
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Please read these terms carefully before using our website and
                services. These terms govern your use of the PolyCore Industries
                platform.
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
                      className="block text-sm text-muted-foreground hover:text-teal transition-colors py-1.5 pl-3 border-l-2 border-transparent hover:border-teal"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </motion.div>
            </aside>

            {/* Sections */}
            <div className="space-y-12">
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

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="glass-card rounded-2xl p-8 border border-border/60 hover:border-teal/20 transition-colors"
    >
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-teal/10 text-teal text-xs font-bold flex items-center justify-center flex-shrink-0">
          {index + 1}
        </span>
        {section.title.replace(/^\d+\.\s/, "")}
      </h2>
      <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
        {section.content}
      </div>
    </motion.div>
  );
}
