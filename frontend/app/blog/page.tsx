'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomCursor from '../../components/CustomCursor';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Api } from '../../lib/api';
import { BookOpen, Calendar, ArrowLeft, Search } from 'lucide-react';

interface Blog {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readTime: string;
  createdAt: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Realistic mock data as robust fallback
  const mockBlogs: Blog[] = [
    {
      title: '5 Crucial Secrets to Rank Your Local Gym Website on Google',
      slug: 'local-gym-seo-secrets',
      excerpt: 'Discover the exact Local SEO setup strategies that bring fresh gym memberships through organic search queries.',
      category: 'Local SEO',
      coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
      readTime: '6 min read',
      createdAt: new Date().toISOString()
    },
    {
      title: 'Why a Premium Menu Beats a PDF Menu for Local Restaurants',
      slug: 'pdf-versus-interactive-restaurant-menu',
      excerpt: 'Stop forcing customers to download slow PDFs on their smartphones. Learn how responsive interactive menus increase average order values.',
      category: 'Web Design',
      coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600',
      readTime: '4 min read',
      createdAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await Api.get('/blogs');
        if (res.success && res.data && res.data.length > 0) {
          setBlogs(res.data);
        } else {
          setBlogs(mockBlogs);
        }
      } catch (error) {
        console.warn('Backend not responding, loading simulated SEO articles:', error);
        setBlogs(mockBlogs);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const categories = ['All', 'Local SEO', 'Web Design', 'Ecommerce'];

  const filteredBlogs = activeCategory === 'All' 
    ? blogs 
    : blogs.filter(b => b.category === activeCategory);

  return (
    <div className="bg-neutral-soft min-h-screen text-left flex flex-col justify-between">
      <CustomCursor />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 w-full flex-grow">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-dark/60 hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Agency Home
        </Link>

        {/* Heading */}
        <div className="flex flex-col gap-4 max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Insight Logs</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-neutral-dark tracking-tight leading-tight">
            Grow Your Local Business
          </h1>
          <p className="text-sm sm:text-base text-neutral-dark/60 leading-relaxed">
            Free high-value guides, marketing tactics, and design audits written by the Zahryx Digital growth strategists.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2.5 mb-10 border-b border-neutral-border pb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-neutral-dark/70 border-neutral-border hover:border-neutral-dark/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="py-20 text-center text-sm font-semibold text-neutral-dark/40">Loading insights...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-20 text-center text-sm font-semibold text-neutral-dark/40">No posts found in this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <article
                key={blog.slug}
                className="bg-white border border-neutral-border rounded-3xl overflow-hidden shadow-premium flex flex-col justify-between group hover:border-primary/20 transition-all duration-300"
              >
                <div>
                  {/* Cover */}
                  <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-border relative">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-neutral-dark border border-neutral-border/40">
                      {blog.category}
                    </span>
                  </div>

                  {/* Body info */}
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-neutral-dark/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-neutral-dark group-hover:text-primary transition-colors leading-snug">
                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-dark/60 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer read link */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary-light transition-colors"
                  >
                    <span>Read Guide</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>

              </article>
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
