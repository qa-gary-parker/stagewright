import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What is playwright-smart-reporter?',
    answer:
      'An open-source Playwright custom reporter that generates beautiful, self-contained HTML reports. Install it from npm, add it to your Playwright config, and get rich test dashboards with zero infrastructure.',
  },
  {
    question: "What's the difference between Local, Starter, and Pro?",
    answer:
      'Local is free forever and includes the full HTML report with stability grades, trend charts, run comparison, and more. Starter (£5/mo) adds AI failure analysis (2,000/mo), extra themes, PDF/JSON exports, and quality gates. Pro (£9/mo) bumps AI analyses to 5,000/mo and adds custom theme colours, multiple PDF styles, and priority support.',
  },
  {
    question: 'How does AI failure analysis work?',
    answer:
      'When a test fails, the reporter sends the failure metadata to our managed proxy — no API keys needed on your end. The proxy forwards it to an LLM, and the analysis is returned inline in your HTML report. Your test data is not stored beyond rate-limit counters.',
  },
  {
    question: 'Do I need a cloud account?',
    answer:
      'No. The reporter runs entirely locally or in CI and generates a static HTML file. There is no server to set up. A cloud dashboard for team features and history is on the roadmap but is not required.',
  },
  {
    question: 'How do I activate my license?',
    answer:
      'Set the SMART_REPORTER_LICENSE_KEY environment variable to the key from your LemonSqueezy purchase email. The reporter validates it automatically on each run.',
  },
  {
    question: 'Does it work in CI?',
    answer:
      'Yes — it is designed for CI from day one. It works with GitHub Actions, Jenkins, GitLab CI, CircleCI, and any environment that can run Playwright.',
  },
  {
    question: 'What Playwright versions are supported?',
    answer: 'Playwright v1.40 and above.',
  },
  {
    question: 'How do I get support?',
    answer:
      'Open an issue on GitHub or email support@stagewright.dev. Pro customers receive priority responses.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <div id="faq" className="relative py-24 px-6 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-green-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-2">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm sm:text-base font-medium text-white pr-4">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-slate-400 shrink-0"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
