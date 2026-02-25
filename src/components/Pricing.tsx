import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CHECKOUT_URLS = {
  starter: 'https://stagewright.lemonsqueezy.com/checkout/buy/STARTER_PRODUCT_ID',
  pro: 'https://stagewright.lemonsqueezy.com/checkout/buy/f221d597-70cb-4045-8072-f8cd253c7a71',
};

const tiers = [
  {
    name: 'Local',
    badge: 'Free',
    price: 0,
    description: 'Beautiful test reporting, forever free.',
    cta: 'npm install',
    ctaHref: 'https://www.npmjs.com/package/playwright-smart-reporter',
    delivery: 'npm package',
    highlighted: false,
    comingSoon: false,
    features: [
      'HTML report with System/Light/Dark themes',
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
    name: 'Starter',
    badge: '',
    price: 5,
    description: 'AI-powered failure analysis for small teams.',
    cta: 'Get Starter',
    ctaHref: CHECKOUT_URLS.starter,
    delivery: 'License key (same npm package)',
    highlighted: false,
    comingSoon: false,
    aiQuota: '2,000',
    features: [
      'Everything in Local, plus:',
      '2,000 AI analyses / month',
      '6 additional Pro themes',
      'Executive PDF export (3 variants)',
      'JSON + JUnit export',
      'Quality gates',
      'Flaky test quarantine',
      'Custom report branding',
    ],
  },
  {
    name: 'Pro',
    badge: 'Best Value',
    price: 9,
    description: 'More AI power, full customisation, priority support.',
    cta: 'Get Pro',
    ctaHref: CHECKOUT_URLS.pro,
    delivery: 'License key (same npm package)',
    highlighted: true,
    comingSoon: false,
    aiQuota: '5,000',
    features: [
      'Everything in Starter, plus:',
      '5,000 AI analyses / month',
      'Custom theme colors (primary, accent, success, error, warning)',
      'PDF style picker modal',
      'Priority support',
    ],
  },
];

export default function Pricing() {
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
            Start free. Add AI-powered failure analysis when you need it.
          </p>
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
                  : 'bg-slate-800/30 border border-slate-700'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className={`px-4 py-1.5 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg ${
                    tier.highlighted ? 'bg-green-600' : 'bg-slate-600'
                  }`}>
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
                {tier.price === 0 ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">Free</span>
                    <span className="text-slate-400 text-sm">forever</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">£{tier.price}</span>
                    <span className="text-slate-400 text-sm">/mo</span>
                  </div>
                )}
                <div className="text-slate-500 text-xs mt-2">{tier.delivery}</div>
              </div>

              {/* AI Quota callout */}
              {'aiQuota' in tier && tier.aiQuota && (
                <div className="mb-6 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-blue-400 font-bold text-lg">{tier.aiQuota}</div>
                  <div className="text-blue-300/70 text-xs">AI analyses per month</div>
                </div>
              )}

              {/* CTA */}
              <a
                href={tier.ctaHref}
                target={tier.price > 0 ? '_blank' : undefined}
                rel={tier.price > 0 ? 'noopener noreferrer' : undefined}
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

              {/* Pro features link */}
              {tier.price > 0 && (
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
                        <span className={`mt-0.5 shrink-0 ${tier.highlighted || tier.price > 0 ? 'text-green-400' : 'text-slate-500'}`}>
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

        {/* Cloud coming soon banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 rounded-2xl p-6 sm:p-8 bg-slate-800/30 border-2 border-dashed border-slate-600 text-center"
        >
          <span className="inline-block px-4 py-1.5 bg-slate-600 text-slate-200 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            Coming Soon
          </span>
          <h3 className="text-xl font-bold text-white mb-2">Cloud</h3>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Hosted dashboard for your whole team — multi-project views, GitHub PR comments, Slack alerts, SSO, and more.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
