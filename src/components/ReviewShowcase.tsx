import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ReviewShowcase: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState(0);
  
  const templates = [
    {
      name: "Minimal",
      color: "bg-gray-100",
      accent: "bg-gray-800"
    },
    {
      name: "Vibrant",
      color: "bg-purple-100",
      accent: "bg-purple-700"
    },
    {
      name: "Modern",
      color: "bg-blue-100",
      accent: "bg-blue-700"
    },
    {
      name: "Elegant",
      color: "bg-amber-100",
      accent: "bg-amber-700"
    }
  ];
  
  const reviews = [
    {
      name: "Alex Johnson",
      handle: "@alexj",
      platform: "Instagram",
      content: "I've been using Revilo for a month now and it's completely changed how I showcase customer feedback. The cards look professional and get way more engagement!",
      rating: 5
    },
    {
      name: "Sarah Williams",
      handle: "@sarahw",
      platform: "Instagram",
      content: "My followers love the review cards I create with Revilo. They're so much more eye-catching than just screenshots. Definitely worth every penny!",
      rating: 5
    },
    {
      name: "Michael Chen",
      handle: "@mikechen",
      platform: "Instagram",
      content: "As a small business owner, credibility is everything. Revilo helps me turn customer praise into professional marketing assets without any design skills.",
      rating: 4
    }
  ];

  return (
    <section id="examples" className="py-20 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Beautiful <span className="text-purple-700">Review Cards</span> For Any Brand
          </h2>
          <p className="text-lg text-gray-600">
            Choose from multiple design templates to match your brand's aesthetic or create your own custom style.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {templates.map((template, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTemplate === index 
                  ? `${template.accent} text-white` 
                  : `${template.color} text-gray-800 hover:opacity-80`
              }`}
              onClick={() => setActiveTemplate(index)}
            >
              {template.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${templates[activeTemplate].color} p-6 rounded-xl shadow-md border ${
                templates[activeTemplate].name === "Minimal" 
                  ? "border-gray-200" 
                  : `border-${templates[activeTemplate].accent.split('-')[1]}-200`
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 ${templates[activeTemplate].accent} rounded-full flex items-center justify-center text-white font-bold`}>
                  {review.name.split(' ').map(name => name[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{review.name}</h3>
                  <p className="text-gray-500 text-sm">{review.handle} • {review.platform}</p>
                </div>
              </div>
              
              <p className={`${
                templates[activeTemplate].name === "Minimal" 
                  ? "text-gray-700" 
                  : `text-${templates[activeTemplate].accent.split('-')[1]}-800`
              } italic mb-4`}>
                "{review.content}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className={`text-xs ${
                  templates[activeTemplate].name === "Minimal" 
                    ? "text-gray-600" 
                    : `text-${templates[activeTemplate].accent.split('-')[1]}-600`
                } font-medium`}>
                  Generated by Revilo
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewShowcase;