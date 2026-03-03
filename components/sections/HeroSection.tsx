'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ShieldCheck, Lock, Smartphone, Ban } from 'lucide-react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const badgeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F14]"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent 80%)'
          }}
        />
        {/* Radial Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="container-cyber relative z-10 grid lg:grid-cols-2 gap-12 items-center section-padding">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-12">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/10 glass-morphism"
            >
              <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(0,255,136,0.5)] animate-pulse" />
              <span className="text-[10px] md:text-xs font-display font-semibold text-text-primary uppercase tracking-[0.2em]">
                Do you suspect that your mobile phone is being
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl lg:text-9xl font-display font-light leading-tight tracking-tight"
            >
              <span className="text-alert">&quot;Listen-in&quot;</span> <span className="text-white">or</span> <br />
              <span className="text-alert">&quot;Tracked&quot;</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl md:text-4xl text-white font-display font-extralight tracking-wide"
            >
              If yes, You are on right page
            </motion.p>
          </div>

          <div className="space-y-6 max-w-md mx-auto lg:mx-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-text-primary font-semibold leading-snug"
            >
              SentinelSys - Advanced Security & Privacy Solutions <br />
              <span className="text-text-secondary font-normal text-base">
                We Offer a comprehensive Solution that is verifiably secure
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <button className="btn-cyber-primary px-10 py-4 text-base font-semibold flex items-center group">
                <span className="mr-2">↳</span> Get SentinelSys
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right Content - Full Image from Screenshot Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative flex justify-center items-center"
        >
          {/* Background Glow */}
          <div className="absolute w-[120%] h-[120%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

          <img
            src="/TechPic-removebg-preview.png"
            alt="Sentinel Security Illustration"
            className="relative z-10 w-full max-w-[550px] drop-shadow-[0_0_50px_rgba(0,255,136,0.2)]"
          />
        </motion.div>
      </div>

      {/* Modern Wave Divider or Mask could go here, but keeping it clean for now */}
      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent">Initiate Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section >
  );
}
