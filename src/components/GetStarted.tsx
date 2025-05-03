import React, { useState } from 'react';
import { ArrowRight, Instagram } from 'lucide-react';

interface SocialHandleInputProps {
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}

const SocialHandleInput: React.FC<SocialHandleInputProps> = ({ 
  icon, value, onChange 
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">Instagram</label>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500">
        <div className="bg-gray-100 p-3 text-gray-500">
          {icon}
        </div>
        <input
          type="text"
          placeholder="@yourhandle"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 py-3 px-4 outline-none text-gray-700"
        />
      </div>
    </div>
  );
};

const GetStarted: React.FC = () => {
  const [instagramHandle, setInstagramHandle] = useState('');

  return (
    <section id="get-started" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Instagram Reviews?</h2>
              <p className="mb-6 opacity-90">
                Share your Instagram handle and start creating beautiful review cards in minutes.
                No credit card required to get started.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Generate up to 3 review cards for free',
                  'No design experience required',
                  'Share directly to your accounts'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-white text-purple-600 rounded-full mr-2 mt-0.5 text-xs font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 bg-white p-8 md:p-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Enter Your Instagram Handle</h3>
              <div className="space-y-4">
                <SocialHandleInput
                  icon={<Instagram size={18} />}
                  value={instagramHandle}
                  onChange={setInstagramHandle}
                />
                <a 
                  href="#pricing"
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all flex items-center justify-center group mt-6"
                >
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;