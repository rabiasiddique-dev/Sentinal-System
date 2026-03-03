'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const comparisonData = [
  { feature: 'Google Default Search', android: 'Present', sentinel: 'Removed & Replaced' },
  { feature: 'Google Play Services', android: 'Mandatory', sentinel: 'Replaced by microG' },
  { feature: 'Connectivity Checks', android: 'Google Servers', sentinel: 'Sentinel Privacy Servers' },
  { feature: 'Network Time (NTP)', android: 'Google Servers', sentinel: 'Sentinel Privacy Servers' },
  { feature: 'DNS Queries', android: 'Google Servers', sentinel: 'Sentinel Privacy Servers' },
  { feature: 'Geo-location Services', android: 'Google/GooglePlay', sentinel: 'Mozilla Location Services' },
  { feature: 'Background Telemetry', android: 'Constant', sentinel: 'Zero / Verifiably Disabled' }
];

export default function ComparisonSection() {
  const renderIcon = (val: boolean | string, isSentinel: boolean) => {
    if (typeof val === 'boolean') {
      if (isSentinel) {
        return val ? <Check className="w-6 h-6 text-accent mx-auto" /> : <X className="w-6 h-6 text-alert mx-auto" />;
      } else {
        return val ? <Check className="w-6 h-6 text-accent mx-auto" /> : <X className="w-6 h-6 text-alert mx-auto" />;
      }
    }
    return <span className={`text-sm font-semibold uppercase tracking-wider ${isSentinel ? 'text-accent' : 'text-text-secondary'}`}>{val}</span>;
  };

  return (
    <section className="relative overflow-hidden bg-secondary-bg/20 section-padding border-y border-white/5">
      <div className="container-cyber space-y-16">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-semibold text-text-primary"
          >
            The <span className="text-accent">Sentinel</span> Edge
          </motion.h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A surgical comparison between standard consumer mobile OS and the Sentinel Hardened Infrastructure.
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl border border-white/5 glass-morphism">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 border-b border-white/5">
                <th className="p-8 text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">Security Layer</th>
                <th className="p-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-alert">Consumer Android</th>
                <th className="p-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-accent">Sentinel OS</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-white/5 group transition-colors hover:bg-white/[0.02] ${i === comparisonData.length - 1 ? 'border-b-0' : ''}`}
                >
                  <td className="p-8 font-display font-medium text-text-primary group-hover:text-accent transition-colors">
                    {row.feature}
                  </td>
                  <td className="p-8 text-center bg-black/20">
                    {/* For Android, true means "has telemetry/issue", but we want to show ❌ for "Bad/Normal" if it's a security comparison */}
                    {/* User specified: Use red ❌ for Android, Green ✅ for Sentinel */}
                    <X className="w-6 h-6 text-alert mx-auto" />
                  </td>
                  <td className="p-8 text-center bg-accent/5">
                    <Check className="w-6 h-6 text-accent mx-auto glow-accent" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

