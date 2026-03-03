import { Metadata } from 'next';
import FAQSection from '@/components/sections/FAQSection';
import { faqData } from '@/lib/data/faq';

export const metadata: Metadata = {
  title: 'FAQ - Sentinel Systems | Frequently Asked Questions',
  description: 'Find answers to common questions about Sentinel Systems enterprise mobile security, ShieldMDM, deployment, pricing, and support.',
  openGraph: {
    title: 'FAQ - Sentinel Systems',
    description: 'Frequently asked questions about enterprise mobile security',
    url: 'https://sentinelsys.co/faq',
    type: 'website',
  },
};

export default function FAQPage() {
  // Generate FAQPage structured data (Schema.org)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      
      <div className="min-h-screen bg-cyber-black">
        <FAQSection />
      </div>
    </>
  );
}
