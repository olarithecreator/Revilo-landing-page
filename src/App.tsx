import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import ReviewShowcase from './components/ReviewShowcase';
import Pricing from './components/Pricing';
import GetStarted from './components/GetStarted';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Template from './pages/Template';

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <ReviewShowcase />
      <Pricing />
      <GetStarted />
      <Faq />
      <Footer />
    </div>
  );
}

const routes = {
  '': <Landing />,
  'dashboard': <Dashboard />,
  'templates': <Template />,
  'template': <Template />,
};

function App() {
  const [page, setPage] = useState(window.location.hash.replace('#', ''));

  useEffect(() => {
    const onHashChange = () => setPage(window.location.hash.replace('#', ''));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return routes[page] || <Landing />;
}

export default App;