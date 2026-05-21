'use client';

import { motion } from 'framer-motion';
import { Compass, Lightbulb, PenTool, Code, Rocket } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      number: '01',
      icon: Compass,
      title: 'Discovery',
      description: 'We analyze your local market, study your direct competitors, and understand your ideal buyer personas to map out exact growth goals.',
      highlight: 'Understand operations'
    },
    {
      number: '02',
      icon: Lightbulb,
      title: 'Strategy',
      description: 'We construct a customized layout plan, mapping out interactive menu tools, booking calendars, and keyword matrices for SEO.',
      highlight: 'Visual Sitemap design'
    },
    {
      number: '03',
      icon: PenTool,
      title: 'Design',
      description: 'We design premium, light UI luxury mockups in Figma, ensuring typography, glassmorphism, and color harmonics align to convert.',
      highlight: 'Harmonize branding'
    },
    {
      number: '04',
      icon: Code,
      title: 'Development',
      description: 'Our engineers build your website in high-performance Next.js 15, ensuring GPU-accelerated GSAP animations and instant loading times.',
      highlight: '100/100 Speed Score'
    },
    {
      number: '05',
      icon: Rocket,
      title: 'Launch & Growth',
      description: 'We configure sitemaps, register schemas with Google Console, map your domains, and implement automatic WhatsApp lead routing.',
      highlight: 'Operational Handover'
    }
  ];

  return (
    <section id="process" className="py-24 px-6 bg-neutral-soft relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col gap-4">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">How We Collaborate</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-dark tracking-tight">
            Our Premium Process
          </h2>
          <p className="text-sm sm:text-base text-neutral-dark/60 leading-relaxed">
            We handle everything from strategy to design, development, sitemaps, and indexing, so you can focus entirely on running your business.
          </p>
        </div>

        {/* Horizontal Timeline on desktop, vertical list on mobile */}
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-stretch">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-1 bg-white border border-neutral-border rounded-3xl p-7 flex flex-col justify-between text-left shadow-premium relative overflow-hidden group hover:border-primary/20 transition-all duration-300"
              >
                {/* Number indicator */}
                <div className="absolute top-4 right-6 text-5xl font-display font-extrabold text-neutral-dark/5 opacity-40 select-none group-hover:text-primary/10 transition-colors">
                  {step.number}
                </div>

                <div className="flex flex-col gap-5">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-2 relative z-10">
                    <h3 className="font-display font-bold text-base sm:text-lg text-neutral-dark">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-dark/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Highlight footer */}
                <div className="mt-8 pt-4 border-t border-neutral-border/60 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-neutral-dark/40">Step Goal:</span>
                  <span className="text-[10px] font-bold text-neutral-dark/75 bg-neutral-soft px-2.5 py-1 rounded-full">
                    {step.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
