import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashLink = (hash: string) => {
    setMobileOpen(false);
    if (location.pathname === '/') {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + hash);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="StageWright" className="w-8 h-8 rounded-lg" />
          <span className="text-lg font-bold text-white">
            Stage<span className="text-green-400">Wright</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleHashLink('#features')}
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => handleHashLink('#pricing')}
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() => handleHashLink('#faq')}
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            FAQ
          </button>
          <Link
            to="/docs"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Docs
          </Link>
          <a
            href="https://stagewright.lemonsqueezy.com/checkout/buy/f221d597-70cb-4045-8072-f8cd253c7a71"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Get Pro
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800/50 bg-slate-950/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-4">
            <button
              onClick={() => handleHashLink('#features')}
              className="text-left text-sm text-slate-300 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => handleHashLink('#pricing')}
              className="text-left text-sm text-slate-300 hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => handleHashLink('#faq')}
              className="text-left text-sm text-slate-300 hover:text-white transition-colors"
            >
              FAQ
            </button>
            <Link
              to="/docs"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Docs
            </Link>
            <a
              href="https://stagewright.lemonsqueezy.com/checkout/buy/f221d597-70cb-4045-8072-f8cd253c7a71"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-lg transition-colors text-center block"
            >
              Get Pro
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
