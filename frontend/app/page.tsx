import ScrollProvider from '../components/ScrollProvider';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Industries from '../components/sections/Industries';
import Portfolio from '../components/sections/Portfolio';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import Process from '../components/sections/Process';
import Contact from '../components/sections/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <ScrollProvider>
      <CustomCursor />
      
      {/* Navigation bar */}
      <Navbar />

      {/* Primary Section Blocks */}
      <main className="w-full flex flex-col">
        <Hero />
        <Services />
        <Industries />
        <Portfolio />
        <WhyChooseUs />
        <Testimonials />
        <Process />
        <Contact />
      </main>

      {/* Footer bar */}
      <Footer />
    </ScrollProvider>
  );
}
