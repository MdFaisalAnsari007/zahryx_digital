'use client';

import { motion } from 'framer-motion';
import { Laptop, ShoppingBag, Search, Palette, Layers, MessageSquare, Cpu } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Laptop,
      title: 'Website Development',
      description: 'Stunning, blazing fast, and responsive React/Next.js websites built to convert local visitors into long-term clients.',
      color: 'from-blue-500/10 to-blue-600/5',
      accent: 'bg-blue-500'
    },
    {
      icon: ShoppingBag,
      title: 'Ecommerce Stores',
      description: 'Elegant clothing, cosmetics, or physical products storefronts featuring smooth cart checkouts and instant digital payments.',
      color: 'from-indigo-500/10 to-indigo-600/5',
      accent: 'bg-indigo-500'
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Local citation strategies, schema markup, and speed audits designed to bring your small business to the top of Google Search.',
      color: 'from-cyan-500/10 to-cyan-600/5',
      accent: 'bg-cyan-500'
    },
    {
      icon: Palette,
      title: 'Branding & Logo Design',
      description: 'Luxury color schemes, beautiful modern typographies, and vector logo files that establish instantly recognizable trust.',
      color: 'from-purple-500/10 to-purple-600/5',
      accent: 'bg-purple-500'
    },
    {
      icon: Layers,
      title: 'UI/UX Design',
      description: 'Premium UI layouts, mockups, and mobile application designs mapped to your exact buyer personas and conversion goals.',
      color: 'from-rose-500/10 to-rose-600/5',
      accent: 'bg-rose-500'
    },
    {
      icon: MessageSquare,
      title: 'Social Media Presence',
      description: 'High-density graphics, templates, and content pillars crafted to position your brand as the leading local authority.',
      color: 'from-orange-500/10 to-orange-600/5',
      accent: 'bg-orange-500'
    },
    {
      icon: Cpu,
      title: 'Business Automation',
      description: 'Automated WhatsApp query repliers, Calendly booking triggers, and CRM dashboard integrations that save time.',
      color: 'from-emerald-500/10 to-emerald-600/5',
      accent: 'bg-emerald-500'
    }
  ];

  return (
    <section id="services" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="glow-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/5" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">What We Excel In</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-dark tracking-tight">
            Our Digital Solutions
          </h2>
          <p className="text-sm sm:text-base text-neutral-dark/60 leading-relaxed">
            We provide everything local small businesses need to bypass massive software platforms and build direct, high-value customer relationships.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-3xl p-8 bg-neutral-soft border border-neutral-border/50 shadow-premium overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                {/* Accent Blob on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col gap-5 h-full justify-between text-left">
                  {/* Icon Wrapper */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${service.accent} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-lg text-neutral-dark group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-dark/60 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* CTA Indicator */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-dark/50 group-hover:text-primary transition-colors pt-2">
                    <span>Learn more</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
