'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Calendar, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 100 }
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 flex items-center justify-center overflow-hidden bg-neutral-soft">
      {/* Background Decorative Blobs */}
      <div className="glow-blob top-[-100px] left-[-100px] bg-primary/10" />
      <div className="glow-blob bottom-[-200px] right-[-100px] bg-accent-purple/10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left: Text Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Trust Badge */}
          <motion.div 
            variants={itemVariants}
            className="self-start px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Premium Digital Solutions for Local Brands
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-dark leading-[1.08]"
          >
            We Build Websites <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple">
              That Grow Businesses.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-neutral-dark/70 leading-relaxed max-w-xl"
          >
            Modern websites and digital growth solutions for gyms, ecommerce brands, salons, restaurants, mehendi artists, and small businesses seeking premium client growth.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2"
          >
            <Link
              href="#contact"
              className="px-8 py-4 rounded-full bg-primary hover:bg-primary-light text-white text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#portfolio"
              className="px-8 py-4 rounded-full bg-white hover:bg-neutral-soft border border-neutral-border text-neutral-dark text-base font-semibold transition-all duration-300 text-center"
            >
              View Our Work
            </Link>
          </motion.div>

          {/* Micro Trust Indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-4 pt-6 border-t border-neutral-border/60"
          >
            <div className="flex items-center gap-2 text-sm text-neutral-dark/70 font-medium">
              <CheckCircle2 className="w-4 h-4 text-primary-teal" />
              <span>100% Mobile Responsive</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-dark/70 font-medium">
              <CheckCircle2 className="w-4 h-4 text-primary-teal" />
              <span>Core Web Vitals Optimized</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-dark/70 font-medium">
              <CheckCircle2 className="w-4 h-4 text-primary-teal" />
              <span>Local SEO Strategy</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Floating Luxury Mockups and Cards */}
        <div className="lg:col-span-5 relative min-h-[450px] flex items-center justify-center">
          
          {/* Main Visual Board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
            className="w-full max-w-[400px] z-10"
          >
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [0, -0.5, 0]
              }}
              transition={{
                duration: 10,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="w-full h-[340px] rounded-3xl bg-white border border-neutral-border/80 shadow-premium p-6 relative flex flex-col justify-between overflow-hidden"
            >
              {/* Elegant Gradient Mesh Background inside mock */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-primary-teal/20 to-primary/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex justify-between items-center relative z-10">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <span className="text-[10px] font-semibold tracking-wider text-neutral-dark/40 uppercase">zahryx.digital</span>
              </div>

              <div className="my-auto text-left py-4 relative z-10">
                <h3 className="font-display font-bold text-2xl text-neutral-dark leading-snug">
                  Helping local business owners attract high-paying clients.
                </h3>
                <p className="text-xs text-neutral-dark/50 mt-2 leading-relaxed">
                  Elegant design combined with dynamic booking, fast ecommerce, and solid SEO engines.
                </p>
              </div>

              <div className="h-[2px] bg-neutral-border/40 relative z-10" />

              <div className="flex justify-between items-center mt-3 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">🚀</span>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-dark">Conversion Engine</h4>
                    <p className="text-[10px] text-neutral-dark/40">Optimized for small businesses</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">Active</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating UI Elements */}
          
          {/* Card 1: Gym Membership Booster */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: -40 }}
            animate={{ opacity: 1, x: 20, y: -80 }}
            transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
            className="absolute top-20 right-0 sm:right-6 z-20"
          >
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 1.5, 0]
              }}
              transition={{
                duration: 6,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="glass-panel shadow-lg rounded-2xl p-4 flex items-center gap-3 border border-white max-w-[210px]"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-medium text-neutral-dark/50">Pulse Gym Bookings</p>
                <h4 className="text-sm font-bold text-neutral-dark">+140% Members</h4>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2: Restaurant Reservation Notification */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: 50 }}
            animate={{ opacity: 1, x: -30, y: 80 }}
            transition={{ delay: 0.6, duration: 0.6, type: 'spring' }}
            className="absolute bottom-20 left-0 sm:left-6 z-20"
          >
            <motion.div
              animate={{
                y: [0, 12, 0],
                rotate: [0, -1.5, 0]
              }}
              transition={{
                duration: 7,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 1
              }}
              className="glass-panel shadow-lg rounded-2xl p-4 flex items-center gap-3 border border-white max-w-[220px]"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-medium text-neutral-dark/50">Bella Italia Reservations</p>
                <h4 className="text-sm font-bold text-neutral-dark">New Table Booked!</h4>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 3: Mehendi Artist review */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 30 }}
            transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
            className="absolute bottom-10 right-4 z-20"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 1, 0]
              }}
              transition={{
                duration: 5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.5
              }}
              className="glass-panel shadow-lg rounded-xl p-3 flex items-center gap-2 border border-white max-w-[160px]"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-xs font-semibold text-neutral-dark">"Stunning Portfolio!"</span>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
