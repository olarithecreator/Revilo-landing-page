import React from 'react';
import { Sparkles, Zap, Share2, Palette, Lock, BarChart3 } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-purple-100 transition-all hover:shadow-md hover:border-purple-200 group">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-700 rounded-lg mb-5 group-hover:bg-purple-700 group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Sparkles size={22} />,
      title: "AI-Powered Transformation",
      description: "Our AI automatically identifies your best Instagram reviews and transforms them into beautiful visual cards."
    },
    {
      icon: <Zap size={22} />,
      title: "Instant Creation",
      description: "Just link your Instagram profile and get stunning review cards in seconds - no design skills needed."
    },
    {
      icon: <Share2 size={22} />,
      title: "One-Click Sharing",
      description: "Share your Instagram review cards directly to your marketing channels or download for promotional materials."
    },
    {
      icon: <Palette size={22} />,
      title: "Customizable Templates",
      description: "Choose from dozens of professional templates or customize to match your brand perfectly."
    },
    {
      icon: <Lock size={22} />,
      title: "Privacy Focused",
      description: "We only access the public Instagram comments you choose to transform, keeping your data secure."
    },
    {
      icon: <BarChart3 size={22} />,
      title: "Performance Analytics",
      description: "Track how your Instagram review cards perform to optimize your social proof."
    }
  ];

  return (
    <section id="features" className="py-20 bg-purple-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Turn Instagram Comments Into <span className="text-purple-700">Powerful Social Proof</span>
          </h2>
          <p className="text-lg text-gray-600">
            Revilo makes it incredibly easy to transform positive Instagram feedback into marketing gold.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;