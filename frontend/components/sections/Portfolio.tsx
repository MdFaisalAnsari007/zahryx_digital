'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, ExternalLink, TrendingUp } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  growth: string;
  description: string;
  tags: string[];
  image: string;
  accent: string;
  accentBg: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Pulse Gym Redesign',
    category: 'Gym & Fitness',
    client: 'Pulse Fitness',
    growth: '+140% Member Signups',
    description:
      'Replacing a slow legacy system with a Next.js schedules builder led to an immediate boom in monthly class registrations and online sales.',
    tags: ['Next.js', 'UI/UX', 'Performance'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=900',
    accent: '#2563EB',
    accentBg: 'rgba(37,99,235,0.1)',
  },
  {
    id: 2,
    title: 'Bella Italia Table Booking',
    category: 'Cafes & Restaurants',
    client: 'Rossi Bistro Group',
    growth: '+92% Direct Bookings',
    description:
      'Switching from static PDF menus to a mobile-responsive table coordinator saved thousands in aggregator commissions monthly.',
    tags: ['React', 'Booking System', 'Mobile'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=900',
    accent: '#8B5CF6',
    accentBg: 'rgba(139,92,246,0.1)',
  },
  {
    id: 3,
    title: 'Bloom Spa & Wellness',
    category: 'Beauty & Wellness',
    client: 'Bloom Spa Co.',
    growth: '+78% Online Appointments',
    description:
      'A serene, luxury-forward booking portal with automated reminders reduced no-shows by 60% and boosted repeat visits.',
    tags: ['Booking', 'Branding', 'CRM'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=900',
    accent: '#06B6D4',
    accentBg: 'rgba(6,182,212,0.1)',
  },
  {
    id: 4,
    title: 'SwiftMart E-Commerce',
    category: 'Retail & E-commerce',
    client: 'SwiftMart Ltd.',
    growth: '+210% Conversion Rate',
    description:
      'Full-stack storefront migration to a headless commerce stack slashed load time by 3s and doubled checkout completions.',
    tags: ['E-commerce', 'Headless CMS', 'SEO'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=900',
    accent: '#2563EB',
    accentBg: 'rgba(37,99,235,0.1)',
  },
  {
    id: 5,
    title: 'MedCare Patient Portal',
    category: 'Healthcare',
    client: 'MedCare Clinics',
    growth: '+65% Appointment Retention',
    description:
      'HIPAA-compliant patient dashboard with telemedicine integration and automated prescription renewals.',
    tags: ['Healthcare', 'Dashboard', 'Security'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=900',
    accent: '#8B5CF6',
    accentBg: 'rgba(139,92,246,0.1)',
  },
  {
    id: 6,
    title: 'EduLearn Academy',
    category: 'Education',
    client: 'EduLearn Inc.',
    growth: '+320% Student Enrollments',
    description:
      'Interactive LMS with live classes, progress tracking, and gamification that tripled course completion rates.',
    tags: ['LMS', 'Gamification', 'Video'],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=900',
    accent: '#06B6D4',
    accentBg: 'rgba(6,182,212,0.1)',
  },
];

const CATEGORIES = [
  'All',
  'Gym & Fitness',
  'Cafes & Restaurants',
  'Beauty & Wellness',
  'Retail & E-commerce',
  'Healthcare',
  'Education',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.96,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const filtered =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-28 px-6 bg-white relative overflow-hidden" ref={sectionRef}>

      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-teal/[0.03] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary bg-primary/[0.08] border border-primary/10 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Our Work
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-neutral-dark tracking-tight leading-tight mb-4">
            Projects That{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent">
                Deliver Results
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-primary to-accent-purple opacity-30" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-dark/55 leading-relaxed">
            Real businesses. Real transformations. Every project is built to convert visitors into loyal customers.
          </p>
        </motion.div>

        {/* ── Category Filter Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-2.5 mb-14"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105'
                  : 'bg-white text-neutral-dark/60 border-neutral-border hover:border-primary/30 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full bg-primary -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Projects Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-neutral-border flex flex-col"
                style={{
                  boxShadow:
                    hovered === project.id
                      ? `0 20px 60px ${project.accent}22, 0 4px 20px rgba(0,0,0,0.06)`
                      : '0 4px 30px rgba(0,0,0,0.04)',
                  transform: hovered === project.id ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'box-shadow 0.4s ease, transform 0.4s ease',
                }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Category badge */}
                  <span
                    className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white backdrop-blur-sm border border-white/20"
                    style={{ background: `${project.accent}cc` }}
                  >
                    {project.category}
                  </span>

                  {/* Arrow icon on hover */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={
                      hovered === project.id
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.7 }
                    }
                    transition={{ duration: 0.25 }}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg"
                  >
                    <ArrowUpRight className="w-4 h-4 text-neutral-dark" />
                  </motion.div>

                  {/* Growth pill at bottom of image */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                    <TrendingUp className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span className="text-[11px] font-bold text-neutral-dark">{project.growth}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-neutral-dark mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-dark/60 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg"
                        style={{ background: project.accentBg, color: project.accent }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-border mt-1">
                    <span className="text-xs text-neutral-dark/40 font-medium">{project.client}</span>
                    <motion.button
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline underline-offset-2"
                    >
                      View Case Study
                      <ExternalLink className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-16"
        >
          <p className="text-sm text-neutral-dark/50 mb-5">Want to see your business here?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
          >
            Start Your Project
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
