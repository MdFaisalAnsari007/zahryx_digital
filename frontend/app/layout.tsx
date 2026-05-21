import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Zahryx Digital | Premium Web Agency for Local Small Businesses',
  description: 'We build high-converting, blazing fast, and SEO-optimized websites for gyms, salons, mehendi artists, cafes, restaurants, real estate, and boutique local brands.',
  keywords: ['digital agency', 'small business website', 'local SEO', 'gym website development', 'restaurant reservation web menu', 'mehendi portfolio', 'salon scheduling builder'],
  authors: [{ name: 'Zahryx Digital Team', url: 'https://zahryxdigital.com' }],
  openGraph: {
    title: 'Zahryx Digital | Premium Web Agency for Local Small Businesses',
    description: 'Elevate your local brand with modern startup luxury design, built-in appointment scheduling, fast catalogs, and local Google Map pack SEO audits.',
    url: 'https://zahryxdigital.com',
    siteName: 'Zahryx Digital',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zahryx Digital | High-Converting Small Business Websites',
    description: 'Ditch slow builder platforms. Custom-coded Next.js websites crafted for high local business search ranking and booking conversions.',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {children}
      </body>
    </html>
  );
}
