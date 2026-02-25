export default function Privacy() {
  return (
    <article className="prose-legal">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
        Privacy Policy
      </h1>
      <p className="text-slate-500 text-sm mb-10">Last updated: February 2026</p>

      <p className="text-slate-300 mb-8 leading-relaxed">
        StageWright ("we", "us") operates the playwright-smart-reporter npm
        package and the stagewright.dev website. This policy explains what data
        we collect, how we use it, and your rights.
      </p>

      <Section title="Data We Collect">
        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li>
            <strong className="text-slate-300">Email address</strong> — if you
            sign up for our newsletter (collected via Resend).
          </li>
          <li>
            <strong className="text-slate-300">License key</strong> — generated
            by LemonSqueezy when you purchase a Starter or Pro license. We
            validate it on each reporter run.
          </li>
          <li>
            <strong className="text-slate-300">Test failure metadata</strong> —
            when AI failure analysis is enabled, the reporter sends failure
            snippets (error messages, stack traces, test names) to our managed
            proxy.
          </li>
        </ul>
      </Section>

      <Section title="AI Failure Analysis">
        <p className="text-slate-400 leading-relaxed">
          Test failure data is forwarded to OpenAI via our managed proxy for
          analysis. We do not store test data on our servers. The only
          server-side record is a rate-limit counter per license key, stored in
          Upstash Redis and automatically expired after 30 days.
        </p>
      </Section>

      <Section title="Analytics">
        <p className="text-slate-400 leading-relaxed">
          This website uses Vercel Analytics, which collects anonymous usage
          data. Vercel Analytics is cookieless — it does not use cookies or
          track individual visitors across sessions.
        </p>
      </Section>

      <Section title="Third-Party Services">
        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li>
            <strong className="text-slate-300">LemonSqueezy</strong> — payment
            processing and license key management.
          </li>
          <li>
            <strong className="text-slate-300">Resend</strong> — newsletter
            email delivery.
          </li>
          <li>
            <strong className="text-slate-300">Upstash</strong> — rate-limit
            counters for AI analysis (Redis).
          </li>
          <li>
            <strong className="text-slate-300">OpenAI</strong> — AI failure
            analysis via managed proxy.
          </li>
          <li>
            <strong className="text-slate-300">Vercel</strong> — website hosting
            and anonymous analytics.
          </li>
        </ul>
      </Section>

      <Section title="Data Retention">
        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li>License keys are managed by LemonSqueezy for the duration of your subscription.</li>
          <li>Rate-limit counters expire automatically after 30 days.</li>
          <li>No test data is stored server-side.</li>
          <li>Newsletter subscriptions can be removed at any time via the unsubscribe link in each email.</li>
        </ul>
      </Section>

      <Section title="Your Rights">
        <p className="text-slate-400 leading-relaxed">
          You can request access to, correction of, or deletion of your personal
          data at any time by emailing{' '}
          <a
            href="mailto:support@stagewright.dev"
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            support@stagewright.dev
          </a>
          .
        </p>
      </Section>

      <Section title="Contact">
        <p className="text-slate-400 leading-relaxed">
          For any privacy-related questions, contact us at{' '}
          <a
            href="mailto:support@stagewright.dev"
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            support@stagewright.dev
          </a>
          .
        </p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      {children}
    </section>
  );
}
