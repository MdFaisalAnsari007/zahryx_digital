import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-soft border-t border-neutral-border py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* About column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Zahryx Digital"
              className="h-[120px] w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-neutral-dark/60 leading-relaxed max-w-sm">
            We build luxury-standard, fast, and SEO-optimized websites that attract local clients and accelerate revenue growth for small businesses.
          </p>
        </div>

        {/* Services column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-neutral-dark text-sm tracking-wider uppercase">Our Services</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-neutral-dark/60">
            <li><a href="#services" className="hover:text-primary transition-colors">Web Development</a></li>
            <li><a href="#services" className="hover:text-primary transition-colors">Ecommerce Platforms</a></li>
            <li><a href="#services" className="hover:text-primary transition-colors">Local SEO Ranking</a></li>
            <li><a href="#services" className="hover:text-primary transition-colors">UI/UX Design</a></li>
            <li><a href="#services" className="hover:text-primary transition-colors">Branding & Logo Design</a></li>
          </ul>
        </div>

        {/* Niche solutions column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-neutral-dark text-sm tracking-wider uppercase">Industries Served</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-neutral-dark/60">
            <li><a href="#industries" className="hover:text-primary transition-colors">Gyms & Studios</a></li>
            <li><a href="#industries" className="hover:text-primary transition-colors">Cafes & Restaurants</a></li>
            <li><a href="#industries" className="hover:text-primary transition-colors">Salons & Spas</a></li>
            <li><a href="#industries" className="hover:text-primary transition-colors">Mehendi Artists</a></li>
            <li><a href="#industries" className="hover:text-primary transition-colors">Clinics & Real Estate</a></li>
          </ul>
        </div>

        {/* Contact column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-bold text-neutral-dark text-sm tracking-wider uppercase">Say Hello</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-neutral-dark/60">
            <li>Email: <a href="mailto:hello@zahryxdigital.com" className="hover:text-primary transition-colors">hello@zahryxdigital.com</a></li>
            <li>Phone: <span className="text-neutral-dark/80">+1 (555) 384-9284</span></li>
            <li>HQ: <span className="text-neutral-dark/80">Premium Startup Block, Suite 402</span></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-border/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-dark/40">
        <p>© {currentYear} Zahryx Digital Agency. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="/admin/login" className="hover:text-primary transition-colors">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
