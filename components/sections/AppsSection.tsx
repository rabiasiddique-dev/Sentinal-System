'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Mail, MapPin, ShoppingBag, MessageSquare, ChevronRight, ChevronLeft, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';

const apps = [
  {
    id: 'sentinel-browser',
    name: 'Sentinel Browser',
    description: 'Chromium-based hardened browser with tracker blocking, fingerprint resistance, and per-site privacy profiles.',
    icon: Globe,
    features: ['Anti-Fingerprinting', 'Tracker Blocking', 'Fingerprint Resistance'],
    color: 'var(--color-accent)'
  },
  {
    id: 'open-mail',
    name: 'OpenMail',
    description: 'Encrypted mail client supporting PGP and modern mail protocols, with automatic privacy headers and remote content blocking.',
    icon: Mail,
    features: ['PGP Support', 'Privacy Headers', 'Remote Block'],
    color: 'var(--color-accent)'
  },
  {
    id: 'proton-maps',
    name: 'ProtonMaps',
    description: 'Privacy-first offline map tiles with optional open-source routing. Your location never leaves the device.',
    icon: MapPin,
    features: ['Offline Tiles', 'Privacy-First', 'OSM Search'],
    color: 'var(--color-accent)'
  },
  {
    id: 'libre-office',
    name: 'LibreOffice Viewer',
    description: 'Secure document viewer sandboxed from system data. View your files without any cloud exposure.',
    icon: Shield,
    features: ['System Sandbox', 'Offline View', 'Secure Docs'],
    color: 'var(--color-accent)'
  },
  {
    id: 'open-app-market',
    name: 'OpenApp Market',
    description: 'Curated repository of open-source apps with reproduction builds, signed packages, and privacy labels.',
    icon: ShoppingBag,
    features: ['Signed Packages', 'Reproducible', 'Privacy Labels'],
    color: 'var(--color-accent)'
  },
  {
    id: 'signal-x',
    name: 'SignalX',
    description: 'Messaging app built from open protocols including E2E. For users requiring full anonymity and privacy-preserving messaging.',
    icon: MessageSquare,
    features: ['E2E Encrypted', 'Anonymous', 'Open Protocol'],
    color: 'var(--color-accent)'
  }
];

export default function AppsSection() {
  const [selectedApp, setSelectedApp] = useState<typeof apps[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-background section-padding">
      <div className="container-cyber space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-text-primary uppercase tracking-tight">
              Secure <span className="text-accent">Ecosystem</span>
            </h2>
            <p className="text-text-secondary max-w-xl">
              A full suite of sovereign applications built to the same rigorous standards as the OS itself.
              No tracking, no telemetry, no backdoors.
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-text-primary" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-12 scrollbar-none snap-x snap-mandatory px-2"
        >
          {apps.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[320px] md:min-w-[400px] snap-center"
            >
              <div
                onClick={() => setSelectedApp(app)}
                className="group cursor-pointer glass-morphism p-8 rounded-[2.5rem] border border-white/5 space-y-8 h-full transition-all duration-500 hover:border-accent/40 hover:shadow-glow-accent"
              >
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-secondary-bg border border-white/10 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <app.icon className="w-8 h-8 text-text-secondary group-hover:text-accent transition-colors" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold uppercase tracking-widest text-text-secondary">
                    Secure v4.0
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-display font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                    {app.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Learn Technical Spec</span>
                  <ChevronRight className="w-4 h-4 text-accent transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
            <DialogContent className="max-w-2xl py-12">
              <DialogHeader className="mb-8">
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <selectedApp.icon className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <DialogTitle>{selectedApp.name}</DialogTitle>
                    <p className="text-accent text-[10px] font-semibold uppercase tracking-widest mt-1">Audit Status: Verified</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-8">
                <DialogDescription>
                  {selectedApp.description}
                </DialogDescription>

                <div className="grid grid-cols-2 gap-4">
                  {selectedApp.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/5">
                      <Shield className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5">
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="w-full btn-cyber-primary"
                  >
                    Close Technical Spec
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}

