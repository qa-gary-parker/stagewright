import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Demo from './components/Demo';
import Pricing from './components/Pricing';
import EmailSignup from './components/EmailSignup';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <Hero />
      <Features />
      <Demo />
      <Pricing />
      <EmailSignup />
      <FAQ />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
