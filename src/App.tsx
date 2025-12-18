import Hero from './components/Hero';
import Features from './components/Features';
import Demo from './components/Demo';
import EmailSignup from './components/EmailSignup';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Hero />
      <Features />
      <Demo />
      <EmailSignup />
      <Footer />
    </div>
  );
}

export default App;
