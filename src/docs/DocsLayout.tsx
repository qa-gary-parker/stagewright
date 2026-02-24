import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import DocsSidebar from './DocsSidebar.tsx';
import { docsNavigation } from './content/index.ts';

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-[280px] shrink-0 border-r border-slate-800/50 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
          <DocsSidebar navigation={docsNavigation} />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black/60"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-[280px] bg-slate-950 border-r border-slate-800/50 h-full overflow-y-auto z-50">
              <DocsSidebar navigation={docsNavigation} onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 min-w-0">
          {/* Mobile sidebar toggle */}
          <div className="lg:hidden sticky top-16 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 px-4 py-2">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={sidebarOpen}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Menu
            </button>
          </div>

          <main className="overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
