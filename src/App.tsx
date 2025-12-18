import { Analytics } from '@vercel/analytics/react';
import Hero from './components/Hero';
import Features from './components/Features';
import Demo from './components/Demo';
import EmailSignup from './components/EmailSignup';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Hero />
      <Features />
      <Demo />
      <EmailSignup />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
