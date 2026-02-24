import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
          {/* Column 1: Branding */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-3">
              <img src="/logo.png" alt="StageWright Logo" className="w-14 h-14 rounded-xl" />
              <h3 className="text-2xl font-bold text-white">
                Stage<span className="text-green-400">Wright</span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Get your test stage right.
            </p>
            <a
              href="/demo-report.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
            >
              StageWright Local Demo →
            </a>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="/#features" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <Link to="/docs" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.npmjs.com/package/playwright-smart-reporter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  npm
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gary-parker/playwright-smart-reporter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/gary-parker/playwright-smart-reporter/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  GitHub Issues
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@stagewright.dev"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  support@stagewright.dev
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            © {currentYear} StageWright. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
