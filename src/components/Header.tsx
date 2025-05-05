import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl font-serif italic text-purple-800 font-semibold">
            Revilo
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {[{label: 'Features', to: '/features'}, {label: 'How It Works', to: '/how-it-works'}, {label: 'Examples', to: '/examples'}, {label: 'Pricing', to: '/pricing'}, {label: 'FAQ', to: '/faq'}].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`text-base font-medium transition-colors ${
                isScrolled ? 'text-gray-800 hover:text-purple-700' : 'text-gray-800 hover:text-purple-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/pricing"
            className="text-white bg-purple-700 hover:bg-purple-800 px-5 py-2.5 rounded-lg transition-all"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            {[{label: 'Features', to: '/features'}, {label: 'How It Works', to: '/how-it-works'}, {label: 'Examples', to: '/examples'}, {label: 'Pricing', to: '/pricing'}, {label: 'FAQ', to: '/faq'}].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-gray-800 hover:text-purple-700 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/pricing"
              className="text-white bg-purple-700 hover:bg-purple-800 px-5 py-2.5 rounded-lg transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;