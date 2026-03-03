import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Font optimization with next/font
// Requirement 21.7: Use next/font for Google Fonts with font-display: swap and Latin subset
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Sentinel Systems | Enterprise Mobile Security",
  description: "Government-grade mobile security for enterprises. Secure Boot, Titan M chip, and complete privacy protection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization structured data (Schema.org)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sentinel Systems",
    "url": "https://sentinelsys.co",
    "logo": "https://sentinelsys.co/logo.png",
    "description": "Government-grade mobile security for enterprises with military-grade encryption, de-Googled Android, and privacy-first architecture.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-SENTINEL",
      "contactType": "Sales",
      "areaServed": "Worldwide",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://twitter.com/sentinelsystems",
      "https://linkedin.com/company/sentinelsystems",
      "https://github.com/sentinelsystems"
    ]
  };

  // WebSite structured data (Schema.org)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sentinel Systems",
    "url": "https://sentinelsys.co",
    "description": "Enterprise mobile security solutions",
    "publisher": {
      "@type": "Organization",
      "name": "Sentinel Systems"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Resource Preloading - Requirement 21.5 */}
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://api.resend.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preconnect for critical external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        {/* WebSite Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyber-green focus:text-cyber-black"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
