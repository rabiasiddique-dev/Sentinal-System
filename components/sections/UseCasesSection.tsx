'use client';

import { motion } from 'framer-motion';
import { Building2, Shield, Newspaper, Briefcase, Users, CheckCircle2 } from 'lucide-react';

const useCases = [
  {
    id: 'government',
    industry: 'Government & State',
    icon: Building2,
    description: 'Sovereign infrastructure for ultra-secure inter-agency communication and classified data handling.',
    features: ['FIPS 140-2 Compliance', 'Air-Gapped Sync', 'Quantum-Resistant Layer']
  },
  {
    id: 'defense',
    industry: 'Defense & Intel',
    icon: Shield,
    description: 'Battle-tested security for tactical high-stakes operations where failure is not an option.',
    features: ['Anti-Tamper Hardware', 'Secure Mesh Networking', 'Zero-Google Core']
  },
  {
    id: 'enterprise',
    industry: 'Strategic Enterprise',
    icon: Briefcase,
    description: 'Protecting intellectual property and executive communications from industrial espionage.',
    features: ['Isolated Workspace', 'Hardware Kill-Switch', 'Encryption Audit Logs']
  }
];

export default function UseCasesSection() {
  return (
    <section className="relative overflow-hidden bg-background section-padding border-t border-white/5">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container-cyber space-y-20">
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">Deployment Sectors</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-text-primary uppercase">
            Built for <span className="text-accent">Sovereignty</span>
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            Sentinel OS is deployed in environments where standard mobile security is insufficient.
            We provide the tools for true digital independence.
          </p>
        </div>

        {/* Use Case Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full glass-morphism p-10 rounded-[3rem] border border-white/5 hover:border-accent/40 transition-all duration-500 hover:shadow-glow-accent group">
                <div className="space-y-8 h-full flex flex-col">
                  {/* Icon & Title */}
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-secondary-bg border border-white/10 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <useCase.icon className="w-8 h-8 text-text-secondary group-hover:text-accent transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-text-primary uppercase tracking-tight">
                        {useCase.industry}
                      </h3>
                      <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                        {useCase.description}
                      </p>
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="mt-8 space-y-4 flex-grow">
                    {useCase.features.map((feature, j) => (
                      <div key={j} className="flex items-center space-x-3">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-8 right-8 w-1 h-12 bg-white/5 group-hover:bg-accent/40 transition-colors rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sub-note */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-6 border-t border-white/5">
          <p className="text-text-secondary text-sm font-medium">Trusted by leading defense contractors and state agencies globally.</p>
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary-bg flex items-center justify-center text-[10px] font-semibold text-accent">
                EU
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
