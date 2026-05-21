'use client';

import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      role: 'Owner',
      company: 'Pulse Gym & Fitness',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      review: 'Zahryx completely rebuilt our local gym website. Our organic class bookings increased by 140% in two months. Local owners can trust this team blindly!',
      industry: 'Gym & Fitness'
    },
    {
      name: 'Rahul Mehta',
      role: 'Lead Artist',
      company: 'Mehta Mehendi Designs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      review: 'Bridal clients immediately feel the luxury premium standard of my henna work. The detailed image gallery loads instantly even on poor mobile connections.',
      industry: 'Mehendi & Henna Art'
    },
    {
      name: 'Chef Marco Rossi',
      role: 'Founder',
      company: 'Bella Italia Bistro',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      review: 'Our new table reservation panel has been incredibly reliable. Diners love the visual, clean layout on their iPhones. Averaging 30+ new direct bookings a week now.',
      industry: 'Cafes & Restaurants'
    },
    {
      name: 'Elena Rostova',
      role: 'Marketing Director',
      company: 'Apex Real Estate',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
      review: 'We required dynamic property cards with speed loading filters. Zahryx designed an absolute masterpiece that generates fresh, exclusive home inquiries daily.',
      industry: 'Real Estate'
    }
  ];

  // Double array to ensure infinite seamless marquee loop
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Testimonials</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-dark tracking-tight">
            Loved By Local Business Owners
          </h2>
          <p className="text-sm sm:text-base text-neutral-dark/60 leading-relaxed">
            See how small brands achieved high conversion rates, streamlined operations, and elevated customer trust.
          </p>
        </div>

      </div>

      {/* Testimonial Moving Marquee */}
      <div className="w-full relative flex items-center overflow-x-hidden">
        {/* Gradients on sides for fading edge look */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 py-4 animate-marquee whitespace-nowrap">
          {marqueeItems.map((rev, index) => (
            <div
              key={`${rev.name}-${index}`}
              className="inline-block w-[300px] sm:w-[380px] bg-neutral-soft border border-neutral-border rounded-3xl p-6 sm:p-8 whitespace-normal text-left shadow-premium select-none hover:border-primary/30 transition-colors"
            >
              
              {/* Rating stars */}
              <div className="flex gap-1 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-neutral-dark/70 italic leading-relaxed mb-6">
                "{rev.review}"
              </p>

              {/* Profile Card */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-border/60">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-neutral-border"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-dark leading-tight">{rev.name}</h4>
                  <p className="text-[10px] sm:text-xs text-neutral-dark/40 font-semibold">{rev.role}, {rev.company}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
