'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Cpu, Lock, Eye, Zap, Database, Ban, ShieldCheck } from 'lucide-react';

const deepDiveData = [
    {
        icon: Zap,
        title: "Automatic Security Updates",
        content: "Regular patches and updates are delivered promptly, often faster than stock Android. The OS is maintained by a nonprofit focused solely on privacy and security research."
    },
    {
        icon: Shield,
        title: "Enhanced App Sandboxing",
        content: "Apps are strictly isolated from each other and the OS, reducing the risk of privilege escalation or data leakage. SentinelOS enforces stricter permissions."
    },
    {
        icon: Lock,
        title: "Secure Boot & Verified Boot",
        content: "Ensures the OS hasn't been tampered with during startup. Only signed and verified system images are allowed to run, protecting against rootkits."
    },
    {
        icon: Database,
        title: "Scoped Storage & Permissions",
        content: "Apps can only access specific files and media they're granted access to. SentinelOS improves Android's permission model with granular controls."
    },
    {
        icon: Eye,
        title: "Network & Sensor Privacy",
        content: "Users can disable sensors like microphone, camera, and network access on a per-app basis. Blocks access to sensitive identifiers like IMEI and MAC address."
    },
    {
        icon: Ban,
        title: "No Google Services by Default",
        content: "SentinelOS ships without Google apps or services, preventing background data collection. Users can install sandboxed Google Play if needed."
    },
    {
        icon: Cpu,
        title: "Exploit Mitigations",
        content: "Includes hardened memory allocator, control flow integrity, and other low-level protections to prevent common exploit techniques."
    },
    {
        icon: ShieldCheck,
        title: "ShieldMDM Integration",
        content: "Enhances security by adding enterprise-grade mobile device management (MDM) capabilities without relying on Google infrastructure."
    }
];

export default function DeepDiveSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="relative overflow-hidden bg-background section-padding">
            <div className="container-cyber grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Text & Info */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-display font-semibold text-text-primary">
                            Sentinel OS <br />
                            <span className="text-accent">Deep Dive</span>
                        </h2>
                        <p className="text-text-secondary">
                            Go beyond the surface. Explore the architectural decisions and hardened layers that make Sentinel
                            the choice for high-stakes environments.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {deepDiveData.map((item, i) => (
                            <div
                                key={i}
                                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${activeIndex === i ? 'bg-secondary-bg/50 border-accent/40 shadow-glow-accent' : 'bg-transparent border-white/5 hover:border-white/20'
                                    }`}
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                    className="w-full p-6 flex items-center justify-between text-left"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-2 rounded-lg ${activeIndex === i ? 'text-accent bg-accent/10' : 'text-text-secondary bg-white/5'}`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className={`font-display font-semibold ${activeIndex === i ? 'text-text-primary' : 'text-text-secondary'}`}>
                                            {item.title}
                                        </span>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${activeIndex === i ? 'rotate-180 text-accent' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {activeIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 pt-0 ml-11">
                                                <p className="text-sm text-text-secondary leading-relaxed border-l border-accent/20 pl-4 italic">
                                                    {item.content}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Visual Element */}
                <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 blur-[120px] rounded-full" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative glass-morphism p-1 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden"
                    >
                        <div className="aspect-[4/3] bg-[#0B0F14] rounded-[2.3rem] flex items-center justify-center p-12 overflow-hidden">
                            {/* Visual representation of OS layers */}
                            <div className="relative w-full h-full flex flex-col items-center justify-center space-y-4">
                                {[4, 3, 2, 1].map((layer) => (
                                    <motion.div
                                        key={layer}
                                        animate={activeIndex === 4 - layer ? { scale: 1.05, borderColor: '#00FF88', opacity: 1 } : { scale: 1, borderColor: 'rgba(255,255,255,0.1)', opacity: 0.6 }}
                                        className="w-full h-12 rounded-xl border flex items-center justify-center bg-secondary-bg/50 backdrop-blur-md transition-all duration-500"
                                    >
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-text-secondary">Security Layer 0{layer}</span>
                                    </motion.div>
                                ))}
                                <div className="w-24 h-24 rounded-full bg-accent/20 border-2 border-accent border-dashed animate-spin-slow flex items-center justify-center">
                                    <Shield className="w-10 h-10 text-accent" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
