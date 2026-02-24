import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProBadge from '../components/ProBadge.tsx';
import type { DocSection } from './types.ts';

export default function DocsSidebar({
  navigation,
  onClose,
}: {
  navigation: DocSection[];
  onClose?: () => void;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    () => Object.fromEntries(navigation.map((s) => [s.id, true]))
  );

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <nav className="py-6 px-4 space-y-1">
      {navigation.map((section) => (
        <div key={section.id}>
          <button
            onClick={() => toggle(section.id)}
            aria-expanded={expanded[section.id]}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors"
          >
            {section.title}
            <svg
              className={`w-4 h-4 transition-transform ${expanded[section.id] ? 'rotate-0' : '-rotate-90'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expanded[section.id] && (
            <div className="ml-2 space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.slug}
                  to={`/docs/${item.slug}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      isActive
                        ? 'text-green-400 bg-green-500/10 border-l-2 border-green-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border-l-2 border-transparent'
                    }`
                  }
                >
                  {item.title}
                  {item.isPro && <ProBadge size="sm" />}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
