'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Smartphone, Check } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    'Supercharged Page Loads (Under 0.8 Seconds)',
    '100% Custom Tailored Designs (No generic Templates)',
    'Structured Local Schema Markup for Search Crawlers',
    'Mobile-first UX designed for simple touch navigations',
    'Integrated WhatsApp Consultations & Booking Triggers',
    'Full Ownership (You own 100% of your source code)'
  ];

  return (
    <section id="why-choose-us" className="py-24 px-6 bg-neutral-soft relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Stats and Performance Visual mockup */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          
          <div className="flex flex-col gap-3 text-left">
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">Performance Matters</span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-neutral-dark">
              Speed & SEO that Beats Large Aggregators
            </h3>
            <p className="text-xs sm:text-sm text-neutral-dark/60 leading-relaxed">
              Large platforms drag down page speeds with tracking code and generic styles. Zahryx Digital custom sites are lightweight, built on Next.js, and load in the blink of an eye.
            </p>
          </div>

          {/* Performance Comparison Chart Mock */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-border shadow-premium flex flex-col gap-6 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-dark/40">Zahryx Performance Comparison</h4>
            
            {/* Speed index */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-neutral-dark">Zahryx Page Load Speed</span>
                <span className="text-primary-teal">0.8 Seconds (Ideal)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-neutral-soft overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '92%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, type: 'spring' }}
                  className="h-full bg-gradient-to-r from-primary-teal to-primary rounded-full"
                />
              </div>
            </div>

            {/* Competitor Speed */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-neutral-dark">Standard Builder Speed</span>
                <span className="text-rose-500">4.2 Seconds (Slow)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-neutral-soft overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '38%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, type: 'spring' }}
                  className="h-full bg-rose-500 rounded-full"
                />
              </div>
            </div>

            {/* Core Web Vitals Badge */}
            <div className="flex items-center gap-3 bg-green-500/5 border border-green-500/10 p-3 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 font-bold text-xs">✓</div>
              <span className="text-xs text-neutral-dark/70 font-semibold">100/100 Mobile Score on Google Lighthouse Audits</span>
            </div>

          </div>

        </div>

        {/* Right Side: Trust & Checklist list */}
        <div className="lg:col-span-6 flex flex-col gap-8 text-left">
          
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">Why Choose Us</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-dark tracking-tight">
              A Business Growth Strategy
            </h2>
            <p className="text-sm text-neutral-dark/60 leading-relaxed">
              We focus entirely on small business growth. Your website should act as your primary sales tool, working 24/7 to capture bookings, orders, and inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((pt, idx) => (
              <motion.div 
                key={pt}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="flex gap-2.5 items-start p-3 bg-white rounded-2xl border border-neutral-border/60 shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-neutral-dark/80 font-medium leading-tight">
                  {pt}
                </span>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
