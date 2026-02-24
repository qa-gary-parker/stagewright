import type { DocPage } from '../types';

export const proAiConfig: DocPage = {
  slug: 'pro-ai-config',
  title: 'AI Configuration',
  description: 'Configure custom AI providers, tune prompts, manage token budgets, and control data privacy.',
  isPro: true,
  sections: [
    {
      heading: 'Overview',
      body: [
        'Pro users can configure the AI analysis engine to use different providers, customise prompts, set token limits, and control what data is sent for analysis. This gives you full control over cost, quality, and data privacy.',
      ],
    },
    {
      heading: 'Custom AI Providers',
      body: [
        'The reporter auto-detects your AI provider based on which API key is set (ANTHROPIC_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY). Pro users can customise the model, switch to Azure OpenAI, or use a local model via an OpenAI-compatible API.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  aiProvider: {
    type: 'anthropic',
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: 'claude-sonnet-4-6-20250514',
  },
}]`,
      },
      table: {
        headers: ['Provider', 'Type Value', 'Default Model'],
        rows: [
          ['OpenAI', 'openai', 'gpt-3.5-turbo (free), custom with Pro'],
          ['Anthropic', 'anthropic', 'claude-3-haiku-20240307 (free), custom with Pro'],
          ['Google Gemini', 'gemini', 'gemini-2.5-flash (free), custom with Pro'],
          ['Azure OpenAI', 'azure', 'Your deployed model name'],
          ['Local / Custom', 'custom', 'Any OpenAI-compatible endpoint'],
        ],
      },
    },
    {
      heading: 'Local Model Configuration',
      body: [
        'For teams that cannot send test data to external providers, configure a local model using an OpenAI-compatible API (e.g., Ollama, LM Studio, vLLM).',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  aiProvider: {
    type: 'custom',
    baseUrl: 'http://localhost:11434/v1',
    model: 'llama3.1',
    apiKey: 'not-needed',  // required field but ignored by local servers
  },
}]`,
      },
      note: {
        type: 'info',
        content: 'Local models provide complete data privacy but may produce less accurate analysis than larger cloud models.',
      },
    },
    {
      heading: 'Prompt Customisation',
      body: [
        'Customise the system prompt and analysis instructions to focus the AI on your specific codebase and failure patterns.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  aiProvider: {
    type: 'openai',
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o',
    systemPrompt: \`You are a QA engineer analysing Playwright test failures
for an e-commerce application built with React and Node.js.
Focus on selector stability, API response timing, and
authentication token expiry as common root causes.\`,
  },
}]`,
      },
    },
    {
      heading: 'Token Limits and Cost Management',
      body: [
        'Control API costs by setting token limits per run. The reporter batches failures efficiently and stops when the budget is exhausted.',
      ],
      table: {
        headers: ['Option', 'Type', 'Default', 'Description'],
        rows: [
          ['maxTokensPerRun', 'number', '50000', 'Maximum total tokens per test run'],
          ['maxTokensPerTest', 'number', '2000', 'Maximum tokens per individual test analysis'],
          ['maxFailuresAnalysed', 'number', '50', 'Stop analysing after this many failures'],
          ['batchSize', 'number', '10', 'Number of failures sent per API call'],
        ],
      },
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  aiProvider: {
    type: 'openai',
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o-mini',  // cheaper model for budget-conscious teams
    maxTokensPerRun: 20000,
    maxFailuresAnalysed: 20,
  },
}]`,
      },
    },
    {
      heading: 'Privacy and Data Handling',
      body: [
        'By default, the reporter sends error messages, stack traces, and test steps to the AI provider. Configure data filters to control what is included.',
      ],
      list: {
        items: [
          'Exclude file paths from stack traces with stripPaths: true',
          'Redact environment variable values with redactEnv: true',
          'Exclude screenshot data with aiIncludeScreenshots: false',
          'Strip custom annotation values with redactAnnotations: true',
          'Use a local model for complete air-gapped analysis',
        ],
        icon: 'check',
      },
      note: {
        type: 'warning',
        content: 'Review your AI provider\'s data retention and privacy policies. Test data may contain sensitive information like URLs, credentials in error messages, or internal API paths.',
      },
    },
  ],
};
