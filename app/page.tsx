import { Metadata } from 'next';
import { MessageSquare } from 'lucide-react';
import dynamic from 'next/dynamic';
import HeroSection from "@/components/sections/HeroSection";
import TrustSection from "@/components/sections/TrustSection";
import AboutSection from "@/components/sections/AboutSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import DeepDiveSection from "@/components/sections/DeepDiveSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PrivacySection from "@/components/sections/PrivacySection";
import ShieldMDMSection from "@/components/sections/ShieldMDMSection";
import UseCasesSection from "@/components/sections/UseCasesSection";

// Dynamically import heavy components with loading states
const AppsSection = dynamic(() => import("@/components/sections/AppsSection"), {
  loading: () => (
    <div className="relative py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-800 rounded w-64 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-800 rounded w-96 mx-auto"></div>
        </div>
      </div>
    </div>
  ),
  ssr: true, // Keep SSR for SEO
});

const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), {
  loading: () => (
    <div className="relative py-20 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-800 rounded w-48 mx-auto mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: true,
});

const LeadCaptureSection = dynamic(() => import("@/components/sections/LeadCaptureSection"), {
  loading: () => (
    <div className="relative py-20 bg-gray-900">
      <div className="max-w-3xl mx-auto px-6">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-800 rounded w-80 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-800 rounded w-96 mx-auto mb-8"></div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 shadow-sm">
            <div className="space-y-4">
              <div className="h-12 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: true,
});

export const metadata: Metadata = {
  title: 'Sentinel Systems - Government-Grade Mobile Security for Enterprises',
  description: 'Enterprise mobile security with military-grade encryption, de-Googled Android, ShieldMDM device management, and privacy-first architecture. Trusted by government, defense, and corporate organizations.',
  keywords: ['mobile security', 'enterprise security', 'de-googled android', 'MDM', 'device management', 'privacy', 'encryption', 'government security'],
  openGraph: {
    title: 'Sentinel Systems - Government-Grade Mobile Security',
    description: 'Enterprise mobile security with military-grade encryption and privacy-first architecture.',
    url: 'https://sentinelsys.co',
    siteName: 'Sentinel Systems',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sentinel Systems - Enterprise Mobile Security',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sentinel Systems - Government-Grade Mobile Security',
    description: 'Enterprise mobile security with military-grade encryption and privacy-first architecture.',
    images: ['/twitter-image.jpg'],
    creator: '@sentinelsystems',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Section */}
      <TrustSection />

      {/* About Section */}
      <AboutSection />

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Deep Dive Section */}
      <DeepDiveSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Privacy Section */}
      <PrivacySection />

      {/* ShieldMDM Section */}
      <ShieldMDMSection />

      {/* Secure Apps Section */}
      <AppsSection />

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Lead Capture Section */}
      <LeadCaptureSection />

      {/* Floating Chat Bot - Matching Screenshot */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="group relative">
          <div className="absolute inset-0 bg-accent/20 blur-xl rounded-2xl group-hover:bg-accent/40 transition-all" />
          <div className="relative z-10 w-16 h-16 rounded-2xl border border-white/10 bg-secondary-bg flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
            <MessageSquare className="w-8 h-8 text-accent" />
          </div>
        </button>
      </div>
    </div>
  );
}
