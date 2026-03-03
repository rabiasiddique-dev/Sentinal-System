'use client';

import { motion } from 'framer-motion';
import {
  Lock,
  Ban,
  ShieldCheck,
  Smartphone,
  ShieldAlert,
  Zap,
  Cpu
} from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Privacy Features',
    description: 'Sentinel Operating Systems (Customized Graphene++). No corporate spyware or bloatware.'
  },
  {
    icon: ShieldCheck,
    title: 'Security Features',
    description: 'Hardware features to stop apps accessing your personal info and organizational info.'
  },
  {
    icon: Lock,
    title: 'Privacy Apps',
    description: 'In-house built, customized, securely rebuilt, or recommended suite of privacy respecting apps.'
  },
  {
    icon: Smartphone,
    title: 'Open Device',
    description: 'Built on popular Pixel-8 phone from scratch. Complete control over your mobile environment.'
  },
  {
    icon: Ban,
    title: 'De-Googles',
    description: 'No communication with Google. No GooglePlay. No GoogleApps. Verifiably zero telemetry.'
  },
  {
    icon: ShieldAlert,
    title: 'MDM',
    description: 'Secure and comprehensive Mobile Device Management (ShieldMDM). Enterprise-ready platform.'
  },
  {
    icon: Cpu,
    title: 'Android Based',
    description: 'Familiar and easy to use. The latest Android versions and security patches (GrapheneOS+).'
  },
  {
    icon: Zap,
    title: 'Increased Battery Life',
    description: 'No spyware running in the background means superior performance and longer battery.'
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden bg-background section-padding">
      <div className="container-cyber space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-semibold text-text-primary"
          >
            Sovereign <span className="text-accent">Infrastructure</span>
          </motion.h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Engineered from the hardware up to provide an unbreakable mobile perimeter for your organization.
          </p>
        </div>

        {/* 4x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-morphism p-8 rounded-2xl group flex flex-col h-full"
            >
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-12 h-12 rounded-xl bg-secondary-bg border border-white/5 flex items-center justify-center group-hover:border-accent/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                </div>
              </div>

              <h3 className="text-xl font-display font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed flex-grow">
                {feature.description}
              </p>

              {/* Hover Indicator */}
              <div className="mt-6 h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

