'use client';

import { motion } from 'framer-motion';
import { Shield, Cpu, Smartphone, Lock } from 'lucide-react';

const trustItems = [
  { icon: Shield, text: "Built on Hardened OS" },
  { icon: Cpu, text: "Titan M Security Chip" },
  { icon: Smartphone, text: "De-Googled Android" },
  { icon: Lock, text: "Enterprise MDM" }
];

export default function TrustSection() {
  return (
    <section className="relative border-y border-white/5 bg-secondary-bg/30 backdrop-blur-sm py-12 overflow-hidden">
      <div className="container-cyber">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group flex items-center space-x-4 cursor-default"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <item.icon className="relative z-10 w-5 h-5 text-accent transition-transform group-hover:rotate-12" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary group-hover:text-text-primary transition-colors">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative side fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </section>
  );
}

