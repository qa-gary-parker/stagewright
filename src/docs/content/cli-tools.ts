import type { DocPage } from '../types';

export const cliTools: DocPage = {
  slug: 'cli-tools',
  title: 'CLI Tools',
  description: 'Generate, merge, and manage reports from the command line with the built-in CLI.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'The reporter includes a CLI tool for common operations like generating reports from raw data, merging multiple report files, and managing history. The CLI is available via npx after installing the package.',
      ],
      code: {
        language: 'bash',
        content: 'npx smart-reporter --help',
      },
    },
    {
      heading: 'Available Commands',
      table: {
        headers: ['Command', 'Description'],
        rows: [
          ['generate', 'Generate an HTML report from a JSON results file'],
          ['merge', 'Merge multiple JSON result files into a single report'],
          ['history', 'Manage the test history file (list, prune, export)'],
          ['compare', 'Compare two result files and output a diff report'],
          ['validate', 'Validate a reporter config file for errors'],
          ['version', 'Print the installed version'],
        ],
      },
    },
    {
      heading: 'Report Generation',
      body: [
        'Generate an HTML report from a JSON results file. This is useful when you want to create a report separately from the test run — for example, after merging sharded results.',
      ],
      code: {
        language: 'bash',
        content: `# Generate report from JSON results
npx smart-reporter generate --input results.json --output report.html

# With custom title and history
npx smart-reporter generate \\
  --input results.json \\
  --output report.html \\
  --title "Nightly Regression" \\
  --history reports/history.json`,
      },
    },
    {
      heading: 'Merging Reports',
      body: [
        'When using Playwright sharding, each shard produces a separate results file. The merge command combines them into a single file before generating the report.',
      ],
      code: {
        language: 'bash',
        content: `# Merge sharded results
npx smart-reporter merge \\
  --input "shard-results/*.json" \\
  --output merged-results.json

# Then generate the combined report
npx smart-reporter generate \\
  --input merged-results.json \\
  --output report.html`,
      },
      note: {
        type: 'info',
        content: 'The merge command handles duplicate tests across shards by keeping the most recent result for each test ID.',
      },
    },
    {
      heading: 'History Management',
      body: [
        'Manage the test history file used for trend analytics and run comparison.',
      ],
      code: {
        language: 'bash',
        content: `# List runs in the history file
npx smart-reporter history list --file reports/history.json

# Prune old entries (keep last N runs)
npx smart-reporter history prune --file reports/history.json --keep 50

# Export history as CSV
npx smart-reporter history export --file reports/history.json --format csv`,
      },
    },
    {
      heading: 'Automation Scripts',
      body: [
        'Combine CLI commands in shell scripts for common automation patterns.',
      ],
      code: {
        language: 'bash',
        content: `#!/bin/bash
# post-test.sh — run after Playwright tests complete

set -euo pipefail

REPORTS_DIR="reports"
HISTORY_FILE="$REPORTS_DIR/history.json"

# Prune history to last 100 runs
npx smart-reporter history prune --file "$HISTORY_FILE" --keep 100

# Validate the output
echo "Report generated: $REPORTS_DIR/smart-report.html"
echo "History entries: $(npx smart-reporter history list --file "$HISTORY_FILE" --count)"`,
      },
    },
  ],
};
