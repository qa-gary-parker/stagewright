import type { DocPage } from '../types';

export const configuration: DocPage = {
  slug: 'configuration',
  title: 'Configuration Reference',
  description: 'Complete reference for every playwright-smart-reporter option, including Pro features and environment variables.',
  sections: [
    {
      heading: 'Basic Options',
      body: [
        'These options control the core behaviour of the reporter. Pass them as the second element of the reporter tuple in your playwright.config.ts.',
      ],
      table: {
        headers: ['Option', 'Type', 'Default', 'Description'],
        rows: [
          ['outputFile', 'string', 'smart-report.html', 'Output file path for the HTML report'],
          ['historyFile', 'string', 'undefined', 'Path to history JSON for trend analytics'],
          ['maxHistoryRuns', 'number', 'undefined', 'Maximum number of runs to retain in history'],
          ['performanceThreshold', 'number', 'undefined', 'Duration regression threshold (fraction, e.g. 0.2 = 20%)'],
          ['enableNetworkLogs', 'boolean', 'true', 'Capture and display network request logs (when traces exist)'],
          ['enableTraceViewer', 'boolean', 'true', 'Enable "View trace" links in the report'],
          ['enableRetryAnalysis', 'boolean', 'true', 'Include retry analysis for flaky tests'],
          ['enableFailureClustering', 'boolean', 'true', 'Group failures by root cause'],
          ['enableStabilityScore', 'boolean', 'true', 'Calculate stability scores and grades'],
          ['enableComparison', 'boolean', 'true', 'Enable run comparison when history exists'],
          ['enableTrendsView', 'boolean', 'true', 'Show trend charts in the report'],
          ['enableGalleryView', 'boolean', 'true', 'Show screenshot/video/trace gallery'],
          ['filterPwApiSteps', 'boolean', 'false', 'Hide verbose pw:api internal steps'],
          ['slackWebhook', 'string', 'undefined', 'Slack incoming webhook URL for basic notifications'],
          ['teamsWebhook', 'string', 'undefined', 'Microsoft Teams webhook URL for basic notifications'],
          ['cspSafe', 'boolean', 'false', 'Use system fonts and avoid base64 data URIs for CSP compliance'],
        ],
      },
    },
    {
      heading: 'Minimal Configuration Example',
      body: [
        'For most projects the defaults work well. A minimal config only needs the reporter name.',
      ],
      code: {
        language: 'typescript',
        content: `import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['playwright-smart-reporter'],
  ],
});`,
      },
    },
    {
      heading: 'Full Configuration Example',
      body: [
        'A comprehensive configuration that enables all core features with custom output settings.',
      ],
      code: {
        language: 'typescript',
        content: `import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['playwright-smart-reporter', {
      outputFile: 'reports/smart-report.html',
      historyFile: 'reports/history.json',
      maxHistoryRuns: 50,
      enableNetworkLogs: true,
      enableTraceViewer: true,
      filterPwApiSteps: true,
      enableRetryAnalysis: true,
      enableComparison: true,
    }],
  ],
});`,
      },
    },
    {
      heading: 'Pro Options',
      body: [
        'These options unlock advanced features like AI analysis, theming, quality gates, and export formats. They require a valid Starter or Pro license key set via the SMART_REPORTER_LICENSE_KEY environment variable.',
      ],
      table: {
        headers: ['Option', 'Type', 'Default', 'Description'],
        rows: [
          ['theme', 'ThemeConfig', 'undefined', 'Visual theme object with preset and optional custom colours'],
          ['branding', 'BrandingConfig', 'undefined', 'Report branding — logo, title, footer, hidePoweredBy'],
          ['qualityGates', 'QualityGateConfig', 'undefined', 'Quality gate thresholds — see Quality Gates docs'],
          ['exportPdf', 'boolean', 'false', 'Generate a PDF executive summary alongside the HTML report'],
          ['exportJson', 'boolean', 'false', 'Write smart-report-data.json alongside the HTML report'],
          ['exportJunit', 'boolean', 'false', 'Generate JUnit XML output'],
          ['quarantine', 'QuarantineConfig', 'undefined', 'Flaky test quarantine configuration'],
          ['notifications', 'NotificationConfig[]', 'undefined', 'Array of notification channel configurations'],
        ],
      },
      note: {
        type: 'pro',
        content: 'Pro options are silently ignored when no valid license key is present — your config stays portable across free and Pro environments.',
      },
    },
    {
      heading: 'Environment Variables',
      body: [
        'Several reporter behaviours can be controlled via environment variables. These take precedence over config file values where both exist.',
      ],
      table: {
        headers: ['Variable', 'Description'],
        rows: [
          ['SMART_REPORTER_LICENSE_KEY', 'Starter or Pro license key to enable paid features'],
          ['STAGEWRIGHT_TITLE', 'Overrides the title option in config'],
          ['STAGEWRIGHT_OUTPUT', 'Overrides the outputFile option in config'],
          ['STAGEWRIGHT_CLOUD_API_KEY', 'API key for uploading reports to StageWright Cloud'],
          ['STAGEWRIGHT_CLOUD_URL', 'Custom cloud endpoint URL (default: cloud.stagewright.dev)'],
          ['CI', 'When set, the reporter enables CI-optimized defaults'],
        ],
      },
    },
    {
      heading: 'CI-Specific Overrides',
      body: [
        'When the CI environment variable is detected, the reporter automatically adjusts several defaults for pipeline environments.',
      ],
      list: {
        items: [
          'Disables interactive features like keyboard navigation hints',
          'Adds build metadata (commit SHA, branch, build URL) when available',
          'Enables artifact-friendly output paths',
          'Sets enableNetworkLogs to false to reduce report size',
        ],
        icon: 'check',
      },
      note: {
        type: 'info',
        content: 'Most CI providers (GitHub Actions, GitLab CI, Jenkins, CircleCI) set the CI variable automatically.',
      },
    },
  ],
};
