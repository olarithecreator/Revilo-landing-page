import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span className="ml-6 flex-shrink-0 text-purple-600">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 pr-12">
          <p className="text-base text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);
  
  const faqItems = [
    {
      question: "How does Revilo access my social media accounts?",
      answer: "Revilo uses secure OAuth authentication to connect to your social media accounts. We only access public comments and reviews with your permission, and we never post without your explicit consent."
    },
    {
      question: "Can I customize the design of my review cards?",
      answer: "Absolutely! Revilo offers various templates that you can customize with your brand colors, fonts, and logo. You can also adjust layouts and visual elements to match your brand identity perfectly."
    },
    {
      question: "How many social media platforms does Revilo support?",
      answer: "Revilo currently supports Instagram. We are actively expanding our platform to include Twitter, Facebook, LinkedIn, TikTok, and Google Reviews based on user feedback."
    },
    {
      question: "Is there a limit to how many review cards I can create?",
      answer: "Free accounts can create 3 cards per month. Our paid plans offer unlimited review card creation along with additional features like advanced customization, scheduled posting, and analytics."
    },
    {
      question: "Can I share my review cards directly to social media?",
      answer: "Yes! Revilo allows you to share your created review cards directly to connected social media platforms. You can also download them as images for use in your marketing materials, website, or email campaigns."
    },
    {
      question: "Does Revilo offer any AI tools to help identify the best comments?",
      answer: "Yes, our AI-powered comment analysis automatically identifies your most impactful and positive reviews, saving you time from manually searching through all your comments."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-purple-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-purple-700">Questions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about Revilo and transforming your social comments.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200">
              {faqItems.map((item, index) => (
                <FaqItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link 
              to="/contact" 
              className="inline-flex items-center text-purple-700 font-medium hover:text-purple-800 transition-colors"
            >
              Contact our support team
              <ChevronDown className="ml-1 transform rotate-90" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;