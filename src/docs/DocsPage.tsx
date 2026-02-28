import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProBadge from '../components/ProBadge.tsx';
import { docsNavigation } from './content/index.ts';
import type { DocPage, ContentSection } from './types.ts';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function renderSection(section: ContentSection, idx: number) {
  return (
    <div key={idx} className="space-y-4">
      {section.heading && (
        <h2 id={slugify(section.heading)} className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-20">
          <a href={`#${slugify(section.heading)}`} className="hover:text-green-400 transition-colors">
            {section.heading}
          </a>
        </h2>
      )}

      {section.body?.map((p, i) => (
        <p key={i} className="text-slate-300 leading-relaxed">{p}</p>
      ))}

      {section.code && (
        <div className="relative rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700/50">
            <span className="text-xs text-slate-400 font-mono">{section.code.language}</span>
          </div>
          <pre className="p-4 bg-slate-800/50 overflow-x-auto">
            <code className="text-sm text-slate-300 font-mono">{section.code.content}</code>
          </pre>
        </div>
      )}

      {section.list && (
        <ul className="space-y-2">
          {section.list.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300">
              {section.list!.icon === 'check' ? (
                <svg className="w-5 h-5 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : section.list!.icon === 'arrow' ? (
                <svg className="w-5 h-5 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              ) : (
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 shrink-0" />
              )}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {section.note && (
        <div
          className={`rounded-lg border p-4 ${
            section.note.type === 'info'
              ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
              : section.note.type === 'warning'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-green-500/10 border-green-500/30 text-green-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            {section.note.type === 'pro' && <ProBadge size="sm" />}
            <span className="text-sm font-semibold uppercase">
              {section.note.type === 'info' ? 'Note' : section.note.type === 'warning' ? 'Warning' : 'Starter Feature'}
            </span>
          </div>
          <p className="text-sm">{section.note.content}</p>
        </div>
      )}

      {section.table && (
        <div className="overflow-x-auto rounded-lg border border-slate-700/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/80">
                {section.table.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left text-slate-300 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-slate-700/30">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-slate-400">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function DocsPage({ page }: { page?: DocPage }) {
  const { prev, next } = useMemo(() => {
    if (!page) return { prev: null, next: null };
    const allSlugs = docsNavigation.flatMap((s) => s.items.map((i) => i.slug));
    const idx = allSlugs.indexOf(page.slug);
    const allItems = docsNavigation.flatMap((s) => s.items);
    return {
      prev: idx > 0 ? allItems[idx - 1] : null,
      next: idx < allItems.length - 1 ? allItems[idx + 1] : null,
    };
  }, [page]);

  useEffect(() => {
    document.title = page
      ? `${page.title} | StageWright Docs`
      : 'Page Not Found | StageWright Docs';
  }, [page]);

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-16 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-slate-400 mb-8">The documentation page you're looking for doesn't exist.</p>
        <Link to="/docs" className="text-green-400 hover:text-green-300 transition-colors">
          Back to Documentation
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-white">{page.title}</h1>
          {page.isPro && <ProBadge size="md" />}
        </div>
        <p className="text-lg text-slate-400">{page.description}</p>
      </div>

      <div className="space-y-6">
        {page.sections.map((section, i) => renderSection(section, i))}
      </div>

      {page.sections.length === 0 && (
        <div className="mt-8 rounded-lg border border-slate-700/50 bg-slate-800/30 p-8 text-center">
          <p className="text-slate-400">Content coming soon.</p>
        </div>
      )}

      <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between">
        {prev ? (
          <Link to={`/docs/${prev.slug}`} className="group flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">{prev.title}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/docs/${next.slug}`} className="group flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors">
            <span className="text-sm">{next.title}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : <div />}
      </div>
    </article>
  );
}
