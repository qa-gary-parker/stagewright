import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const installCommand = 'npm install playwright-smart-reporter --save-dev';

const configExample = `// playwright.config.ts
reporter: [
  ['playwright-smart-reporter', {
    outputFile: 'smart-report.html',
  }]
]`;

export default function EmailSignup() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="get-started" className="relative py-24 px-6 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4">
              Get Started Today
            </h2>
            <p className="text-base sm:text-xl text-green-100 text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
              Install the reporter, add it to your Playwright config, and start generating beautiful reports in seconds.
            </p>

            <div className="max-w-2xl mx-auto space-y-6">
              {/* Install command */}
              <div>
                <p className="text-green-200 text-sm font-medium mb-2">1. Install the package</p>
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
                  <code className="flex-1 px-4 py-3 text-green-100 text-sm sm:text-base font-mono overflow-x-auto">
                    {installCommand}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="shrink-0 px-4 py-3 text-green-200 hover:text-white transition-colors border-l border-white/10"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Config example */}
              <div>
                <p className="text-green-200 text-sm font-medium mb-2">2. Add the reporter to your config</p>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 px-4 py-3">
                  <pre className="text-green-100 text-sm font-mono overflow-x-auto whitespace-pre">{configExample}</pre>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <a
                  href="https://stagewright.lemonsqueezy.com/checkout/buy/f221d597-70cb-4045-8072-f8cd253c7a71"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-700 text-base sm:text-lg font-bold rounded-xl hover:bg-green-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Pro License
                </a>
                <Link
                  to="/docs"
                  className="text-green-100 hover:text-white text-base sm:text-lg font-medium transition-colors"
                >
                  Read the docs →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
