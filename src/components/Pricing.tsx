import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <Link
          to="/pricing"
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
        </Link>
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
        "✅ Standard Email Support",
        "❌ No Watermarks on all reviews",
        "❌ Access To Templates Library",
        "❌ Custom Template request",
        "❌ Priority Support",
        "❌ Weekly review notifications",
      ]
    },
    {
      name: "Pro",
      monthlyPrice: "$9",
      yearlyPrice: "$89",
      description: "For growing businesses",
      features: [
        "✅ 3 review cards per week",
        "✅ No Watermark on all reviews",
        "✅ Access To Templates Library",
        "✅ Instagram review",
        "✅ PNG downloads",
        "✅ Weekly review notifications",
        "✅ Email support within 24 hours",
        "❌ Custom Template request",
        "❌ Priority Support",
        "💰 Save 17% compared to monthly billing"
      ],
      highlighted: true
    },
    {
      name: "Business",
      monthlyPrice: "$18",
      yearlyPrice: "$179",
      description: "For professional marketers",
      features: [
        "✅ Unlimited review cards",
        "✅ Automated review reports via email",
        "✅ No Watermark on all reviews",
        "✅ Instagram review",
        "✅ PNG downloads",
        "✅ Weekly review notifications",
        "✅ Custom Template request",
        "✅ Access To Templates Library",
        "✅ Priority support with 4-hour response",
        "✅ Dedicated Customer Success Manager",
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
        {/* More features coming soon note */}
        <div className="text-center mt-6 mb-2">
          <span className="text-purple-700 font-medium text-base">
            More features coming soon!
          </span>
        </div>
        {/* Feature Comparison Table */}
        <div className="overflow-x-auto mt-12">
          <table className="min-w-full border border-gray-200 rounded-lg bg-white text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-bold text-gray-700">Feature</th>
                <th className="py-3 px-4 font-bold text-purple-700">Free</th>
                <th className="py-3 px-4 font-bold text-purple-700">Pro</th>
                <th className="py-3 px-4 font-bold text-purple-700">Business</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2 px-4">Review Cards per Month</td>
                <td className="text-center">3</td>
                <td className="text-center">12</td>
                <td className="text-center">Unlimited</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">No Watermark</td>
                <td className="text-center text-red-500 font-bold">✗</td>
                <td className="text-center text-green-600 font-bold">✓</td>
                <td className="text-center text-green-600 font-bold">✓</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">Access to Templates Library</td>
                <td className="text-center text-red-500 font-bold">✗</td>
                <td className="text-center text-green-600 font-bold">✓</td>
                <td className="text-center text-green-600 font-bold">✓</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">Custom Template</td>
                <td className="text-center text-red-500 font-bold">✗</td>
                <td className="text-center text-red-500 font-bold">✗</td>
                <td className="text-center text-green-600 font-bold">✓</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">Priority Support</td>
                <td className="text-center text-red-500 font-bold">✗</td>
                <td className="text-center text-red-500 font-bold">✗</td>
                <td className="text-center text-green-600 font-bold">✓</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">Weekly Review Notifications</td>
                <td className="text-center text-red-500 font-bold">✗</td>
                <td className="text-center text-green-600 font-bold">✓</td>
                <td className="text-center text-green-600 font-bold">✓</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">Email Support</td>
                <td className="text-center text-red-500 font-bold">✗</td>
                <td className="text-center text-green-600 font-bold">✓</td>
                <td className="text-center text-green-600 font-bold">✓</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">Automated Review Reports</td>
                <td className="text-center text-red-500 font-bold">✗</td>
                <td className="text-center text-red-500 font-bold">✗</td>
                <td className="text-center text-green-600 font-bold">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom plan for your enterprise?
          </p>
          <Link 
            to="/contact" 
            className="text-purple-700 font-medium hover:text-purple-800 transition-colors"
          >
            Contact us for custom pricing →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;