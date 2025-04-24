/// <reference types="react" />

import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingTierProps {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  isYearly: boolean;
}

const PricingTier: React.FC<PricingTierProps> = ({ 
  name, 
  monthlyPrice,
  yearlyPrice,
  description, 
  features,
  highlighted = false,
  isYearly
}: PricingTierProps) => {
  const price = isYearly ? yearlyPrice : monthlyPrice;
  
  return (
    <div className={`relative ${
      highlighted 
        ? 'bg-purple-900 text-white' 
        : 'bg-white'
    } rounded-2xl shadow-xl p-8 border ${
      highlighted 
        ? 'border-purple-700' 
        : 'border-gray-100'
    }`}>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-purple-500 text-white text-sm font-medium px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3 className={`text-xl font-bold mb-2 ${
          highlighted ? 'text-white' : 'text-gray-900'
        }`}>
          {name}
        </h3>
        <p className={`${
          highlighted ? 'text-purple-200' : 'text-gray-600'
        } mb-4`}>
          {description}
        </p>
        <div className="flex items-baseline">
          <span className={`text-4xl font-bold ${
            highlighted ? 'text-white' : 'text-gray-900'
          }`}>
            {price}
          </span>
          {price !== 'Free' && (
            <span className={`ml-2 ${
              highlighted ? 'text-purple-200' : 'text-gray-600'
            }`}>
              {isYearly ? '/year' : '/month'}
            </span>
          )}
        </div>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check 
              size={20} 
              className={`mr-3 mt-0.5 flex-shrink-0 ${
                highlighted ? 'text-purple-300' : 'text-purple-500'
              }`} 
            />
            <span className={highlighted ? 'text-purple-100' : 'text-gray-600'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      
      {name === "Free" ? (
        <a 
          href="https://tally.so/r/wLo0l1"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center group transition-all ${
            highlighted
              ? 'bg-white text-purple-900 hover:bg-purple-50'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          Get Started
          <ArrowRight 
            size={18} 
            className="ml-2 group-hover:translate-x-1 transition-transform"
          />
        </a>
      ) : (
        <button className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center group transition-all ${
          highlighted
            ? 'bg-white text-purple-900 hover:bg-purple-50'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}>
          Get Started
          <ArrowRight 
            size={18} 
            className="ml-2 group-hover:translate-x-1 transition-transform"
          />
        </button>
      )}
    </div>
  );
};

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const tiers = [
    {
      name: "Free",
      monthlyPrice: "Free",
      yearlyPrice: "Free",
      description: "Try Revilo's basic Instagram review monitoring",
      features: [
        "✅ 3 review per month",
        "✅ Instagram review",
        "✅ PNG downloads",
        "❌ No Watermarks on all reviews",
        "❌ Access To Templates Library",
        "❌ Custom Template",
        "❌ Priority Support",
        "❌ Weekly review notifications",
        "❌ Email Support"
      ]
    },
    {
      name: "Basic",
      monthlyPrice: "$15",
      yearlyPrice: "$150",
      description: "For growing businesses",
      features: [
        "✅ 3 review cards per week",
        "✅ No Watermark on all reviews",
        "✅ Access To Templates Library",
        "✅ Instagram review",
        "✅ PNG downloads",
        "✅ Weekly review notifications",
        "✅ Email support within 24 hours",
        "❌ Custom Template",
        "❌ Unlimited review cards",
        "❌ Priority Support",
        "⏳ Twitter Reviews (Coming Soon!)",
        "⏳ TikTok Reviews (Coming Soon!)",
        "💰 Save 17% compared to monthly billing"
      ],
      highlighted: true
    },
    {
      name: "Business",
      monthlyPrice: "$30",
      yearlyPrice: "$300",
      description: "For professional marketers",
      features: [
        "✅ Unlimited review cards",
        "✅ Automated review reports via email",
        "✅ No Watermark on all reviews",
        "✅ Instagram review",
        "✅ PNG downloads",
        "✅ Weekly review notifications",
        "✅ Custom Template",
        "✅ Access To Templates Library",
        "✅ Priority support with 4-hour response",
        "⏳ Twitter Reviews (Coming Soon!)",
        "⏳ TikTok Reviews (Coming Soon!)",
        "⏳ Sentimental analysis (Coming Soon!)",
        "⏳ Advanced Instagram analytics (Coming Soon!)",
        "⏳ Twitter analytics (Coming Soon!)",
        "⏳ TikTok analytics (Coming Soon!)",
        "💰 Save 17% compared to monthly billing"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, <span className="text-purple-700">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Choose the perfect plan for your needs. No hidden fees or surprises.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className={`text-sm font-medium ${!isYearly ? 'text-purple-900' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-purple-900' : 'text-gray-500'}`}>
              Yearly
              <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                Save up to 17%
              </span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <PricingTier
              key={index}
              name={tier.name}
              monthlyPrice={tier.monthlyPrice}
              yearlyPrice={tier.yearlyPrice}
              description={tier.description}
              features={tier.features}
              highlighted={tier.highlighted}
              isYearly={isYearly}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom plan for your enterprise?
          </p>
          <a 
            href="#contact" 
            className="text-purple-700 font-medium hover:text-purple-800 transition-colors"
          >
            Contact us for custom pricing →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;