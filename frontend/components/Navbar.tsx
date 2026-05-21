'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'Our Work', href: '#portfolio' },
    { name: 'Why Us', href: '#why-choose-us' },
    { name: 'Process', href: '#process' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-white/70 backdrop-blur-md shadow-premium border-b border-neutral-border/40'
            : 'py-0 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Zahryx Digital"
              className="h-[120px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-dark/80 hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Call to action button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin/login"
              className="text-xs font-semibold text-neutral-dark/60 hover:text-neutral-dark transition-colors"
            >
              Admin Portal
            </Link>
            <Link
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-light text-white text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-1.5 group"
            >
              Start Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-border/20 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-neutral-dark" /> : <Menu className="w-6 h-6 text-neutral-dark" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[64px] left-0 right-0 z-40 bg-white border-b border-neutral-border shadow-lg py-6 px-6 md:hidden flex flex-col gap-5"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold text-neutral-dark hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-neutral-border/80 my-2" />
            <div className="flex flex-col gap-3">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-neutral-dark/70 hover:text-neutral-dark"
              >
                Admin Panel Login
              </Link>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-all duration-300"
              >
                Start Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
