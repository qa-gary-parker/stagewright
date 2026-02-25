import type { DocPage } from '../types';

export const cliTools: DocPage = {
  slug: 'cli-tools',
  title: 'CLI Tools',
  description: 'Evaluate quality gates, generate health digests, merge history files, and serve reports from the command line.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'The reporter ships with several CLI binaries for common operations. The main binary provides subcommands for quality gate evaluation and health digest generation. Separate binaries handle history merging and local report serving.',
      ],
      code: {
        language: 'bash',
        content: 'npx playwright-smart-reporter --help',
      },
    },
    {
      heading: 'Available Binaries',
      table: {
        headers: ['Binary', 'Description'],
        rows: [
          ['playwright-smart-reporter gate', 'Evaluate quality gates against a JSON export'],
          ['playwright-smart-reporter digest', 'Generate a test health digest from history'],
          ['playwright-smart-reporter-merge-history', 'Merge multiple test-history.json files from parallel CI runs'],
          ['playwright-smart-reporter-serve', 'Serve the report locally so the trace viewer can load trace files'],
        ],
      },
    },
    {
      heading: 'Quality Gate Evaluation',
      body: [
        'The gate command evaluates quality gates against a smart-report-data.json file (generated with exportJson: true). Use it in CI to enforce thresholds independently of the reporter run.',
      ],
      code: {
        language: 'bash',
        content: `# Evaluate gates from a config file
npx playwright-smart-reporter gate --config gates.json

# Inline flags override or supplement a config file
npx playwright-smart-reporter gate --max-failures 5 --min-pass-rate 90

# Point to a specific data file
npx playwright-smart-reporter gate --config gates.json --input ./report/smart-report-data.json`,
      },
      note: {
        type: 'info',
        content: 'The gate command exits with code 1 when any gate fails, which causes CI builds to fail.',
      },
    },
    {
      heading: 'Health Digest',
      body: [
        'The digest command generates a test health summary from your history file. It analyses trends over a configurable period and outputs a markdown or text report.',
      ],
      code: {
        language: 'bash',
        content: `# Weekly digest (default)
npx playwright-smart-reporter digest --history test-history.json

# Daily digest written to a file
npx playwright-smart-reporter digest --period daily --history test-history.json --output digest.md

# Monthly digest in plain text
npx playwright-smart-reporter digest --period monthly --history test-history.json --format text`,
      },
    },
    {
      heading: 'Merging History Files',
      body: [
        'When using Playwright sharding, each shard produces a separate history file. The merge-history binary combines them into a single file.',
      ],
      code: {
        language: 'bash',
        content: `# Merge two history files
npx playwright-smart-reporter-merge-history history1.json history2.json -o merged.json

# Merge with glob pattern and limit to 10 runs
npx playwright-smart-reporter-merge-history 'blob-reports/**/test-history.json' -o test-history.json --max-runs 10`,
      },
      note: {
        type: 'info',
        content: 'The merge command deduplicates runs by runId and sorts entries by timestamp.',
      },
    },
    {
      heading: 'Serving Reports Locally',
      body: [
        'The serve command starts a local HTTP server so the embedded trace viewer can load trace files. This is needed because trace files cannot be loaded from file:// URLs.',
      ],
      code: {
        language: 'bash',
        content: `# Auto-detect and serve smart-report.html
npx playwright-smart-reporter-serve

# Serve a specific report on a fixed port
npx playwright-smart-reporter-serve ./example/smart-report.html --port 3000

# Serve without opening the browser
npx playwright-smart-reporter-serve --no-open`,
      },
    },
    {
      heading: 'CI Automation Example',
      body: [
        'Combine CLI commands in CI scripts for quality enforcement and reporting.',
      ],
      code: {
        language: 'bash',
        content: `#!/bin/bash
set -euo pipefail

# Run tests with JSON export enabled
npx playwright test

# Merge sharded history (if using sharding)
npx playwright-smart-reporter-merge-history blob-reports/*/test-history.json -o test-history.json

# Evaluate quality gates
npx playwright-smart-reporter gate --config gates.json

# Generate a weekly digest
npx playwright-smart-reporter digest --history test-history.json --output digest.md`,
      },
    },
  ],
};
