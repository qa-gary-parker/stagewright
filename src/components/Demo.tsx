import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data for realistic demo
const mockTests = [
  { name: 'Login flow works correctly', file: 'auth.spec.ts', status: 'passed', duration: 2.34, grade: 'A', retries: 0 },
  { name: 'User can add items to cart', file: 'cart.spec.ts', status: 'passed', duration: 4.12, grade: 'A', retries: 0 },
  { name: 'Checkout process completes', file: 'checkout.spec.ts', status: 'failed', duration: 8.45, grade: 'C', retries: 2, error: 'TimeoutError: Waiting for selector ".payment-btn"', aiSuggestion: 'The payment button selector may have changed. Check if the class name was updated in a recent deployment. Similar failures occurred in PR #847 when the payment module was refactored.' },
  { name: 'Search returns relevant results', file: 'search.spec.ts', status: 'passed', duration: 1.89, grade: 'B', retries: 1 },
  { name: 'User profile updates correctly', file: 'profile.spec.ts', status: 'flaky', duration: 3.21, grade: 'D', retries: 3, error: 'Intermittent failure - element detached', aiSuggestion: 'This test has a 70% flakiness rate over the last 30 runs. The element detachment suggests a race condition. Consider using page.waitForSelector() with attached state before interaction.' },
];

const trendData = [
  { day: 'Mon', passRate: 82, duration: 45, flaky: 3, slow: 2 },
  { day: 'Tue', passRate: 85, duration: 42, flaky: 2, slow: 3 },
  { day: 'Wed', passRate: 78, duration: 51, flaky: 4, slow: 2 },
  { day: 'Thu', passRate: 91, duration: 38, flaky: 1, slow: 1 },
  { day: 'Fri', passRate: 88, duration: 41, flaky: 2, slow: 2 },
  { day: 'Sat', passRate: 94, duration: 36, flaky: 1, slow: 1 },
  { day: 'Now', passRate: 92, duration: 39, flaky: 1, slow: 1 },
];

// SVG Icons
const Icons = {
  ai: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  chart: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  check: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  image: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  folder: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  clock: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  refresh: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  play: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  download: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  search: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  alert: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  target: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  sparkles: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

function ProgressRing({ value, color }: { value: number; color: string }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-28 h-28">
      <svg className="w-28 h-28 transform -rotate-90">
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-slate-700"
        />
        <motion.circle
          cx="56"
          cy="56"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{value}%</span>
      </div>
    </div>
  );
}

function MiniChart({ data, dataKey, color, label }: { data: typeof trendData; dataKey: keyof typeof trendData[0]; color: string; label: string }) {
  const maxValue = Math.max(...data.map(d => Number(d[dataKey])));

  return (
    <div className="bg-slate-900/50 rounded-lg p-4">
      <div className="text-sm text-slate-400 mb-3">{label}</div>
      <div className="flex items-end gap-1 h-16">
        {data.map((d, i) => {
          const height = (Number(d[dataKey]) / maxValue) * 100;
          const isLast = i === data.length - 1;
          return (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`flex-1 rounded-t ${isLast ? 'ring-2 ring-white' : ''}`}
              style={{ backgroundColor: color, opacity: isLast ? 1 : 0.7 }}
              title={`${d.day}: ${d[dataKey]}`}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-xs text-slate-500">
        <span>Mon</span>
        <span>Now</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    passed: 'bg-green-500/20 text-green-400 border-green-500/30',
    failed: 'bg-red-500/20 text-red-400 border-red-500/30',
    flaky: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    skipped: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  };
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded border ${styles[status] || styles.skipped}`}>
      {status.toUpperCase()}
    </span>
  );
}

function GradeBadge({ grade }: { grade: string }) {
  const styles: Record<string, string> = {
    A: 'bg-green-500 text-white',
    B: 'bg-blue-500 text-white',
    C: 'bg-yellow-500 text-black',
    D: 'bg-orange-500 text-white',
    F: 'bg-red-500 text-white',
  };
  return (
    <span className={`w-7 h-7 flex items-center justify-center text-sm font-bold rounded ${styles[grade]}`}>
      {grade}
    </span>
  );
}

export default function Demo() {
  const [activeTab, setActiveTab] = useState('ai');
  const [selectedTest, setSelectedTest] = useState<typeof mockTests[0] | null>(null);
  const [testFilter, setTestFilter] = useState<'all' | 'passed' | 'failed' | 'flaky'>('all');
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'screenshots' | 'videos' | 'traces'>('all');

  const tabs = [
    { id: 'ai', label: 'AI Analysis', icon: Icons.ai },
    { id: 'pro', label: 'Pro Features', icon: Icons.sparkles },
    { id: 'tests', label: 'Test Results', icon: Icons.check },
    { id: 'dashboard', label: 'Dashboard', icon: Icons.chart },
    { id: 'gallery', label: 'Gallery', icon: Icons.image },
  ];

  const passed = mockTests.filter(t => t.status === 'passed').length;
  const failed = mockTests.filter(t => t.status === 'failed').length;
  const flaky = mockTests.filter(t => t.status === 'flaky').length;

  // Filter tests based on selected filter
  const filteredTests = testFilter === 'all'
    ? mockTests
    : mockTests.filter(t => t.status === testFilter);

  // Test filter options
  const testFilters = [
    { id: 'all' as const, label: 'All', count: mockTests.length },
    { id: 'passed' as const, label: 'Passed', count: passed },
    { id: 'failed' as const, label: 'Failed', count: failed },
    { id: 'flaky' as const, label: 'Flaky', count: flaky },
  ];

  // Gallery filter options
  const galleryFilters = [
    { id: 'all' as const, label: 'All', count: 8 },
    { id: 'screenshots' as const, label: 'Screenshots', count: 4 },
    { id: 'videos' as const, label: 'Videos', count: 2 },
    { id: 'traces' as const, label: 'Traces', count: 2 },
  ];

  return (
    <div id="demo" className="relative py-24 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-2">
            See StageWright in Action
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-2">
            A beautiful, centralized dashboard for all your Playwright test results, artifacts, and analytics.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-6 sm:mb-8 gap-2" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.id === 'ai' ? 'AI' : tab.id === 'pro' ? 'Pro' : tab.id === 'tests' ? 'Tests' : tab.id === 'dashboard' ? 'Stats' : 'Gallery'}</span>
            </button>
          ))}
        </div>

        {/* Demo Content */}
        <motion.div
          key={activeTab}
          role="tabpanel"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-6 md:p-12 border border-slate-700 shadow-2xl"
        >
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Header with Stats */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start">
                {/* Progress Ring */}
                <div className="flex flex-col items-center shrink-0">
                  <ProgressRing value={92} color="#22c55e" />
                  <span className="text-slate-400 text-sm mt-2">Pass Rate</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 flex-1 w-full">
                  {[
                    { label: 'Passed', value: passed, color: 'text-green-400', bg: 'bg-green-500/10' },
                    { label: 'Failed', value: failed, color: 'text-red-400', bg: 'bg-red-500/10' },
                    { label: 'Flaky', value: flaky, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                    { label: 'Slow', value: 1, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                    { label: 'Duration', value: '39s', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`${stat.bg} rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-slate-700/50`}
                    >
                      <div className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-slate-400 text-xs sm:text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trend Charts Grid */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Test Run Trends</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MiniChart data={trendData} dataKey="passRate" color="#22c55e" label="Pass Rate (%)" />
                  <MiniChart data={trendData} dataKey="duration" color="#a855f7" label="Duration (s)" />
                  <MiniChart data={trendData} dataKey="flaky" color="#eab308" label="Flaky Tests" />
                  <MiniChart data={trendData} dataKey="slow" color="#f97316" label="Slow Tests" />
                </div>
              </div>

              {/* Stability Distribution */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                <h4 className="text-lg font-semibold text-white mb-6">Stability Score Distribution</h4>
                <div className="flex gap-4 items-end h-32">
                  {[
                    { grade: 'A', count: 2, color: 'bg-green-500' },
                    { grade: 'B', count: 1, color: 'bg-blue-500' },
                    { grade: 'C', count: 1, color: 'bg-yellow-500' },
                    { grade: 'D', count: 1, color: 'bg-orange-500' },
                    { grade: 'F', count: 0, color: 'bg-red-500' },
                  ].map((item, i) => (
                    <div key={item.grade} className="flex-1 flex flex-col items-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(item.count * 40, 8)}px` }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className={`${item.color} rounded-t w-full max-w-[48px]`}
                      />
                      <div className="bg-slate-800 w-full max-w-[48px] py-2 text-center rounded-b border-t border-slate-700">
                        <div className="text-white font-bold text-sm">{item.grade}</div>
                      </div>
                      <div className="text-slate-500 text-xs mt-1">{item.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TEST RESULTS TAB */}
          {activeTab === 'tests' && (
            <div className="space-y-6">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {testFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setTestFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      testFilter === filter.id
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* File Group */}
              <div className="space-y-4">
                {filteredTests.map((test, i) => (
                  <motion.div
                    key={test.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedTest(selectedTest?.name === test.name ? null : test)}
                    className={`bg-slate-900/50 rounded-lg p-4 border transition-all cursor-pointer ${
                      selectedTest?.name === test.name
                        ? 'border-green-500 ring-1 ring-green-500'
                        : 'border-slate-700/50 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                        <GradeBadge grade={test.grade} />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-white font-medium text-sm sm:text-base">{test.name}</h4>
                            <StatusBadge status={test.status} />
                          </div>
                          <div className="text-slate-500 text-xs sm:text-sm flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                            <span className="flex items-center gap-1">{Icons.folder} {test.file}</span>
                            <span className="flex items-center gap-1">{Icons.clock} {test.duration}s</span>
                            {test.retries > 0 && <span className="flex items-center gap-1">{Icons.refresh} {test.retries} retries</span>}
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:flex gap-2 shrink-0">
                        <div className="p-2 bg-slate-700/50 text-slate-500 rounded">
                          {Icons.image}
                        </div>
                        <div className="p-2 bg-slate-700/50 text-slate-500 rounded">
                          {Icons.search}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Error/AI Details */}
                    {selectedTest?.name === test.name && test.error && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-4 space-y-3"
                      >
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                          <div className="text-red-400 text-sm font-mono">{test.error}</div>
                        </div>
                        {test.aiSuggestion && (
                          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
                              {Icons.ai} AI Analysis
                            </div>
                            <div className="text-slate-300 text-sm leading-relaxed">{test.aiSuggestion}</div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Gallery Filters */}
              <div className="flex flex-wrap gap-2">
                {galleryFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setGalleryFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      galleryFilter === filter.id
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Screenshots */}
                {(galleryFilter === 'all' || galleryFilter === 'screenshots') && (
                  <>
                    {/* Login Page */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700"
                    >
                      <div className="aspect-video bg-slate-800 relative overflow-hidden">
                        <div className="absolute inset-0 p-2">
                          <div className="bg-slate-700 h-3 w-full rounded-t flex items-center gap-1 px-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                          </div>
                          <div className="bg-white h-full p-2">
                            <div className="flex flex-col items-center justify-center h-full gap-1">
                              <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                              <div className="w-12 h-1.5 bg-slate-300 rounded mt-1"></div>
                              <div className="w-16 h-2 bg-slate-200 rounded mt-2"></div>
                              <div className="w-16 h-2 bg-slate-200 rounded mt-1"></div>
                              <div className="w-10 h-2 bg-blue-500 rounded mt-2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="text-white text-sm font-medium truncate">login-page.png</div>
                        <div className="text-slate-500 text-xs">auth.spec.ts</div>
                      </div>
                    </motion.div>

                    {/* Dashboard */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700"
                    >
                      <div className="aspect-video bg-slate-800 relative overflow-hidden">
                        <div className="absolute inset-0 p-2">
                          <div className="bg-slate-700 h-3 w-full rounded-t flex items-center gap-1 px-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                          </div>
                          <div className="bg-slate-100 h-full flex">
                            <div className="w-4 bg-slate-800 h-full"></div>
                            <div className="flex-1 p-1">
                              <div className="flex gap-1 mb-1">
                                <div className="flex-1 h-4 bg-white rounded shadow-sm p-0.5">
                                  <div className="w-2 h-1 bg-green-400 rounded"></div>
                                </div>
                                <div className="flex-1 h-4 bg-white rounded shadow-sm p-0.5">
                                  <div className="w-3 h-1 bg-blue-400 rounded"></div>
                                </div>
                              </div>
                              <div className="bg-white rounded shadow-sm h-8 p-1">
                                <div className="flex gap-0.5">
                                  <div className="w-1 h-3 bg-blue-400 rounded-t"></div>
                                  <div className="w-1 h-4 bg-blue-500 rounded-t"></div>
                                  <div className="w-1 h-2 bg-blue-400 rounded-t"></div>
                                  <div className="w-1 h-5 bg-blue-500 rounded-t"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="text-white text-sm font-medium truncate">dashboard.png</div>
                        <div className="text-slate-500 text-xs">dashboard.spec.ts</div>
                      </div>
                    </motion.div>

                    {/* Error State */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-slate-900/50 rounded-lg overflow-hidden border border-red-500/50"
                    >
                      <div className="aspect-video bg-slate-800 relative overflow-hidden">
                        <div className="absolute inset-0 p-2">
                          <div className="bg-slate-700 h-3 w-full rounded-t flex items-center gap-1 px-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                          </div>
                          <div className="bg-white h-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-6 h-6 mx-auto border-2 border-red-400 rounded-full flex items-center justify-center text-red-400 text-xs font-bold">!</div>
                              <div className="w-10 h-1 bg-slate-300 rounded mt-1 mx-auto"></div>
                              <div className="w-8 h-1 bg-slate-200 rounded mt-0.5 mx-auto"></div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">FAILED</div>
                      </div>
                      <div className="p-3">
                        <div className="text-white text-sm font-medium truncate">checkout-error.png</div>
                        <div className="text-slate-500 text-xs">checkout.spec.ts</div>
                      </div>
                    </motion.div>

                    {/* Cart Page */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700"
                    >
                      <div className="aspect-video bg-slate-800 relative overflow-hidden">
                        <div className="absolute inset-0 p-2">
                          <div className="bg-slate-700 h-3 w-full rounded-t flex items-center gap-1 px-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                          </div>
                          <div className="bg-white h-full p-1">
                            <div className="flex gap-1 mb-1">
                              <div className="w-4 h-4 bg-slate-200 rounded"></div>
                              <div className="flex-1">
                                <div className="w-8 h-1 bg-slate-300 rounded"></div>
                                <div className="w-6 h-1 bg-slate-200 rounded mt-0.5"></div>
                              </div>
                              <div className="w-4 h-2 bg-slate-800 rounded text-white text-center" style={{fontSize: '4px'}}>$99</div>
                            </div>
                            <div className="flex gap-1">
                              <div className="w-4 h-4 bg-slate-200 rounded"></div>
                              <div className="flex-1">
                                <div className="w-10 h-1 bg-slate-300 rounded"></div>
                                <div className="w-5 h-1 bg-slate-200 rounded mt-0.5"></div>
                              </div>
                              <div className="w-4 h-2 bg-slate-800 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="text-white text-sm font-medium truncate">cart-items.png</div>
                        <div className="text-slate-500 text-xs">cart.spec.ts</div>
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Videos */}
                {(galleryFilter === 'all' || galleryFilter === 'videos') && (
                  <>
                    {[
                      { name: 'login-flow.webm', test: 'auth.spec.ts', duration: '0:23' },
                      { name: 'checkout-test.webm', test: 'checkout.spec.ts', duration: '0:45' },
                    ].map((video, i) => (
                      <motion.div
                        key={video.name}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700"
                      >
                        <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-slate-800 flex items-center justify-center relative">
                          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                            <div className="text-white">{Icons.play}</div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-mono">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="text-white text-sm font-medium truncate">{video.name}</div>
                          <div className="text-slate-500 text-xs">{video.test}</div>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}

                {/* Traces */}
                {(galleryFilter === 'all' || galleryFilter === 'traces') && (
                  <>
                    {[
                      { name: 'trace-auth.zip', test: 'auth.spec.ts', size: '1.8 MB' },
                      { name: 'trace-checkout.zip', test: 'checkout.spec.ts', size: '3.2 MB' },
                    ].map((trace, i) => (
                      <motion.div
                        key={trace.name}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700"
                      >
                        <div className="aspect-video bg-gradient-to-br from-green-900/20 to-slate-800 flex items-center justify-center relative">
                          <div className="text-center">
                            <svg className="w-8 h-8 text-green-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div className="text-green-400 text-xs mt-1 font-medium">Playwright Trace</div>
                          </div>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div>
                            <div className="text-white text-sm font-medium truncate">{trace.name}</div>
                            <div className="text-slate-500 text-xs">{trace.size}</div>
                          </div>
                          <div className="flex items-center gap-1 px-3 py-1.5 bg-green-600/50 text-white/70 text-xs rounded">
                            {Icons.download}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>

            </div>
          )}

          {/* PRO FEATURES TAB */}
          {activeTab === 'pro' && (
            <div className="space-y-8">
              {/* Pro Banner */}
              <div className="bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-green-600/20 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-green-500/30">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg sm:rounded-xl text-green-400 shrink-0">
                    {Icons.sparkles}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white">Pro Features Preview</h3>
                    <p className="text-slate-400 text-xs sm:text-base">Premium themes, PDF exports, quality gates, and more</p>
                  </div>
                </div>
              </div>

              {/* PDF Style Picker */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-green-400">{Icons.download}</span> Executive PDF Export
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: 'Corporate', colors: ['#1e293b', '#22c55e', '#f8fafc'], desc: 'Clean, professional layout' },
                    { name: 'Dark', colors: ['#0f172a', '#a855f7', '#e2e8f0'], desc: 'Sleek dark-mode styling' },
                    { name: 'Minimal', colors: ['#ffffff', '#3b82f6', '#1e293b'], desc: 'Light and minimal design' },
                  ].map((style, i) => (
                    <motion.div
                      key={style.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden hover:border-green-500/50 transition-colors cursor-default"
                    >
                      {/* Mock PDF preview */}
                      <div className="p-4 space-y-2" style={{ backgroundColor: style.colors[0] }}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded" style={{ backgroundColor: style.colors[1] }} />
                          <div className="h-2 w-20 rounded" style={{ backgroundColor: style.colors[2], opacity: 0.5 }} />
                        </div>
                        <div className="h-1.5 w-full rounded" style={{ backgroundColor: style.colors[2], opacity: 0.15 }} />
                        <div className="h-1.5 w-3/4 rounded" style={{ backgroundColor: style.colors[2], opacity: 0.15 }} />
                        <div className="flex gap-2 mt-3">
                          <div className="h-8 flex-1 rounded" style={{ backgroundColor: style.colors[1], opacity: 0.2 }} />
                          <div className="h-8 flex-1 rounded" style={{ backgroundColor: style.colors[1], opacity: 0.15 }} />
                        </div>
                      </div>
                      <div className="p-3 border-t border-slate-700">
                        <div className="text-white text-sm font-medium">{style.name}</div>
                        <div className="text-slate-500 text-xs">{style.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pro Themes */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-purple-400">{Icons.image}</span> 6 Pro HTML Themes
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { name: 'ocean', primary: '#0ea5e9', accent: '#06b6d4', bg: '#0c4a6e' },
                    { name: 'sunset', primary: '#f97316', accent: '#f59e0b', bg: '#7c2d12' },
                    { name: 'dracula', primary: '#bd93f9', accent: '#ff79c6', bg: '#282a36' },
                    { name: 'cyberpunk', primary: '#f0f000', accent: '#00f0f0', bg: '#1a0a2e' },
                    { name: 'forest', primary: '#22c55e', accent: '#84cc16', bg: '#14532d' },
                    { name: 'rose', primary: '#f43f5e', accent: '#ec4899', bg: '#4c0519' },
                  ].map((theme, i) => (
                    <motion.div
                      key={theme.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-slate-900/50 rounded-lg border border-slate-700 p-3 hover:border-slate-600 transition-colors cursor-default"
                    >
                      <div className="flex gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded" style={{ backgroundColor: theme.bg }} />
                        <div className="w-5 h-5 rounded" style={{ backgroundColor: theme.primary }} />
                        <div className="w-5 h-5 rounded" style={{ backgroundColor: theme.accent }} />
                      </div>
                      <div className="text-white text-sm font-medium">{theme.name}</div>
                      <div className="text-slate-500 text-xs">Pro theme</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quality Gates + Quarantine */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quality Gates */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-green-400">{Icons.target}</span> Quality Gates
                  </h4>
                  <div className="bg-slate-900/50 rounded-lg border border-slate-700 p-5 space-y-4">
                    <div className="text-slate-400 text-sm mb-3">Fail builds when thresholds aren't met</div>
                    {[
                      { label: 'Pass rate', threshold: '\u2265 95%', actual: '92%', passed: false },
                      { label: 'Flaky rate', threshold: '\u2264 5%', actual: '2%', passed: true },
                      { label: 'Max duration', threshold: '\u2264 120s', actual: '39s', passed: true },
                      { label: 'No new failures', threshold: '0 new', actual: '1 new', passed: false },
                    ].map((gate) => (
                      <div key={gate.label} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            gate.passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {gate.passed ? (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </div>
                          <span className="text-slate-300 text-sm">{gate.label}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs shrink-0">
                          <span className="text-slate-500">{gate.threshold}</span>
                          <span className={gate.passed ? 'text-green-400 font-medium' : 'text-red-400 font-medium'}>
                            {gate.actual}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-slate-700 pt-3 mt-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded border border-red-500/30">
                          GATE FAILED
                        </span>
                        <span className="text-slate-500 text-xs">Build will not pass</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flaky Test Quarantine */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-yellow-400">{Icons.alert}</span> Flaky Test Quarantine
                  </h4>
                  <div className="bg-slate-900/50 rounded-lg border border-slate-700 p-5 space-y-4">
                    <div className="text-slate-400 text-sm mb-3">Auto-quarantine tests that exceed flakiness thresholds</div>
                    {[
                      { name: 'User profile updates correctly', file: 'profile.spec.ts', flakyRate: '70%', runs: 30 },
                      { name: 'Dashboard chart renders', file: 'dashboard.spec.ts', flakyRate: '45%', runs: 20 },
                    ].map((test) => (
                      <div key={test.name} className="bg-yellow-500/5 rounded-lg p-3 border border-yellow-500/20">
                        <div className="flex items-start gap-3">
                          <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded shrink-0 mt-0.5">
                            Q
                          </span>
                          <div className="min-w-0">
                            <div className="text-white text-sm font-medium truncate">{test.name}</div>
                            <div className="text-slate-500 text-xs mt-1 flex flex-wrap gap-x-3 gap-y-1">
                              <span>{test.file}</span>
                              <span className="text-yellow-400">{test.flakyRate} flaky</span>
                              <span>over {test.runs} runs</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-slate-700 pt-3 mt-3">
                      <div className="text-slate-500 text-xs">
                        Quarantined tests are excluded from quality gate calculations and flagged in reports.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* JSON + JUnit Export */}
              <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-4">Additional Export Formats</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { format: 'PDF', icon: Icons.download, desc: '3 themed executive reports' },
                    { format: 'JSON', icon: Icons.search, desc: 'Machine-readable test data' },
                    { format: 'JUnit XML', icon: Icons.check, desc: 'CI/CD integration format' },
                  ].map((exp, i) => (
                    <motion.div
                      key={exp.format}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-center"
                    >
                      <div className="inline-flex p-2 bg-green-500/10 rounded-lg text-green-400 mb-2">
                        {exp.icon}
                      </div>
                      <div className="text-white font-medium text-sm">{exp.format}</div>
                      <div className="text-slate-500 text-xs mt-1">{exp.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-4">
                <Link
                  to="/docs/pro-themes"
                  className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                >
                  View full documentation →
                </Link>
              </div>
            </div>
          )}

          {/* AI ANALYSIS TAB */}
          {activeTab === 'ai' && (
            <div className="space-y-8">
              {/* AI Hero Banner */}
              <div className="bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-green-600/20 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-green-500/30">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg sm:rounded-xl text-green-400 shrink-0">
                    {Icons.ai}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white">AI-Powered Test Intelligence</h3>
                    <p className="text-slate-400 text-xs sm:text-base">Automatic failure analysis, pattern detection, and actionable recommendations</p>
                  </div>
                </div>
              </div>

              {/* Failure Clusters */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-green-400">{Icons.target}</span> Intelligent Failure Clustering
                </h4>
                <div className="bg-slate-900/50 rounded-lg p-4 sm:p-6 border border-slate-700">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-red-500/10 rounded-lg text-red-400 shrink-0">
                      {Icons.alert}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h5 className="text-white font-semibold">TimeoutError Cluster</h5>
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">2 tests affected</span>
                      </div>
                      <div className="text-slate-400 text-sm mb-4">
                        AI detected a pattern: Multiple tests failing with timeout errors on payment-related selectors.
                      </div>
                      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-400 font-semibold mb-3">
                          {Icons.ai} Root Cause Analysis
                        </div>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                          These failures share a common pattern: all are waiting for elements with
                          <code className="bg-slate-800 px-1 sm:px-1.5 py-0.5 rounded mx-0.5 sm:mx-1 text-xs break-all">.payment-*</code> selectors.
                          Cross-referencing with your git history, this correlates with commit <code className="bg-slate-800 px-1 sm:px-1.5 py-0.5 rounded mx-0.5 sm:mx-1 text-xs">a3f2b1c</code> from 2 days ago which refactored the payment module.
                        </p>
                        <div className="border-t border-slate-700 pt-3 mt-3">
                          <div className="text-white text-xs sm:text-sm font-medium mb-2">Suggested Fixes:</div>
                          <ul className="text-slate-300 text-xs sm:text-sm space-y-2">
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-0.5 shrink-0">1.</span>
                              <span>Update selector to <code className="bg-slate-800 px-1 py-0.5 rounded text-xs break-all">.payment-submit-btn</code> (new class name)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-0.5 shrink-0">2.</span>
                              <span>Add explicit wait for payment iframe: <code className="bg-slate-800 px-1 py-0.5 rounded text-xs break-all">page.waitForSelector('iframe[name="payment"]')</code></span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-0.5 shrink-0">3.</span>
                              <span>Consider using data-testid attributes for more stable selectors</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-purple-400">{Icons.sparkles}</span> Proactive Recommendations
                </h4>
                <div className="space-y-4">
                  {[
                    { priority: 'High', color: 'red', title: 'Fix flaky test: User profile updates', desc: 'This test has a 70% flakiness rate over the last 30 runs. The element detachment pattern suggests a race condition between state updates and DOM rendering.', action: 'View suggested fix' },
                    { priority: 'Medium', color: 'yellow', title: 'Performance regression detected', desc: 'Average test duration increased by 23% this week. AI traced this to the new image loading in the dashboard component.', action: 'See analysis' },
                    { priority: 'Low', color: 'green', title: 'Optimization opportunity', desc: 'Tests in cart.spec.ts are independent and could run in parallel, reducing total suite time by ~40%.', action: 'Apply suggestion' },
                  ].map((rec, i) => (
                    <motion.div
                      key={rec.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="bg-slate-900/50 rounded-lg p-5 border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                            rec.color === 'red' ? 'bg-red-500' :
                            rec.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h5 className="text-white font-medium text-sm sm:text-base">{rec.title}</h5>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                rec.color === 'red' ? 'bg-red-500/20 text-red-400' :
                                rec.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                              }`}>{rec.priority}</span>
                            </div>
                            <p className="text-slate-400 text-xs sm:text-sm">{rec.desc}</p>
                          </div>
                        </div>
                        <div className="shrink-0 px-3 sm:px-4 py-2 bg-green-600/50 text-white/70 text-xs sm:text-sm rounded-lg self-start ml-6 sm:ml-0">
                          {rec.action}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-6">How StageWright AI Works</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { step: '1', title: 'Capture Context', desc: 'Collects test output, stack traces, screenshots, and DOM snapshots at the point of failure.' },
                    { step: '2', title: 'Analyze Patterns', desc: 'AI correlates failures across runs, identifies common root causes, and cross-references with your codebase.' },
                    { step: '3', title: 'Generate Insights', desc: 'Produces actionable recommendations with specific code suggestions and links to relevant changes.' },
                  ].map((item) => (
                    <div key={item.step} className="text-center">
                      <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center mx-auto mb-3">
                        {item.step}
                      </div>
                      <h5 className="text-white font-medium mb-2">{item.title}</h5>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
