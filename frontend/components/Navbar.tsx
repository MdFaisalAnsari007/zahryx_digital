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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'Our Work', href: '#portfolio' },
    { name: 'Why Us', href: '#why-choose-us' },
    { name: 'Process', href: '#process' },
    { name: 'Blog', href: '/blog' },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-white/80 backdrop-blur-md shadow-premium border-b border-neutral-border/40'
            : 'py-0 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group" onClick={closeMenu}>
            <img
              src="/logo.png"
              alt="Zahryx Digital"
              className="h-[80px] sm:h-[100px] md:h-[120px] w-auto object-contain"
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

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-light text-white text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-1.5 group"
            >
              Start Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-border/60 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-neutral-soft transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5 text-neutral-dark" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5 text-neutral-dark" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Menu Full-Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            />

            {/* Slide-in Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-white shadow-2xl flex flex-col md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-border/60">
                <span className="font-display font-bold text-lg text-neutral-dark">Menu</span>
                <button
                  onClick={closeMenu}
                  className="w-9 h-9 rounded-xl border border-neutral-border/60 flex items-center justify-center hover:bg-neutral-soft transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-dark" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col px-6 py-6 gap-1 flex-grow">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-neutral-dark hover:text-primary hover:bg-primary/5 transition-all group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-dark/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Footer CTA */}
              <div className="px-6 py-6 border-t border-neutral-border/60 flex flex-col gap-3">
                <Link
                  href="#contact"
                  onClick={closeMenu}
                  className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-light text-white text-sm font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all duration-300"
                >
                  Start Your Project
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/admin/login"
                  onClick={closeMenu}
                  className="w-full py-2.5 text-center text-xs font-semibold text-neutral-dark/40 hover:text-neutral-dark transition-colors"
                >
                  Admin Portal
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
