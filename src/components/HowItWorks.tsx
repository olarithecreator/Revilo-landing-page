import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Your Social Accounts",
      description: "Simply link your social media accounts where you receive customer reviews and comments.",
      color: "bg-purple-100 text-purple-700"
    },
    {
      number: "02",
      title: "Select Your Best Comments",
      description: "Choose the most impactful comments or let our AI automatically identify your best reviews.",
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      number: "03",
      title: "Customize Your Design",
      description: "Pick a template that matches your brand and customize colors, fonts, and layout if needed.",
      color: "bg-violet-100 text-violet-700"
    },
    {
      number: "04",
      title: "Share Everywhere",
      description: "Download your review cards or share them directly to your website and social channels.",
      color: "bg-fuchsia-100 text-fuchsia-700"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Revilo <span className="text-purple-700">Works</span>
          </h2>
          <p className="text-lg text-gray-600">
            Transform your social comments into stunning review cards in just four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 z-0 -ml-4">
                  <ArrowRight className="absolute -right-3 -top-2 text-gray-300" size={20} />
                </div>
              )}
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm relative z-10 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center font-bold text-lg mb-5`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 flex-grow">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/pricing" 
            className="inline-flex items-center bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-full text-lg font-medium transition-all group"
          >
            Get Started Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;