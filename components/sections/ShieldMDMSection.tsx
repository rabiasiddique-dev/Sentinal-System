'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Trash2,
  Lock,
  EyeOff,
  Settings,
  Server,
  Activity,
  Users
} from 'lucide-react';

const mdmFeatures = [
  {
    id: 'zero-touch',
    title: 'Zero-Touch Deployment',
    description: 'Ship devices directly to employees. Sentinel Auto-Provisioning sets up the hardened perimeter the moment it touches a network.',
    icon: Server
  },
  {
    id: 'remote-wipe',
    title: 'Instant Kill-Switch',
    description: 'In the event of compromise, trigger a hardware-level remote wipe that overwrites all storage sectors with random data.',
    icon: Trash2
  },
  {
    id: 'policy-control',
    title: 'Granular Policy Engine',
    description: 'Enforce camera disabling, USB restriction, and mandatory VPN at the OS level across your entire fleet.',
    icon: Shield
  },
  {
    id: 'compliance',
    title: 'Live Compliance Audit',
    description: 'Get real-time alerts if a device is tampered with, bootloader is unlocked, or an unauthorized peripheral is connected.',
    icon: Activity
  }
];

export default function ShieldMDMSection() {
  const [activeTab, setActiveTab] = useState(mdmFeatures[0].id);

  return (
    <section id="services" className="relative overflow-hidden bg-background section-padding border-b border-white/5">
      <div className="container-cyber space-y-20">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">Enterprise Suite</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-text-primary">
              Titan M <span className="text-accent">Security</span>
            </h2>
          </div>
          <p className="text-xl text-text-secondary max-w-xl pb-2">
            The device can&apos;t be hacked by USB once the screen is locked. The bootloader is locked ensuring the device can&apos;t be erased or &lsquo;back doored&rsquo;.
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 pb-20">
          {/* Dashboard Left: Features */}
          <div className="lg:col-span-5 space-y-4">
            {mdmFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 group relative overflow-hidden ${activeTab === feature.id
                  ? 'bg-secondary-bg/50 border-accent/40 shadow-glow-accent'
                  : 'bg-transparent border-white/5 hover:border-white/10'
                  }`}
              >
                <div className="flex items-start space-x-5 relative z-10">
                  <div className={`p-3 rounded-xl transition-colors duration-500 ${activeTab === feature.id ? 'bg-accent/10 text-accent' : 'bg-white/5 text-text-secondary group-hover:text-text-primary'
                    }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className={`font-display font-semibold text-lg ${activeTab === feature.id ? 'text-text-primary' : 'text-text-secondary decoration-accent/0'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-opacity duration-500 ${activeTab === feature.id ? 'opacity-100 text-text-secondary' : 'opacity-60 text-text-secondary'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Dashboard Right: Visual Mockup */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative glass-morphism p-2 rounded-[2rem] border border-white/10 shadow-2xl h-full min-h-[500px] overflow-hidden group"
            >
              {/* Mockup Header */}
              <div className="bg-secondary-bg/80 border-b border-white/10 p-6 flex items-center justify-between rounded-t-[1.8rem]">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-accent animate-spin-slow" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-text-primary uppercase tracking-widest">Main Console v2.4</h4>
                    <p className="text-[10px] text-accent font-mono">STATUS: SYSTEMS OPERATIONAL</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-alert shadow-glow-alert" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
              </div>

              {/* Mockup Body Content */}
              <div className="p-8 space-y-8 relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-background/40 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-text-secondary font-semibold uppercase tracking-widest">
                      <span>Total Fleet</span>
                      <Users className="w-3 h-3 text-accent" />
                    </div>
                    <div className="text-3xl font-display font-semibold text-text-primary">1,248</div>
                  </div>
                  <div className="p-6 bg-background/40 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-text-secondary font-semibold uppercase tracking-widest">
                      <span>Security Score</span>
                      <Shield className="w-3 h-3 text-accent" />
                    </div>
                    <div className="text-3xl font-display font-semibold text-text-primary">99.4%</div>
                  </div>
                </div>

                {/* Animated Graphic Area */}
                <div className="relative h-64 bg-background/60 rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.2)_0%,transparent_70%)]" />

                  {/* Radar/Scan effect */}
                  <div className="w-48 h-48 border border-accent/30 rounded-full relative flex items-center justify-center">
                    <div className="absolute inset-0 border border-accent/10 rounded-full scale-110" />
                    <div className="absolute inset-0 border border-accent/5 rounded-full scale-125" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute h-1/2 w-[2px] bg-gradient-to-t from-accent to-transparent bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom"
                    />
                    <Shield className="w-12 h-12 text-accent glow-accent" />
                  </div>

                  {/* Floating indicators */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-10 left-10 p-3 glass-morphism border border-white/10 rounded-xl"
                  >
                    <div className="text-[8px] font-semibold text-accent uppercase mb-1">Alert</div>
                    <div className="w-12 h-1 bg-alert/20 rounded-full overflow-hidden">
                      <motion.div animate={{ x: [-20, 20] }} transition={{ repeat: Infinity, duration: 1 }} className="w-full h-full bg-alert" />
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute bottom-10 right-10 p-3 glass-morphism border border-white/10 rounded-xl"
                  >
                    <div className="text-[8px] font-semibold text-accent uppercase mb-1">Encrypted</div>
                    <div className="flex space-x-1">
                      {[1, 1, 1, 0, 1].map((v, i) => (
                        <div key={i} className={`w-1 h-3 rounded-full ${v ? 'bg-accent' : 'bg-white/10'}`} />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full group-hover:bg-accent/30 transition-colors" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

