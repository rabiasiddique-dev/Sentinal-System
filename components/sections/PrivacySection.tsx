'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Bug, FolderLock, Package } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';

const privacyFeatures = [
  {
    id: 'network-privacy',
    title: 'Network Privacy',
    icon: Shield,
    description: 'Advanced network-level privacy controls and protections',
    details: [
      'Built-in VPN support with WireGuard protocol for encrypted connections',
      'DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT) to prevent DNS leaks',
      'Per-app network permissions to control which apps can access the internet',
      'Firewall capabilities to block unwanted connections at the system level',
      'MAC address randomization to prevent device tracking across networks',
      'Automatic blocking of known tracking and analytics domains'
    ]
  },
  {
    id: 'sensor-privacy',
    title: 'Sensor Privacy',
    icon: Eye,
    description: 'Granular control over device sensors and hardware access',
    details: [
      'Quick toggles to disable camera and microphone at the hardware level',
      'Per-app sensor permissions with real-time usage indicators',
      'Location privacy controls including GPS spoofing capabilities',
      'Accelerometer and gyroscope access restrictions',
      'Notification when apps access sensors in the background',
      'Ability to revoke sensor permissions automatically after app closure'
    ]
  },
  {
    id: 'exploit-mitigation',
    title: 'Exploit Mitigation',
    icon: Bug,
    description: 'Multiple layers of protection against security exploits',
    details: [
      'Enhanced Address Space Layout Randomization (ASLR) for memory protection',
      'Stack canaries and buffer overflow protection mechanisms',
      'Control-flow integrity (CFI) to prevent code injection attacks',
      'Hardened memory allocator to mitigate heap-based exploits',
      'Kernel hardening with restricted access to system calls',
      'Regular security patches applied within 48 hours of release'
    ]
  }
];

export default function PrivacySection() {
  return (
    <section className="relative overflow-hidden bg-background section-padding border-t border-white/5">
      <div className="container-cyber space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-text-primary uppercase tracking-tight">
            Privacy <span className="text-accent">Protocols</span>
          </h2>
          <p className="text-lg text-text-secondary">
            Deep-system level privacy controls. No data leaves the device without explicit multi-layer authorization.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-morphism rounded-[2rem] border border-white/5 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {privacyFeatures.map((feature) => (
                <AccordionItem key={feature.id} value={feature.id} className="border-b border-white/5 last:border-0 px-8">
                  <AccordionTrigger className="hover:no-underline py-8">
                    <div className="flex items-center space-x-6 text-left">
                      <div className="w-12 h-12 rounded-xl bg-secondary-bg flex items-center justify-center border border-white/10 group-hover:border-accent/30 transition-colors">
                        <feature.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-semibold text-text-primary uppercase tracking-wide">{feature.title}</h3>
                        <p className="text-sm text-text-secondary mt-1">{feature.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 pt-2">
                    <div className="pl-18 grid md:grid-cols-2 gap-4">
                      {feature.details.map((detail, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          <span className="text-xs text-text-secondary leading-relaxed font-medium">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

