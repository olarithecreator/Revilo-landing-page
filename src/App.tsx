import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import ReviewShowcase from './components/ReviewShowcase';
import Pricing from './components/Pricing';
import GetStarted from './components/GetStarted';
import Faq from './components/Faq';
import Footer from './components/Footer';

function App() {
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

export default App;