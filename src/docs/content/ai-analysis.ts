import type { DocPage } from '../types';

export const aiAnalysis: DocPage = {
  slug: 'ai-analysis',
  title: 'AI Failure Analysis',
  description: 'Automatically detect root causes, cluster related failures, and receive actionable fix suggestions powered by AI.',
  sections: [
    {
      heading: 'How AI Analysis Works',
      body: [
        'When your test run completes, the reporter collects all failure data — error messages, stack traces, test steps, and screenshots — and sends a structured summary to the configured AI provider. The model analyses the failures and returns root cause explanations, pattern clusters, and suggested fixes.',
        'Analysis runs asynchronously after the test suite finishes, so it adds minimal overhead to your pipeline. Results are embedded directly into the HTML report.',
      ],
    },
    {
      heading: 'Enabling AI Analysis',
      body: [
        'Set the AI provider API key as an environment variable and the reporter will automatically enable analysis for failing tests.',
      ],
      code: {
        language: 'bash',
        content: `export STAGEWRIGHT_AI_API_KEY="sk-your-api-key"
npx playwright test`,
      },
      note: {
        type: 'info',
        content: 'The default provider is OpenAI (gpt-4o). Pro users can configure alternative providers including Anthropic Claude and local models.',
      },
    },
    {
      heading: 'Failure Clustering',
      body: [
        'When multiple tests fail for the same underlying reason, the AI groups them into clusters. This dramatically reduces noise — instead of reviewing 30 individual failures, you might see 3 clusters with clear root causes.',
      ],
      list: {
        items: [
          'Clusters share a common root cause label and confidence score',
          'Each cluster lists all affected tests with their specific error messages',
          'Clusters are ranked by impact — the largest clusters appear first',
          'Click any cluster to expand and see individual failure details',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Root Cause Suggestions',
      body: [
        'For each failure or cluster, the AI provides a root cause explanation and, where possible, a concrete fix suggestion. Suggestions can include code snippets, selector changes, or environment configuration fixes.',
      ],
      code: {
        language: 'text',
        content: `Root Cause: Selector timeout — the button element is inside a shadow DOM
             that the default locator strategy cannot pierce.

Suggestion:  Use page.locator('button.submit').first() with the
             { hasText: 'Submit' } filter, or switch to a data-testid
             attribute for reliable selection.

Confidence:  87%`,
      },
    },
    {
      heading: 'Pattern Detection',
      body: [
        'Beyond individual failures, the AI looks for patterns across your test suite. It can identify systemic issues that might not be obvious from a single test.',
      ],
      table: {
        headers: ['Pattern', 'Description', 'Example'],
        rows: [
          ['Timing Sensitivity', 'Tests that fail intermittently due to race conditions', 'Login redirect completes before assertion'],
          ['Environment Dependency', 'Failures tied to specific environments or configurations', 'API endpoint unreachable in staging'],
          ['Selector Fragility', 'Tests using brittle selectors that break on UI changes', 'CSS class renamed in latest deploy'],
          ['Data Dependency', 'Tests that assume specific data state', 'Seed data missing from test database'],
          ['Resource Contention', 'Parallel tests competing for shared resources', 'Two tests writing to the same file'],
        ],
      },
    },
    {
      heading: 'Configuration Options',
      body: [
        'Fine-tune how the AI analysis behaves with these options in your reporter config.',
      ],
      table: {
        headers: ['Option', 'Type', 'Default', 'Description'],
        rows: [
          ['aiAnalysis', 'boolean', 'true', 'Enable or disable AI analysis globally'],
          ['aiMaxFailures', 'number', '50', 'Maximum failures to analyse per run'],
          ['aiIncludeScreenshots', 'boolean', 'true', 'Send screenshots to the AI for visual context'],
          ['aiTimeout', 'number', '30000', 'Timeout in ms for the AI provider response'],
        ],
      },
    },
  ],
};
