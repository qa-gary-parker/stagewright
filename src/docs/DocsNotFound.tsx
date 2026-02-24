import { Link } from 'react-router-dom';

export default function DocsNotFound() {
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
