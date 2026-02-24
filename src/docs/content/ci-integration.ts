import type { DocPage } from '../types';

export const ciIntegration: DocPage = {
  slug: 'ci-integration',
  title: 'CI Integration',
  description: 'Set up playwright-smart-reporter in GitHub Actions, GitLab CI, Jenkins, and CircleCI pipelines.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'The reporter works in any CI environment that supports Node.js. When the CI environment variable is detected, the reporter automatically enables CI-optimised defaults — including build metadata injection and artifact-friendly output paths.',
      ],
    },
    {
      heading: 'GitHub Actions',
      body: [
        'A complete GitHub Actions workflow that runs Playwright tests, generates the smart report, and uploads it as a build artifact.',
      ],
      code: {
        language: 'yaml',
        content: `name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Restore test history
        uses: actions/cache@v4
        with:
          path: reports/history.json
          key: test-history-\${{ github.ref }}
          restore-keys: test-history-

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: reports/
          retention-days: 30`,
      },
    },
    {
      heading: 'GitLab CI',
      code: {
        language: 'yaml',
        content: `playwright-tests:
  image: mcr.microsoft.com/playwright:v1.48.0-noble
  stage: test
  script:
    - npm ci
    - npx playwright test
  artifacts:
    when: always
    paths:
      - reports/
    expire_in: 30 days
  cache:
    key: test-history
    paths:
      - reports/history.json`,
      },
    },
    {
      heading: 'Jenkins Pipeline',
      code: {
        language: 'groovy',
        content: `pipeline {
    agent { docker { image 'mcr.microsoft.com/playwright:v1.48.0-noble' } }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
            publishHTML(target: [
                reportName: 'Playwright Report',
                reportDir: 'reports',
                reportFiles: 'smart-report.html',
            ])
        }
    }
}`,
      },
    },
    {
      heading: 'CircleCI',
      code: {
        language: 'yaml',
        content: `version: 2.1

jobs:
  test:
    docker:
      - image: mcr.microsoft.com/playwright:v1.48.0-noble
    steps:
      - checkout
      - restore_cache:
          keys:
            - deps-v1-{{ checksum "package-lock.json" }}
      - run: npm ci
      - save_cache:
          key: deps-v1-{{ checksum "package-lock.json" }}
          paths: [node_modules]
      - run: npx playwright test
      - store_artifacts:
          path: reports
          destination: playwright-report

workflows:
  test:
    jobs:
      - test`,
      },
    },
    {
      heading: 'Best Practices',
      list: {
        items: [
          'Always upload reports as artifacts with if: always() (or equivalent) so they are available even on failure',
          'Cache the history.json file across builds for continuous trend tracking',
          'Use the Playwright Docker image to avoid browser installation time',
          'Set a reasonable artifact retention period (30 days is typical)',
          'Use sharding for large suites and merge reports before generating the smart report',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Build Metadata',
      body: [
        'When running in CI, the reporter automatically detects and includes build metadata in the report header.',
      ],
      table: {
        headers: ['Metadata', 'Source', 'CI Providers'],
        rows: [
          ['Commit SHA', 'GITHUB_SHA, CI_COMMIT_SHA, GIT_COMMIT', 'GitHub, GitLab, Jenkins'],
          ['Branch', 'GITHUB_REF_NAME, CI_COMMIT_BRANCH, GIT_BRANCH', 'GitHub, GitLab, Jenkins'],
          ['Build URL', 'GITHUB_SERVER_URL, CI_JOB_URL, BUILD_URL', 'GitHub, GitLab, Jenkins'],
          ['Build Number', 'GITHUB_RUN_NUMBER, CI_JOB_ID, BUILD_NUMBER', 'GitHub, GitLab, Jenkins'],
          ['PR Number', 'GITHUB_EVENT pull_request, CI_MERGE_REQUEST_IID', 'GitHub, GitLab'],
        ],
      },
    },
  ],
};
