export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <img src="/logo.png" alt="StageWright Logo" className="w-14 h-14 rounded-xl" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                Stage<span className="text-green-400">Wright</span>
              </h3>
              <p className="text-slate-400 text-sm">
                Get your test stage right.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/demo-report.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
            >
              StageWright Local Demo →
            </a>
            <p className="text-slate-500 text-sm">
              © {currentYear} StageWright. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-slate-600 text-xs">
            Built for developers who care about quality
          </p>
        </div>
      </div>
    </footer>
  );
}
