'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-black/80 backdrop-blur-md border-b border-white/5'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo - Matching Screenshot */}
          <Link
            href="/"
            className="flex items-center group transition-transform hover:scale-105"
          >
            <img
              src="/sentinalsystemlogo.png"
              alt="SentinelSys"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Matching Screenshot */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-accent font-medium hover:text-accent transition-colors">Home</Link>
            <button onClick={() => scrollToSection('features')} className="text-gray-300 font-medium hover:text-accent transition-colors">Security Features</button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-300 font-medium hover:text-accent transition-colors">FAQ&apos;s</button>
            <Link href="/blog" className="text-gray-300 font-medium hover:text-accent transition-colors">Blogs</Link>
            <button onClick={() => scrollToSection('services')} className="text-gray-300 font-medium hover:text-accent transition-colors">Services</button>
          </nav>

          {/* Action Button - Matching Screenshot */}
          <div className="hidden lg:block">
            <Link
              href="https://sentinelsys.co"
              className="px-6 py-2.5 rounded-full border border-gray-500 text-gray-300 text-base font-medium hover:bg-white/5 transition-all"
            >
              sentinelsys.co
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all duration-200 focus-ring-accent"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 top-16 glass-dark transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="flex flex-col h-full px-6 py-8" aria-label="Mobile navigation">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection('features')}
              className="text-left py-4 text-xl text-gray-300 hover:text-green-400 font-medium transition-colors duration-200 border-b border-gray-800 focus-ring-accent"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('security')}
              className="text-left py-4 text-xl text-gray-300 hover:text-green-400 font-medium transition-colors duration-200 border-b border-gray-800 focus-ring-accent"
            >
              Security
            </button>
            <button
              onClick={() => scrollToSection('use-cases')}
              className="text-left py-4 text-xl text-gray-300 hover:text-green-400 font-medium transition-colors duration-200 border-b border-gray-800 focus-ring-accent"
            >
              Use Cases
            </button>
            <Link
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="text-left py-4 text-xl text-gray-300 hover:text-green-400 font-medium transition-colors duration-200 border-b border-gray-800 focus-ring-accent"
            >
              Blog
            </Link>
            <Link
              href="/faq"
              onClick={() => setIsMenuOpen(false)}
              className="text-left py-4 text-xl text-gray-300 hover:text-green-400 font-medium transition-colors duration-200 border-b border-gray-800 focus-ring-accent"
            >
              FAQ
            </Link>
          </div>

          <div className="mt-auto space-y-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full btn-secondary"
            >
              Contact Sales
            </button>
            <button
              onClick={() => scrollToSection('lead-capture')}
              className="w-full btn-primary"
            >
              Get Started
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
