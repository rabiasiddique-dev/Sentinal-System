'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
    return (
        <section className="relative overflow-hidden section-padding bg-background">
            <div className="container-cyber">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        {/* Animated Divider */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: '80px', opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-[1px] bg-accent"
                        />

                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-display font-semibold text-text-primary uppercase tracking-tight">
                                High-Stakes <br />
                                <span className="text-accent">Sovereignty</span>
                            </h2>

                            <p className="text-xl text-text-secondary leading-relaxed font-light">
                                Sentinel Systems is a privacy-first innovator with deep expertise in security, telecom, and information technology.
                                Our journey began with the belief that you can stay connected without ever compromising your privacy and security.
                            </p>

                            <p className="text-lg text-text-secondary leading-relaxed font-light opacity-80">
                                Coupled with Sentinel Phone OS, ShieldMDM essentially turns the device into a fully manageable, enterprise-ready platform.
                                Ideal for organizations that need hardened mobile security without compromising privacy.
                            </p>
                        </div>

                        <div className="inline-block px-8 py-4 glass-morphism rounded-xl border border-white/5">
                            <p className="text-sm font-medium text-text-secondary">
                                Built and maintained by <span className="text-accent font-semibold">Cybersecurity Veterans</span>
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-accent/10 blur-[100px] rounded-full" />
                        <img
                            src="/hero-illustration.png"
                            alt="Security Architecture"
                            className="relative z-10 w-full rounded-3xl border border-white/5 shadow-2xl"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent/5 blur-[120px] rounded-full" />
            </div>
        </section>
    );
}
