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
          ['title', 'string', 'Test Report', 'Report title displayed in the header'],
          ['outputDir', 'string', '.', 'Directory to write the report file into'],
          ['showAnnotations', 'boolean', 'true', 'Display test annotations in the report'],
          ['showSteps', 'boolean', 'true', 'Show individual test steps in the timeline'],
          ['showAttachments', 'boolean', 'true', 'Include screenshots and video attachments'],
          ['showNetwork', 'boolean', 'false', 'Capture and display network request logs'],
          ['historyPath', 'string', 'undefined', 'Path to history JSON for trend analytics'],
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
      title: 'E2E Regression Suite',
      showAnnotations: true,
      showSteps: true,
      showAttachments: true,
      showNetwork: true,
      historyPath: 'reports/history.json',
    }],
  ],
});`,
      },
    },
    {
      heading: 'Pro Options',
      body: [
        'Pro options unlock advanced features like theming, quality gates, and export formats. They require a valid Pro license key set via the STAGEWRIGHT_LICENSE environment variable.',
      ],
      table: {
        headers: ['Option', 'Type', 'Default', 'Description'],
        rows: [
          ['theme', 'string', 'default', 'Visual theme — midnight, ocean, forest, sunset, corporate, neon'],
          ['brandingLogo', 'string', 'undefined', 'Path or URL to a logo image for the report header'],
          ['brandingName', 'string', 'undefined', 'Company name displayed in the report header'],
          ['qualityGates', 'object', 'undefined', 'Quality gate thresholds — see Quality Gates docs'],
          ['exportFormats', 'string[]', '[]', 'Additional export formats — pdf, csv, json'],
          ['quarantine', 'object', 'undefined', 'Flaky test quarantine configuration'],
          ['notifications', 'object', 'undefined', 'Slack/Teams notification settings'],
          ['aiProvider', 'object', 'undefined', 'Custom AI provider configuration'],
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
          ['STAGEWRIGHT_LICENSE', 'Pro license key to enable premium features'],
          ['STAGEWRIGHT_TITLE', 'Overrides the title option in config'],
          ['STAGEWRIGHT_OUTPUT', 'Overrides the outputFile option in config'],
          ['STAGEWRIGHT_CLOUD_API_KEY', 'API key for uploading reports to StageWright Cloud'],
          ['STAGEWRIGHT_CLOUD_URL', 'Custom cloud endpoint URL (default: cloud.stagewright.dev)'],
          ['STAGEWRIGHT_AI_API_KEY', 'API key for the AI analysis provider'],
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
          'Sets showNetwork to false to reduce report size',
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
