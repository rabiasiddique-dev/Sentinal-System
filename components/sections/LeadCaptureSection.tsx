'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, CheckCircle2, Globe, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LeadCaptureSection() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Simplified form submission for the new high-impact view
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section id="lead-capture" className="relative py-32 overflow-hidden bg-background">
      {/* 8. FINAL CTA SECTION - Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/[0.03] to-background" />

      {/* Animated Border Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent shadow-[0_0_20px_rgba(0,255,136,0.5)]" />

      <div className="container-cyber relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">

          <AnimatePresence mode="wait">
            {!showForm && !isSuccess ? (
              <motion.div
                key="cta-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-10"
              >
                {/* Tech Badge */}
                <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full glass-morphism border border-white/10">
                  <Zap className="w-4 h-4 text-accent animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">Ready for Deployment</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-display font-semibold text-text-primary leading-[1.1] tracking-tight">
                  Deploy Secure <span className="text-accent">Mobile Solutions</span> Today
                </h2>

                <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                  Sentinel Phone is ideal for security and privacy-conscious organizations and government departments.
                  If you wish to deploy a robust, de-googled mobile environment, start here.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn-cyber-primary text-lg px-10 py-5 group"
                  >
                    <span>Request Deployment</span>
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="btn-cyber-secondary text-lg px-10 py-5">
                    Talk to Expert
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                  <div className="flex items-center justify-center space-x-2">
                    <Lock className="w-5 h-5" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Hardened OS</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">EAL4+ Tested</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Zero Google</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Instant Boot</span>
                  </div>
                </div>
              </motion.div>
            ) : isSuccess ? (
              <motion.div
                key="success-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-morphism p-16 rounded-[4rem] border border-accent/30 space-y-8"
              >
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-12 h-12 text-accent" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-display font-semibold text-text-primary uppercase tracking-tight">Deployment Requested</h3>
                  <p className="text-text-secondary text-lg">A technical strategist will contact your agency within 4 hours.</p>
                </div>
                <button
                  onClick={() => { setIsSuccess(false); setShowForm(false); }}
                  className="btn-cyber-secondary px-8 py-3"
                >
                  Return to Site
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form-content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-left glass-morphism p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-3xl"
              >
                <div className="max-w-xl mx-auto space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-display font-semibold text-text-primary uppercase">Security Audit Inquiry</h3>
                    <p className="text-text-secondary text-sm">Please provide your organization details to begin the hardening process.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary ml-1">Agency Name</label>
                        <input
                          required
                          className="w-full bg-secondary-bg/50 border border-white/5 rounded-2xl px-6 py-4 text-text-primary focus:border-accent/50 outline-none transition-all"
                          placeholder="Cyber Defense Division"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary ml-1">Email (Encrypted)</label>
                        <input
                          required
                          type="email"
                          className="w-full bg-secondary-bg/50 border border-white/5 rounded-2xl px-6 py-4 text-text-primary focus:border-accent/50 outline-none transition-all"
                          placeholder="sec-ops@agency.gov"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary ml-1">Requirements Brief</label>
                      <textarea
                        required
                        className="w-full bg-secondary-bg/50 border border-white/5 rounded-2xl px-6 py-4 text-text-primary focus:border-accent/50 outline-none transition-all h-32 resize-none"
                        placeholder="Describe your current threat model..."
                      />
                    </div>

                    <div className="pt-4 flex flex-col md:flex-row gap-4">
                      <button
                        disabled={isSubmitting}
                        className="btn-cyber-primary flex-grow h-16 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Authenticating...' : 'Initialize Deployment Request'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="btn-cyber-secondary px-8 h-16"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modern Background Glows */}
      <div className="absolute -bottom-64 -left-64 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-64 -right-64 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
