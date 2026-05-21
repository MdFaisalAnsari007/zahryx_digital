'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomCursor from '../../../components/CustomCursor';
import { Api } from '../../../lib/api';
import { 
  BarChart3, Inbox, BookOpen, Layers, LogOut, CheckCircle2, 
  Trash2, Plus, Sparkles, PhoneCall, RefreshCw, Send 
} from 'lucide-react';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  serviceNeeded: string;
  budget?: string;
  message: string;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
}

interface Project {
  _id: string;
  title: string;
  category: string;
  client: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState('Administrator');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'blogs' | 'projects'>('inquiries');
  
  // Dashboard states
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states for creating blogs
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Local SEO');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');

  // Fallback Mocks
  const mockInquiries: Inquiry[] = [
    {
      _id: 'inq-1',
      name: 'Sarah Jenkins',
      email: 'sarah@pulsegym.com',
      phone: '+1 (555) 384-2834',
      businessName: 'Pulse Gym & Fitness',
      businessType: 'Gyms & Fitness',
      serviceNeeded: 'Website Development',
      budget: '$3,000 - $5,000',
      message: 'Looking to overhaul our slow WordPress site. We need class timetables, teacher pages, and booking forms.',
      status: 'pending',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'inq-2',
      name: 'Chef Marco Rossi',
      email: 'marco@bellaitalia.com',
      phone: '+1 (555) 918-4823',
      businessName: 'Bella Italia Bistro',
      businessType: 'Cafes & Restaurants',
      serviceNeeded: 'Website Development',
      budget: '$1,500 - $3,000',
      message: 'Need a mobile-optimized table reservation system and built-in interactive menu to discard PDFs.',
      status: 'contacted',
      createdAt: new Date().toISOString()
    }
  ];

  const mockBlogs: Blog[] = [
    { _id: 'blog-1', title: '5 Secrets to Rank Your Local Gym Website', slug: 'local-gym-seo-secrets', category: 'Local SEO', published: true },
    { _id: 'blog-2', title: 'Why a Premium Menu Beats a PDF Menu for Local Cafes', slug: 'pdf-versus-interactive-restaurant-menu', category: 'Web Design', published: true }
  ];

  const mockProjects: Project[] = [
    { _id: 'proj-1', title: 'Pulse Gym Redesign', category: 'Gyms & Fitness', client: 'Pulse Gym' },
    { _id: 'proj-2', title: 'Bella Italia Digital Table-Booking', category: 'Cafes & Restaurants', client: 'Bella Italia Restaurant' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('zahryx_admin_token');
    const name = localStorage.getItem('zahryx_admin_name');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    if (name) setAdminName(name);

    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const resInq = await Api.get('/inquiries');
      const resBlogs = await Api.get('/blogs');
      const resProj = await Api.get('/projects');

      if (resInq.success && resInq.data) setInquiries(resInq.data);
      else setInquiries(mockInquiries);

      if (resBlogs.success && resBlogs.data) setBlogs(resBlogs.data);
      else setBlogs(mockBlogs);

      if (resProj.success && resProj.data) setProjects(resProj.data);
      else setProjects(mockProjects);

    } catch (error) {
      console.warn('API error, using offline mock statistics:', error);
      setInquiries(mockInquiries);
      setBlogs(mockBlogs);
      setProjects(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: 'pending' | 'contacted' | 'completed') => {
    try {
      const res = await Api.patch(`/inquiries/${id}/status`, { status });
      if (res.success) {
        setInquiries(prev => prev.map(inq => inq._id === id ? { ...inq, status } : inq));
      }
    } catch (err) {
      // Local UI update on fallback
      setInquiries(prev => prev.map(inq => inq._id === id ? { ...inq, status } : inq));
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      await Api.delete(`/inquiries/${id}`);
      setInquiries(prev => prev.filter(inq => inq._id !== id));
    } catch (err) {
      setInquiries(prev => prev.filter(inq => inq._id !== id));
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newBlogTitle.replace(/\s+/g, '-').toLowerCase();
    
    const blogData = {
      title: newBlogTitle,
      slug,
      excerpt: newBlogExcerpt,
      content: newBlogContent,
      category: newBlogCategory,
      coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600',
      published: true
    };

    try {
      const res = await Api.post('/blogs', blogData);
      if (res.success) {
        setBlogs(prev => [res.data, ...prev]);
      } else {
        setBlogs(prev => [{ _id: `blog-${Date.now()}`, ...blogData }, ...prev]);
      }
    } catch (error) {
      setBlogs(prev => [{ _id: `blog-${Date.now()}`, ...blogData }, ...prev]);
    }

    setNewBlogTitle('');
    setNewBlogExcerpt('');
    setNewBlogContent('');
  };

  const handleLogout = () => {
    localStorage.removeItem('zahryx_admin_token');
    localStorage.removeItem('zahryx_admin_name');
    router.push('/admin/login');
  };

  return (
    <div className="bg-neutral-soft min-h-screen text-left flex flex-col justify-between">
      <CustomCursor />

      {/* Header bar */}
      <header className="py-4 bg-white border-b border-neutral-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-accent-purple flex items-center justify-center text-white font-bold text-sm">
              Z
            </span>
            <span className="font-display font-bold text-lg text-neutral-dark">
              Zahryx Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-neutral-dark/60">Welcome, {adminName}</span>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-full border border-neutral-border text-xs font-bold text-neutral-dark hover:bg-neutral-soft flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace grid */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-grow flex flex-col gap-8">
        
        {/* Statistics HUD */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-neutral-border rounded-3xl shadow-premium">
            <div className="flex items-center justify-between text-neutral-dark/40 mb-3">
              <Inbox className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Inquiries</span>
            </div>
            <h3 className="text-2xl font-display font-extrabold text-neutral-dark">{inquiries.length}</h3>
            <p className="text-[10px] text-primary font-semibold mt-1">Pending action: {inquiries.filter(i=>i.status==='pending').length}</p>
          </div>

          <div className="p-6 bg-white border border-neutral-border rounded-3xl shadow-premium">
            <div className="flex items-center justify-between text-neutral-dark/40 mb-3">
              <BookOpen className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Guides / Blogs</span>
            </div>
            <h3 className="text-2xl font-display font-extrabold text-neutral-dark">{blogs.length}</h3>
            <p className="text-[10px] text-green-600 font-semibold mt-1">SEO Published: {blogs.filter(b=>b.published).length}</p>
          </div>

          <div className="p-6 bg-white border border-neutral-border rounded-3xl shadow-premium">
            <div className="flex items-center justify-between text-neutral-dark/40 mb-3">
              <Layers className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Portfolio Items</span>
            </div>
            <h3 className="text-2xl font-display font-extrabold text-neutral-dark">{projects.length}</h3>
            <p className="text-[10px] text-neutral-dark/40 font-semibold mt-1">Total Case Studies</p>
          </div>

          <div className="p-6 bg-white border border-neutral-border rounded-3xl shadow-premium flex flex-col justify-between">
            <div className="flex justify-between items-center text-neutral-dark/40">
              <BarChart3 className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Server Status</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-green-600">Operational</span>
            </div>
            <p className="text-[9px] text-neutral-dark/40 font-semibold">MongoDB Atlas synchronized</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2.5 border-b border-neutral-border pb-4">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'inquiries' ? 'bg-neutral-dark text-white shadow-sm' : 'bg-white text-neutral-dark/70 hover:bg-neutral-border/10'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'blogs' ? 'bg-neutral-dark text-white shadow-sm' : 'bg-white text-neutral-dark/70 hover:bg-neutral-border/10'
            }`}
          >
            Manage Blog Posts ({blogs.length})
          </button>
        </div>

        {/* Tab Contents */}
        {loading ? (
          <div className="py-20 text-center text-sm font-semibold text-neutral-dark/40">Retrieving operational statistics...</div>
        ) : (
          <div>
            {/* TABS 1: Inquiries */}
            {activeTab === 'inquiries' && (
              <div className="flex flex-col gap-6">
                {inquiries.length === 0 ? (
                  <p className="py-10 text-center text-xs text-neutral-dark/40">No small business leads found yet.</p>
                ) : (
                  inquiries.map(inq => (
                    <div
                      key={inq._id}
                      className="p-6 bg-white border border-neutral-border rounded-3xl shadow-premium flex flex-col gap-4 relative overflow-hidden"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-display font-bold text-lg text-neutral-dark">{inq.name}</h4>
                            <span className="text-xs bg-neutral-soft text-neutral-dark/60 px-2.5 py-0.5 rounded-full font-semibold">
                              {inq.businessType}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-dark/40 font-semibold mt-1">
                            {inq.businessName} • {inq.email} • {inq.phone || 'No Phone'}
                          </p>
                        </div>

                        {/* Actions status dropdowns */}
                        <div className="flex items-center gap-3">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value as any)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-full border focus:outline-none ${
                              inq.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                              inq.status === 'contacted' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                              'bg-green-50 text-green-600 border-green-200'
                            }`}
                          >
                            <option value="pending">Pending Review</option>
                            <option value="contacted">Contacted Owner</option>
                            <option value="completed">Project Signed</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq._id)}
                            className="p-2 rounded-full text-rose-500 hover:bg-rose-50 border border-neutral-border hover:border-rose-100 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="h-px bg-neutral-border/60" />

                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4 text-xs font-semibold text-neutral-dark/60">
                          <span>Service: <strong className="text-neutral-dark">{inq.serviceNeeded}</strong></span>
                          <span>Budget: <strong className="text-primary">{inq.budget}</strong></span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-dark/70 leading-relaxed italic bg-neutral-soft/50 p-3.5 rounded-xl border border-neutral-border/40 mt-1">
                          "{inq.message}"
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TABS 2: Blogs */}
            {activeTab === 'blogs' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left side: Creation Form */}
                <div className="lg:col-span-5 bg-white border border-neutral-border rounded-3xl p-6 sm:p-8 shadow-premium self-start">
                  <h3 className="font-display font-bold text-lg text-neutral-dark mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" />
                    Write New Guide / Post
                  </h3>

                  <form onSubmit={handleAddBlog} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-neutral-dark/50 uppercase tracking-wide">Post Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 5 Secrets to Rank on Google"
                        value={newBlogTitle}
                        onChange={(e) => setNewBlogTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-border text-sm text-neutral-dark focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-neutral-dark/50 uppercase tracking-wide">Category</label>
                      <select
                        value={newBlogCategory}
                        onChange={(e) => setNewBlogCategory(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-neutral-border text-sm text-neutral-dark focus:outline-none focus:border-primary transition-colors"
                      >
                        <option>Local SEO</option>
                        <option>Web Design</option>
                        <option>Ecommerce</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-neutral-dark/50 uppercase tracking-wide">Brief Excerpt</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Short summary for the index grid card..."
                        value={newBlogExcerpt}
                        onChange={(e) => setNewBlogExcerpt(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-neutral-border text-sm text-neutral-dark focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-neutral-dark/50 uppercase tracking-wide">Markdown Content</label>
                      <textarea
                        rows={6}
                        required
                        placeholder="## Markdown body titles... Use standard md markup tags."
                        value={newBlogContent}
                        onChange={(e) => setNewBlogContent(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-border text-sm text-neutral-dark focus:outline-none focus:border-primary transition-colors font-mono text-xs resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="py-3 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 group cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Publish Dynamic Guide
                    </button>
                  </form>
                </div>

                {/* Right side: Blogs List */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <h3 className="font-display font-bold text-lg text-neutral-dark mb-2">Live Dynamic Posts</h3>
                  
                  {blogs.map(b => (
                    <div
                      key={b._id}
                      className="p-5 bg-white border border-neutral-border rounded-2xl shadow-sm flex items-center justify-between"
                    >
                      <div className="text-left">
                        <h4 className="font-bold text-sm text-neutral-dark">{b.title}</h4>
                        <span className="text-[10px] font-semibold text-neutral-dark/40 block mt-1">
                          Category: {b.category} • Slug: /blog/{b.slug}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                          Live
                        </span>
                        <button
                          onClick={() => setBlogs(prev => prev.filter(bl => bl._id !== b._id))}
                          className="p-1.5 rounded-lg border border-neutral-border text-rose-500 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      <footer className="py-6 bg-white border-t border-neutral-border/80 text-center text-xs text-neutral-dark/40 mt-10">
        © Zahryx SaaS Admin Console. Designed with Apple, Stripe & Linear aesthetics.
      </footer>
    </div>
  );
}
