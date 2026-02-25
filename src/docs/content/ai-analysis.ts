import type { DocPage } from '../types';

export const aiAnalysis: DocPage = {
  slug: 'ai-analysis',
  title: 'AI Failure Analysis',
  description: 'Automatically detect root causes, cluster related failures, and receive actionable fix suggestions — included with Pro.',
  isPro: true,
  sections: [
    {
      heading: 'How AI Analysis Works',
      body: [
        'When your test run completes, the reporter collects all failure data — error messages, stack traces, test steps, and screenshots — and sends a structured summary to the StageWright AI proxy. The model analyses the failures and returns root cause explanations, pattern clusters, and suggested fixes.',
        'Analysis runs asynchronously after the test suite finishes, so it adds minimal overhead to your pipeline. Results are embedded directly into the HTML report.',
      ],
    },
    {
      heading: 'Enabling AI Analysis',
      body: [
        'AI analysis is automatic with a Starter or Pro license. No API keys or provider configuration needed — just install the reporter, activate your license, and run your tests.',
      ],
      code: {
        language: 'bash',
        content: `# Set your license key (Starter or Pro)
export SMART_REPORTER_LICENSE_KEY="your-license-key"

# Run tests — AI analysis happens automatically for failures
npx playwright test`,
      },
      note: {
        type: 'info',
        content: 'Starter plans include 2,000 AI analyses per month. Pro plans include 5,000. Analysis is powered by GPT-4o-mini via the StageWright managed proxy.',
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
      heading: 'Privacy',
      body: [
        'AI analysis sends failure data (error messages, stack traces, and test steps) to OpenAI via the StageWright proxy. No screenshots or video attachments are sent. The proxy does not store your test data — it is forwarded to the AI provider and discarded.',
      ],
      note: {
        type: 'warning',
        content: 'Test failure data may contain sensitive information like internal URLs, API paths, or credentials in error messages. Review your test output if this is a concern for your organisation.',
      },
    },
  ],
};
