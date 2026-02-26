import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.altchemix.com"),

  title: {
    default: "Altchemix | Advanced Masterbatch & Polymer Additive Solutions",
    template: "%s | Altchemix",
  },

  description:
    "Altchemix delivers innovative masterbatch and polymer additive solutions including color masterbatches, performance additives, and sustainable polymer formulations for modern industries.",

  keywords: [
    "Masterbatch manufacturer",
    "Color masterbatch",
    "Polymer additives",
    "Plastic additives",
    "Sustainable polymers",
    "Additive masterbatch",
    "Plastic color solutions",
    "Industrial polymer solutions",
  ],

  authors: [{ name: "Altchemix" }],
  creator: "Altchemix",
  publisher: "Altchemix",

  openGraph: {
    title: "Altchemix | Advanced Masterbatch Solutions",
    description:
      "Innovative color and additive formulations for responsible polymers.",
    url: "https://www.altchemix.com",
    siteName: "Altchemix",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Altchemix Masterbatch Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Altchemix | Advanced Masterbatch Solutions",
    description:
      "Innovative color and additive formulations for responsible polymers.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://www.altchemix.com",
  },

  category: "Industrial Manufacturing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Altchemix",
              url: "https://www.altchemix.com",
              logo: "https://www.altchemix.com/logo.png",
              description:
                "Advanced masterbatch and polymer additive manufacturer providing innovative color and performance solutions.",
              sameAs: ["https://www.linkedin.com/company/altchemix"],
            }),
          }}
        />
      </head>

      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${spaceGrotesk.variable} 
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
