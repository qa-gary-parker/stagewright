import type { DocPage } from '../types';

export const proExports: DocPage = {
  slug: 'pro-exports',
  title: 'Export Formats',
  description: 'Export reports as PDF, JSON, or JUnit XML for sharing, analysis, and CI integration.',
  isPro: true,
  sections: [
    {
      heading: 'Overview',
      body: [
        'Pro users can export test reports in multiple formats beyond the default HTML. PDF exports are ideal for stakeholder distribution, JSON exports integrate with custom dashboards and automation, and JUnit XML provides CI/CD compatibility.',
      ],
    },
    {
      heading: 'Configuration',
      body: [
        'Enable export formats in your reporter options. Multiple formats can be generated simultaneously.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  exportPdf: true,
  exportJson: true,
  exportJunit: true,
}]`,
      },
      note: {
        type: 'pro',
        content: 'Export formats require a Starter or Pro license. The HTML report is always generated regardless of license status.',
      },
    },
    {
      heading: 'PDF Export',
      body: [
        'PDF exports create a print-ready document. Two modes are available: an executive summary PDF (default) and a full HTML-to-PDF conversion.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  exportPdf: true,        // Executive summary PDF
  exportPdfFull: true,    // Full HTML-to-PDF conversion
}]`,
      },
    },
    {
      heading: 'JUnit XML Export',
      body: [
        'JUnit XML exports provide CI/CD-compatible output that integrates with Jenkins, GitLab, Azure DevOps, and other build systems.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  exportJunit: true,
}]`,
      },
    },
    {
      heading: 'JSON Export',
      body: [
        'JSON exports provide structured data for programmatic consumption. The schema matches the internal report data model.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  exportJson: true,
}]`,
      },
      table: {
        headers: ['Field', 'Type', 'Description'],
        rows: [
          ['metadata', 'object', 'Report title, timestamp, duration, and optional branding'],
          ['summary', 'object', 'Total, passed, failed, flaky, skipped counts and pass rate'],
          ['tests', 'TestResult[]', 'Full array of individual test results'],
          ['comparison', 'ComparisonResult?', 'Optional baseline comparison data'],
          ['trends', 'TrendData[]?', 'Optional historical trend data'],
        ],
      },
    },
  ],
};
