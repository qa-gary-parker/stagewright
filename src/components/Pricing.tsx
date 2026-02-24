import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CHECKOUT_URLS = {
  monthly: 'https://stagewright.lemonsqueezy.com/checkout/buy/f221d597-70cb-4045-8072-f8cd253c7a71',
  yearly: 'https://stagewright.lemonsqueezy.com/checkout/buy/7aa017e1-7107-4108-83f1-1ae8289d62d8',
};

const tiers = [
  {
    name: 'Local',
    badge: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Beautiful test reporting, forever free.',
    cta: 'npm install',
    ctaHref: 'https://www.npmjs.com/package/playwright-smart-reporter',
    delivery: 'npm package',
    highlighted: false,
    comingSoon: false,
    features: [
      'HTML report with System/Light/Dark themes',
      'AI failure analysis + clustering',
      'Stability grades (A\u2013F)',
      'Run comparison',
      'Retry analysis',
      'Trend analytics',
      'Artifact gallery (screenshots, videos, traces)',
      'Trace viewer integration',
      'Network logs',
      'Test history tracking',
    ],
  },
  {
    name: 'Pro',
    badge: 'Recommended',
    monthlyPrice: 9,
    yearlyPrice: 84,
    description: 'Premium themes, PDF exports, and quality gates.',
    cta: 'Get Pro License',
    ctaHref: CHECKOUT_URLS.monthly,
    delivery: 'License key (same npm package)',
    highlighted: true,
    comingSoon: false,
    features: [
      'Everything in Local, plus:',
      '6 additional Pro themes (ocean, sunset, dracula, cyberpunk, forest, rose)',
      'Executive PDF export (3 themed variants)',
      'PDF style picker modal',
      'JSON + JUnit export',
      'Quality gates (fail builds on thresholds)',
      'Flaky test quarantine',
      'Custom report branding (title + footer)',
      'Custom theme colors (primary, accent, success, error, warning)',
      'Priority support',
    ],
  },
  {
    name: 'Cloud',
    badge: 'Coming Soon',
    monthlyPrice: null,
    yearlyPrice: null,
    description: 'Hosted dashboard for your whole team.',
    cta: 'Coming Soon',
    ctaHref: '',
    delivery: 'Hosted platform',
    highlighted: false,
    comingSoon: true,
    features: [
      'Everything in Pro, plus:',
      'Cloud-hosted dashboard',
      'Team-wide test analytics',
      'Multi-project views',
      'GitHub PR comments',
      'Slack & Teams alerts',
      'SSO / team management',
      'Data retention + history',
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <div id="pricing" className="relative py-24 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-2">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-2 mb-8">
            Start free. Upgrade when you need Pro-level reporting.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-800/50 rounded-full p-1.5 border border-slate-700">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !yearly
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                yearly
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                Save 22%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col ${
                tier.highlighted
                  ? 'bg-slate-800/50 border-2 border-green-500/60 shadow-lg shadow-green-500/10 md:-mt-4 md:mb-[-16px]'
                  : tier.comingSoon
                    ? 'bg-slate-800/30 border-2 border-dashed border-slate-600'
                    : 'bg-slate-800/30 border border-slate-700'
              }`}
            >
              {/* Badge */}
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-green-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                    {tier.badge}
                  </span>
                </div>
              )}
              {tier.comingSoon && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-slate-600 text-slate-200 text-xs font-bold rounded-full uppercase tracking-wider">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-slate-400 text-sm">{tier.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {tier.monthlyPrice === 0 ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">Free</span>
                    <span className="text-slate-400 text-sm">forever</span>
                  </div>
                ) : tier.monthlyPrice !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      £{yearly ? Math.round(tier.yearlyPrice! / 12) : tier.monthlyPrice}
                    </span>
                    <span className="text-slate-400 text-sm">/mo</span>
                    {yearly && (
                      <span className="text-slate-500 text-sm ml-2">
                        (£{tier.yearlyPrice}/yr)
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-500">TBD</span>
                  </div>
                )}
                <div className="text-slate-500 text-xs mt-2">{tier.delivery}</div>
              </div>

              {/* CTA */}
              {tier.comingSoon ? (
                <div className="block w-full text-center py-3 rounded-xl font-semibold text-sm mb-8 bg-slate-700/50 text-slate-400 cursor-default">
                  Coming Soon
                </div>
              ) : (
                <a
                  href={tier.highlighted ? (yearly ? CHECKOUT_URLS.yearly : CHECKOUT_URLS.monthly) : tier.ctaHref}
                  target={tier.highlighted ? '_blank' : undefined}
                  rel={tier.highlighted ? 'noopener noreferrer' : undefined}
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all mb-8 ${
                    tier.highlighted
                      ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  {tier.name === 'Local' ? (
                    <code className="text-sm">npm i playwright-smart-reporter</code>
                  ) : (
                    tier.cta
                  )}
                </a>
              )}

              {/* Pro features link */}
              {tier.highlighted && (
                <div className="mb-6 text-center">
                  <Link
                    to="/docs/pro-themes"
                    className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                  >
                    View all Pro features →
                  </Link>
                </div>
              )}

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    {j === 0 && (feature.startsWith('Everything in') ) ? (
                      <>
                        <span className="text-slate-500 mt-0.5 shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </span>
                        <span className="text-slate-400 italic">{feature}</span>
                      </>
                    ) : (
                      <>
                        <span className={`mt-0.5 shrink-0 ${tier.highlighted ? 'text-green-400' : 'text-slate-500'}`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-slate-300">{feature}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
