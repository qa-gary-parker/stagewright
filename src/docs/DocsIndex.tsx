import { Link } from 'react-router-dom';
import ProBadge from '../components/ProBadge.tsx';
import { docsNavigation } from './content/index.ts';

export default function DocsIndex() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Everything you need to set up StageWright, configure the Smart Reporter, and get the most from your test analytics.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {docsNavigation.map((section) => (
          <Link
            key={section.id}
            to={`/docs/${section.items[0].slug}`}
            className="group p-6 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all"
          >
            <h2 className="text-lg font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
              {section.title}
            </h2>
            <ul className="space-y-1.5">
              {section.items.map((item) => (
                <li key={item.slug} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="w-1 h-1 bg-slate-600 rounded-full" />
                  {item.title}
                  {item.isPro && <ProBadge size="sm" />}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
}
