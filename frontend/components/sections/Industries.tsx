'use client';

import { motion } from 'framer-motion';
import { 
  Dumbbell, Paintbrush, ShoppingBag, Coffee, Sparkles, 
  Home, GraduationCap, Stethoscope, Shirt 
} from 'lucide-react';

export default function Industries() {
  const industries = [
    {
      icon: Dumbbell,
      title: 'Gyms & Fitness',
      description: 'Dynamic membership portals, calendar-synced personal coaching schedules, and automated billing that reduces churn.',
      metric: 'Schedule Bookings',
      bg: 'bg-blue-50 text-blue-600 border-blue-100',
      tag: 'Local Studio'
    },
    {
      icon: Coffee,
      title: 'Cafes & Restaurants',
      description: 'Elegant, ultra-fast online menus, automated reservation booking slots, and mobile order processing without third-party fees.',
      metric: 'Direct Reservations',
      bg: 'bg-amber-50 text-amber-600 border-amber-100',
      tag: 'Gourmet / Cafe'
    },
    {
      icon: Paintbrush,
      title: 'Mehendi & Henna Artists',
      description: 'Ultra-high definition image carousels, custom appointment triggers, and visual category filters showcasing delicate artistry.',
      metric: 'Bridal Booking Form',
      bg: 'bg-rose-50 text-rose-600 border-rose-100',
      tag: 'Creative Elite'
    },
    {
      icon: ShoppingBag,
      title: 'Ecommerce Brands',
      description: 'Beautiful Shopify or custom-built products engines featuring speed optimization, reviews logs, and payment APIs.',
      metric: 'Add to Cart Flow',
      bg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      tag: 'SaaS / Brand'
    },
    {
      icon: Sparkles,
      title: 'Salons & Spas',
      description: 'Clean styling profiles, staff scheduling, direct services catalogs, and automated SMS appointment reminders.',
      metric: 'Stylist Selection',
      bg: 'bg-purple-50 text-purple-600 border-purple-100',
      tag: 'Luxury Spas'
    },
    {
      icon: Home,
      title: 'Real Estate Brokers',
      description: 'Stunning property listing feeds, dynamic map embeds, high-resolution house galleries, and automated capture forms.',
      metric: 'Direct Lead Sync',
      bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      tag: 'Agency Listings'
    },
    {
      icon: GraduationCap,
      title: 'Coaching Institutes',
      description: 'Online registration, dynamic class charts, testimonials from successful students, and course listing layouts.',
      metric: 'Student Admission',
      bg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      tag: 'Education Hub'
    },
    {
      icon: Stethoscope,
      title: 'Medical Clinics',
      description: 'Safe consultation request forms, list of specialties, doctor profiles, and emergency operating hours widgets.',
      metric: 'Clinic Appointment',
      bg: 'bg-teal-50 text-teal-600 border-teal-100',
      tag: 'Healthcare'
    },
    {
      icon: Shirt,
      title: 'Clothing Brands',
      description: 'Lookbooks with premium glassmorphism scaling effects, modern filter panels, and integrated checkout carts.',
      metric: 'Interactive Catalog',
      bg: 'bg-orange-50 text-orange-600 border-orange-100',
      tag: 'D2C Apparel'
    }
  ];

  return (
    <section id="industries" className="py-24 px-6 bg-neutral-soft relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col gap-4">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Niche Customization</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-dark tracking-tight">
            Industries We Elevate
          </h2>
          <p className="text-sm sm:text-base text-neutral-dark/60 leading-relaxed">
            We don't build generic templates. Every website is custom-engineered to solve the unique operational and trust challenges of your industry.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, index) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col justify-between bg-white border border-neutral-border rounded-3xl p-7 shadow-premium hover:shadow-md transition-all duration-300 relative overflow-hidden group text-left"
              >
                {/* Visual hover border glow */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-accent-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex flex-col gap-4">
                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${ind.bg}`}>
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-neutral-soft text-neutral-dark/50 px-2.5 py-1 rounded-full">
                      {ind.tag}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-lg text-neutral-dark">
                      {ind.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-dark/60 leading-relaxed">
                      {ind.description}
                    </p>
                  </div>
                </div>

                {/* Growth Feature Indicator */}
                <div className="mt-6 pt-4 border-t border-neutral-border/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-neutral-dark/40">Core Growth Engine:</span>
                  <span className="text-[11px] font-bold text-primary bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-full">
                    ⚡ {ind.metric}
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
