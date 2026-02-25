import type { DocPage } from '../types';

export const networkLogs: DocPage = {
  slug: 'network-logs',
  title: 'Network Logs',
  description: 'Capture and inspect HTTP requests, responses, and timing data for every test.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'Network logs capture every HTTP request and response that occurs during test execution. This data is essential for debugging API-related failures, identifying slow endpoints, and understanding the full communication between your application and its backend services.',
      ],
    },
    {
      heading: 'Enabling Network Capture',
      body: [
        'Network logging is disabled by default to keep report size small. Enable it with the enableNetworkLogs option.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  enableNetworkLogs: true,
}]`,
      },
      note: {
        type: 'warning',
        content: 'Network logs can significantly increase report size for tests that make many API calls. Consider enabling selectively for debugging rather than for every CI run.',
      },
    },
    {
      heading: 'Request and Response Display',
      body: [
        'Each network entry shows the full request and response data in an expandable panel within the test details.',
      ],
      table: {
        headers: ['Field', 'Description'],
        rows: [
          ['Method', 'HTTP method (GET, POST, PUT, DELETE, etc.)'],
          ['URL', 'Full request URL with query parameters'],
          ['Status', 'Response status code with colour coding (2xx green, 4xx orange, 5xx red)'],
          ['Duration', 'Time from request start to response complete'],
          ['Size', 'Response body size in bytes'],
          ['Headers', 'Request and response headers (expandable)'],
          ['Body', 'Request and response body (expandable, truncated at 10KB)'],
          ['Timing', 'DNS, connect, TLS, TTFB, and download breakdown'],
        ],
      },
    },
    {
      heading: 'Filtering Network Data',
      body: [
        'Reports with many network entries provide filtering controls to help you find the requests that matter.',
      ],
      list: {
        items: [
          'Filter by URL pattern — search for specific endpoints',
          'Filter by status code — show only errors (4xx/5xx)',
          'Filter by method — isolate POST or PUT requests',
          'Filter by duration — find slow requests above a threshold',
          'Filter by content type — show only API calls (application/json)',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Performance Insights',
      body: [
        'The network summary panel aggregates timing data across all requests to surface performance bottlenecks.',
      ],
      table: {
        headers: ['Metric', 'Description'],
        rows: [
          ['Total Requests', 'Number of HTTP requests made during the test'],
          ['Failed Requests', 'Requests that returned 4xx or 5xx status codes'],
          ['Average Response Time', 'Mean response time across all requests'],
          ['Slowest Endpoint', 'The URL with the longest average response time'],
          ['Total Transfer Size', 'Combined size of all response bodies'],
        ],
      },
    },
    {
      heading: 'Excluding Sensitive Data',
      body: [
        'By default, request and response bodies are captured as-is. Use the networkFilter option to exclude sensitive endpoints or redact specific headers.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  showNetwork: true,
  networkFilter: {
    excludeUrls: ['/api/auth/**', '/api/tokens/**'],
    redactHeaders: ['Authorization', 'Cookie', 'Set-Cookie'],
    maxBodySize: 5000,  // truncate bodies larger than 5KB
  },
}]`,
      },
    },
  ],
};
