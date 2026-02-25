import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProBadge from './ProBadge';

const Icons = {
  ai: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  chart: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  lightning: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  search: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  image: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  target: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  shield: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  document: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  refresh: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  grade: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  compare: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  bell: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  clock: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  pro?: boolean;
}

const features: Feature[] = [
  {
    icon: Icons.ai,
    title: 'AI-Powered Analysis',
    description: 'AI-powered failure analysis with actionable fix suggestions. Choose from 2,000 or 5,000 analyses/month — no API keys needed.',
    color: 'from-blue-500 to-cyan-500',
    pro: true,
  },
  {
    icon: Icons.grade,
    title: 'Stability Grades',
    description: 'Every test gets a stability score from A+ to F. Instantly identify your most problematic tests with letter grades.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Icons.compare,
    title: 'Run Comparison',
    description: 'Compare any run against a baseline. See new failures, fixed tests, and performance changes at a glance.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Icons.search,
    title: 'One-Click Trace Viewer',
    description: 'Traces embedded directly in reports. One click opens trace.playwright.dev with full context - no downloads needed.',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: Icons.clock,
    title: 'Performance Tracking',
    description: 'Detect performance regressions automatically. See which tests got slower and identify the slowest steps.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Icons.refresh,
    title: 'Retry Analysis',
    description: 'Track retry patterns across runs. Know exactly which tests needed retries and how often they fail initially.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Icons.image,
    title: 'Artifact Gallery',
    description: 'Screenshots, videos, and traces in a filterable gallery. Lightbox viewing with test context preserved.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Icons.bell,
    title: 'Slack & Teams Alerts',
    description: 'Get notified instantly when tests fail. Rich notifications with failure summaries sent to your team channels.',
    color: 'from-indigo-500 to-purple-500',
    pro: true,
  },
  {
    icon: Icons.chart,
    title: 'Trend Analytics',
    description: 'Track pass rates, duration, and flakiness over time. Multiple chart types show your test health history.',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Icons.shield,
    title: 'Quality Gates',
    description: 'Set pass rate thresholds, max failures, and duration limits. Fail CI on gate violations to enforce quality standards.',
    color: 'from-green-500 to-teal-500',
    pro: true,
  },
  {
    icon: Icons.document,
    title: 'PDF Export',
    description: 'Generate professional PDF reports. Executive summary, full detail, and custom templates for stakeholder communication.',
    color: 'from-violet-500 to-purple-500',
    pro: true,
  },
  {
    icon: Icons.refresh,
    title: 'Flaky Quarantine',
    description: 'Auto-detect and quarantine flaky tests. Track quarantine history and recovery to keep your suite reliable.',
    color: 'from-amber-500 to-yellow-500',
    pro: true,
  },
];

export default function Features() {
  return (
    <div id="features" className="relative py-24 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-green-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">Features</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-2">
            Enterprise-Grade Test Analytics
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-2">
            The beautiful, feature-rich dashboard Playwright has been missing. Track, analyze, and share test results across your entire team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative card-hover bg-slate-800/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-8 border border-slate-700/50 hover:border-slate-600 group"
            >
              {feature.pro && (
                <div className="absolute top-3 right-3">
                  <ProBadge />
                </div>
              )}
              <div className={`mb-5 p-3 rounded-xl bg-gradient-to-br ${feature.color} w-fit shadow-lg`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CI Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 text-sm uppercase tracking-wider mb-6">Works with your CI/CD</p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12">
            {/* GitHub Actions */}
            <div className="flex items-center gap-2 md:gap-3 text-slate-400">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-medium">GitHub Actions</span>
            </div>
            {/* GitLab CI */}
            <div className="flex items-center gap-2 md:gap-3 text-slate-400">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
              </svg>
              <span className="font-medium">GitLab CI</span>
            </div>
            {/* CircleCI */}
            <div className="flex items-center gap-2 md:gap-3 text-slate-400">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5a7.5 7.5 0 110 15 7.5 7.5 0 010-15zm0 3a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"/>
              </svg>
              <span className="font-medium">CircleCI</span>
            </div>
            {/* Jenkins */}
            <div className="flex items-center gap-2 md:gap-3 text-slate-400">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.5 4a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm-6 3h7v2h-7V7zm0 4h7v2h-7v-2zm0 4h7v2h-7v-2z"/>
              </svg>
              <span className="font-medium">Jenkins</span>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon / Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <p className="text-purple-400 text-sm font-semibold uppercase tracking-wider mb-4">Roadmap</p>
            <h3 className="text-3xl font-bold text-white mb-4">Coming Soon</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We're constantly improving StageWright. Here's what's on our roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'GitHub PR Comments',
                description: 'Auto-post test summaries directly on your pull requests',
                status: 'In Development',
                statusColor: 'bg-yellow-500'
              },
              {
                title: 'Smart Test Selection',
                description: 'AI-powered selection to run only tests affected by your changes',
                status: 'Planned',
                statusColor: 'bg-emerald-500'
              },
              {
                title: 'Team Dashboard',
                description: 'Multi-project views with team-wide test health metrics',
                status: 'Planned',
                statusColor: 'bg-emerald-500'
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-800/20 rounded-xl p-6 border border-slate-700/50 border-dashed"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${item.statusColor}`}></span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">{item.status}</span>
                </div>
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-slate-500 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-500 text-sm">
              Have a feature request?{' '}
              <Link to="/docs" className="text-green-400 hover:text-green-300 transition-colors">
                Check out the docs
              </Link>
              {' '}and let us know!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
