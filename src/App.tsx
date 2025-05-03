import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/templates" element={<Template />} />
      <Route path="/template" element={<Template />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;