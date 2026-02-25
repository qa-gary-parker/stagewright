import type { DocSection, DocPage } from '../types';

// Getting Started
import { gettingStarted } from './getting-started';
import { configuration } from './configuration';

// Core Features
import { aiAnalysis } from './ai-analysis';
import { stabilityGrades } from './stability-grades';
import { runComparison } from './run-comparison';
import { retryAnalysis } from './retry-analysis';
import { trendAnalytics } from './trend-analytics';
import { artifacts } from './artifacts';
import { traceViewer } from './trace-viewer';
import { networkLogs } from './network-logs';
import { testHistory } from './test-history';
import { stepTimeline } from './step-timeline';

// Integrations & Tools
import { ciIntegration } from './ci-integration';
import { annotations } from './annotations';
import { multiProject } from './multi-project';
import { cucumber } from './cucumber';
import { cliTools } from './cli-tools';
import { keyboardShortcuts } from './keyboard-shortcuts';

// Pro Features
import { proThemes } from './pro-themes';
import { proBranding } from './pro-branding';
import { proExports } from './pro-exports';
import { proQualityGates } from './pro-quality-gates';
import { proQuarantine } from './pro-quarantine';
import { proNotifications } from './pro-notifications';
import { proAiConfig } from './pro-ai-config';

export {
  gettingStarted,
  configuration,
  aiAnalysis,
  stabilityGrades,
  runComparison,
  retryAnalysis,
  trendAnalytics,
  artifacts,
  traceViewer,
  networkLogs,
  testHistory,
  stepTimeline,
  ciIntegration,
  annotations,
  multiProject,
  cucumber,
  cliTools,
  keyboardShortcuts,
  proThemes,
  proBranding,
  proExports,
  proQualityGates,
  proQuarantine,
  proNotifications,
  proAiConfig,
};

export const docsNavigation: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      { slug: 'getting-started', title: 'Getting Started' },
      { slug: 'configuration', title: 'Configuration Reference' },
    ],
  },
  {
    id: 'core-features',
    title: 'Core Features',
    items: [
      { slug: 'stability-grades', title: 'Stability Grades' },
      { slug: 'run-comparison', title: 'Run Comparison' },
      { slug: 'retry-analysis', title: 'Retry Analysis' },
      { slug: 'trend-analytics', title: 'Trend Analytics' },
      { slug: 'artifacts', title: 'Artifact Gallery' },
      { slug: 'trace-viewer', title: 'Trace Viewer' },
      { slug: 'network-logs', title: 'Network Logs' },
      { slug: 'test-history', title: 'Test History' },
      { slug: 'step-timeline', title: 'Step Timeline' },
    ],
  },
  {
    id: 'integrations',
    title: 'Integrations & Tools',
    items: [
      { slug: 'ci-integration', title: 'CI Integration' },
      { slug: 'annotations', title: 'Annotations' },
      { slug: 'multi-project', title: 'Multi-Project Support' },
      { slug: 'cucumber', title: 'Cucumber Integration' },
      { slug: 'cli-tools', title: 'CLI Tools' },
      { slug: 'keyboard-shortcuts', title: 'Keyboard Shortcuts' },
    ],
  },
  {
    id: 'pro-features',
    title: 'Pro Features',
    items: [
      { slug: 'ai-analysis', title: 'AI Failure Analysis', isPro: true },
      { slug: 'pro-themes', title: 'Pro Themes', isPro: true },
      { slug: 'pro-branding', title: 'Report Branding', isPro: true },
      { slug: 'pro-exports', title: 'Export Formats', isPro: true },
      { slug: 'pro-quality-gates', title: 'Quality Gates', isPro: true },
      { slug: 'pro-quarantine', title: 'Flaky Quarantine', isPro: true },
      { slug: 'pro-notifications', title: 'Advanced Notifications', isPro: true },
      { slug: 'pro-ai-config', title: 'AI Configuration', isPro: true },
    ],
  },
];

export const allPages: Record<string, DocPage> = {
  'getting-started': gettingStarted,
  configuration,
  'ai-analysis': aiAnalysis,
  'stability-grades': stabilityGrades,
  'run-comparison': runComparison,
  'retry-analysis': retryAnalysis,
  'trend-analytics': trendAnalytics,
  artifacts,
  'trace-viewer': traceViewer,
  'network-logs': networkLogs,
  'test-history': testHistory,
  'step-timeline': stepTimeline,
  'ci-integration': ciIntegration,
  annotations,
  'multi-project': multiProject,
  cucumber,
  'cli-tools': cliTools,
  'keyboard-shortcuts': keyboardShortcuts,
  'pro-themes': proThemes,
  'pro-branding': proBranding,
  'pro-exports': proExports,
  'pro-quality-gates': proQualityGates,
  'pro-quarantine': proQuarantine,
  'pro-notifications': proNotifications,
  'pro-ai-config': proAiConfig,
};
