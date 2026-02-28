import type { DocPage } from '../types';

export const proAiConfig: DocPage = {
  slug: 'pro-ai-config',
  title: 'AI Configuration',
  description: 'AI failure analysis is fully managed with Starter and Pro — no configuration or API keys required.',
  isPro: true,
  sections: [
    {
      heading: 'Overview',
      body: [
        'AI failure analysis is a managed service included with every Starter and Pro license. There is no configuration required — analysis runs automatically when failures are detected in your test suite.',
        'Starter plans include 2,000 AI analyses per month. Pro plans include 5,000. Analysis is powered by GPT-4o-mini via the StageWright proxy, so you never need to manage API keys or provider accounts.',
      ],
    },
    {
      heading: 'How It Works',
      body: [
        'When the reporter detects test failures, it sends a structured summary of the failure data to the StageWright AI endpoint. The proxy validates your license, checks your rate limit, and forwards the request to OpenAI. The response is embedded directly in your HTML report.',
      ],
      list: {
        items: [
          'Automatic with any valid Starter or Pro license',
          '2,000 analyses/month (Starter) or 5,000 analyses/month (Pro)',
          'Powered by GPT-4o-mini for fast, cost-effective analysis',
          'No API keys, provider setup, or token budgets to manage',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Quota and Rate Limits',
      body: [
        'Your organisation shares a pool of AI analyses per month (2,000 for Starter, 5,000 for Pro). Each individual failure analysis counts as one request. Failure clustering batches related failures together, so a cluster of 10 similar failures may only use a single analysis request.',
      ],
      note: {
        type: 'info',
        content: 'When your quota is exhausted, the reporter continues to generate reports normally — only the AI analysis section is omitted until the window resets.',
      },
    },
    {
      heading: 'Privacy and Data Handling',
      body: [
        'The StageWright proxy forwards failure data (error messages, stack traces, and test steps) to OpenAI for analysis. No data is stored by the proxy — it acts as a pass-through that validates your license and enforces rate limits.',
      ],
      list: {
        items: [
          'Only failure-related data is sent (no screenshots, videos, or passing test data)',
          'The proxy does not log or persist your test data',
          'Data is processed by OpenAI under their API data usage policy',
          'No test data is used for model training',
        ],
        icon: 'check',
      },
      note: {
        type: 'warning',
        content: 'Test failure data may contain sensitive information like internal URLs, API paths, or credentials in error messages. Review your test output if this is a concern for your organisation.',
      },
    },
  ],
};
