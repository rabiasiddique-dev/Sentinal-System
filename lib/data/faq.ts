/**
 * FAQ data structure
 * 
 * Frequently Asked Questions for the Sentinel Systems website
 * Requirements: 13.1
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqData: FAQItem[] = [
  {
    id: 'what-is-sentinel',
    question: 'What is Sentinel Systems?',
    answer: 'Sentinel Systems provides government-grade mobile security solutions for enterprises. Our platform combines de-Googled Android, military-grade encryption, ShieldMDM device management, and privacy-first architecture to protect your organization\'s sensitive data.',
    category: 'General',
  },
  {
    id: 'how-different-from-android',
    question: 'How is Sentinel different from regular Android?',
    answer: 'Sentinel is built on a hardened Android OS with all Google services removed and replaced with privacy-focused alternatives. We implement Secure Boot, hardware-level encryption with Titan M chip, enhanced app sandboxing, and comprehensive privacy controls that standard Android doesn\'t offer.',
    category: 'Product',
  },
  {
    id: 'what-is-shieldmdm',
    question: 'What is ShieldMDM?',
    answer: 'ShieldMDM is our enterprise mobile device management platform. It allows IT administrators to remotely manage devices, enforce security policies, restrict app installations, perform remote wipes, and lock devices in case of theft or loss—all while maintaining user privacy.',
    category: 'Features',
  },
  {
    id: 'deployment-size',
    question: 'What deployment sizes do you support?',
    answer: 'We support deployments of all sizes, from small teams (1-10 devices) to large enterprises (1000+ devices). Our pricing and support scale with your organization\'s needs.',
    category: 'Deployment',
  },
  {
    id: 'which-industries',
    question: 'Which industries use Sentinel?',
    answer: 'Sentinel is trusted by government agencies, defense contractors, journalists, corporate executives, and NGOs—any organization that requires the highest level of mobile security and privacy protection.',
    category: 'Use Cases',
  },
  {
    id: 'hardware-requirements',
    question: 'What hardware does Sentinel run on?',
    answer: 'Sentinel runs on Google Pixel devices (Pixel 4 and newer) which feature the Titan M security chip and verified boot. We provide pre-configured devices or can help you deploy Sentinel on your existing compatible hardware.',
    category: 'Technical',
  },
  {
    id: 'data-privacy',
    question: 'How does Sentinel protect my data privacy?',
    answer: 'Sentinel implements multiple privacy layers: no Google telemetry, network-level privacy controls, sensor privacy toggles, scoped storage, sandboxed Play Services (optional), and exploit mitigation. Your data never leaves your control.',
    category: 'Privacy',
  },
  {
    id: 'app-compatibility',
    question: 'Can I use my existing apps?',
    answer: 'Yes! Sentinel includes sandboxed Google Play Services (optional) that allow most Android apps to work normally. We also provide secure alternatives like Sentinel Browser, OpenMail, and ProtonMaps. Apps requiring deep Google integration may need alternatives.',
    category: 'Compatibility',
  },
  {
    id: 'setup-time',
    question: 'How long does deployment take?',
    answer: 'Initial setup typically takes 1-2 weeks including device configuration, policy setup, and user training. We provide full deployment support and can expedite for urgent needs.',
    category: 'Deployment',
  },
  {
    id: 'support-included',
    question: 'What support is included?',
    answer: 'All enterprise plans include 24/7 technical support, dedicated account management, regular security updates, and access to our knowledge base. Premium support with SLA guarantees is available for mission-critical deployments.',
    category: 'Support',
  },
  {
    id: 'compliance-certifications',
    question: 'What compliance certifications does Sentinel have?',
    answer: 'Sentinel is designed to meet FIPS 140-2, ITAR, EAR, and other government security standards. We work with organizations to ensure compliance with their specific regulatory requirements.',
    category: 'Compliance',
  },
  {
    id: 'pricing-model',
    question: 'How is Sentinel priced?',
    answer: 'Pricing is based on the number of devices and support level required. Contact our sales team for a custom quote tailored to your organization\'s needs. We offer flexible licensing options including annual and multi-year agreements.',
    category: 'Pricing',
  },
];

/**
 * Get FAQs by category
 */
export function getFAQsByCategory(category: string): FAQItem[] {
  return faqData.filter(faq => faq.category === category);
}

/**
 * Get all FAQ categories
 */
export function getFAQCategories(): string[] {
  const categories = new Set(
    faqData
      .map(faq => faq.category)
      .filter((category): category is string => Boolean(category))
  );
  return Array.from(categories);
}
