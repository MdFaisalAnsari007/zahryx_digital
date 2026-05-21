'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import CustomCursor from '../../../components/CustomCursor';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Api } from '../../../lib/api';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, BookOpen, User } from 'lucide-react';

interface Blog {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  content: string;
  coverImage: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
}

export default function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Realistic mock databases as fallback
  const mockBlogs: Record<string, Blog> = {
    'local-gym-seo-secrets': {
      title: '5 Crucial Secrets to Rank Your Local Gym Website on Google',
      slug: 'local-gym-seo-secrets',
      excerpt: 'Discover the exact Local SEO setup strategies that bring fresh gym memberships through organic search queries.',
      category: 'Local SEO',
      coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
      readTime: '6 min read',
      createdAt: new Date().toISOString(),
      author: {
        name: 'Zahryx SEO Specialist',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
      },
      content: `## Why Local SEO is the Secret Weapon for Gym Owners

For small, local fitness centers and gyms, showing up in Google's **"Map Pack"** or "Gym near me" searches represents 80% of new monthly visitors.

### 1. Optimize Your Google Business Profile
First things first. You must register and claim your Google Business Profile (GBP).
- Fill out your description using relevant keywords like "Boutique Strength Gym".
- Upload high-resolution images of your equipment, locker rooms, and coaches weekly.
- Gather feedback from your members directly using dynamic short links.

### 2. Fast Loading Speeds & Core Web Vitals
If a user searches for a local gym on their mobile phone and your site takes longer than **3 seconds** to load, they will swipe back to search results.
- Implement lazy-loading for images.
- Reduce font size variations.
- Avoid large, blocking JS script loads.

### 3. Local Citations & Business Schema
Make sure you include your precise **Name, Address, and Phone Number (NAP)** in the footer of your website. Embed JSON-LD LocalBusiness schemas inside the header to declare your operating hours and coordinates clearly to web crawling robots.
`
    },
    'pdf-versus-interactive-restaurant-menu': {
      title: 'Why a Premium Menu Beats a PDF Menu for Local Restaurants',
      slug: 'pdf-versus-interactive-restaurant-menu',
      excerpt: 'Stop forcing customers to download slow PDFs on their smartphones. Learn how responsive interactive menus increase average order values.',
      category: 'Web Design',
      coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800',
      readTime: '4 min read',
      createdAt: new Date().toISOString(),
      author: {
        name: 'Zahryx Creative Lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
      },
      content: `## The Modern Diner is Mobile-First

We have all done it: sitting at a beautiful restaurant table, trying to scan a QR code, only to wait 15 seconds for a 12MB PDF of the drink menu to download on our phone. 

PDF menus are terrible for user experience, mobile styling, and Google crawlers.

### The Downside of PDF Menus
- **Terrible Scaling**: Diners have to constantly zoom in and scroll left-to-right to read font sizes of appetizers.
- **No Search Discoverability**: Google cannot parse menu items dynamically to serve queries like "best lasagna near me."
- **Slow Performance**: Large files strain local LTE and 4G connections inside historic brick buildings.

### The Interactive Alternative
An interactive, lightweight, built-in website menu allows instant loading, smooth categorization (Appetizers, Mains, Cocktails), CSS-styled elegant fonts, beautiful high-quality picture previews, and direct table-side ordering integrations.
`
    }
  };

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await Api.get(`/blogs/${slug}`);
        if (res.success && res.data) {
          setBlog(res.data);
        } else {
          setBlog(mockBlogs[slug] || null);
        }
      } catch (error) {
        console.warn('Backend not responding, loading mock article:', error);
        setBlog(mockBlogs[slug] || null);
      } finally {
        setLoading(false);
      }
    }
    loadBlog();

    // Scroll progress bar calculations
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-neutral-soft min-h-screen flex items-center justify-center">
        <p className="text-sm font-semibold text-neutral-dark/40">Loading guide details...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-neutral-soft min-h-screen flex flex-col items-center justify-center gap-4 text-left">
        <h2 className="font-display font-bold text-2xl text-neutral-dark">Guide Not Found</h2>
        <Link href="/blog" className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-semibold">
          Return to Blog List
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-soft min-h-screen text-left flex flex-col justify-between">
      <CustomCursor />
      <Navbar />

      {/* Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-primary to-accent-purple z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 w-full flex-grow">
        
        {/* Back navigation link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-dark/60 hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Blog List
        </Link>

        {/* Dynamic header cards */}
        <div className="flex flex-col gap-6 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 border border-primary/10 px-3.5 py-1 rounded-full self-start">
            {blog.category}
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-dark tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Author/Date Info */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-neutral-border/60">
            <div className="flex items-center gap-2.5">
              <img
                src={blog.author?.avatar}
                alt={blog.author?.name}
                className="w-8 h-8 rounded-full object-cover border border-neutral-border"
              />
              <span className="text-xs font-bold text-neutral-dark">{blog.author?.name}</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-semibold text-neutral-dark/40">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {blog.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="aspect-[21/10] w-full rounded-3xl overflow-hidden bg-neutral-border mb-12 shadow-premium">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Body formatted beautifully with standard Tailwind styling */}
        <div className="prose prose-blue max-w-none bg-white p-8 sm:p-12 rounded-3xl border border-neutral-border shadow-premium leading-relaxed text-neutral-dark/80 text-sm sm:text-base">
          <ReactMarkdown
            components={{
              h2: ({ ...props }) => <h2 className="font-display font-bold text-2xl text-neutral-dark mt-8 mb-4 border-b border-neutral-border/60 pb-2" {...props} />,
              h3: ({ ...props }) => <h3 className="font-display font-bold text-xl text-neutral-dark mt-6 mb-3" {...props} />,
              p: ({ ...props }) => <p className="mb-4 text-neutral-dark/70 leading-relaxed" {...props} />,
              ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4 flex flex-col gap-2" {...props} />,
              li: ({ ...props }) => <li className="text-neutral-dark/70" {...props} />,
              strong: ({ ...props }) => <strong className="font-semibold text-neutral-dark" {...props} />,
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

      </main>

      <Footer />
    </div>
  );
}
