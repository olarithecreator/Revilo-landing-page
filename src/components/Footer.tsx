import React from 'react';
import { Twitter, Instagram, Linkedin, Facebook, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-3xl font-serif italic text-purple-400 font-semibold">
                Revilo
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Transform social media comments into stunning, shareable review cards in seconds.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Twitter size={18} />, href: "/twitter" },
                { icon: <Instagram size={18} />, href: "/instagram" },
                { icon: <Linkedin size={18} />, href: "/linkedin" },
                { icon: <Facebook size={18} />, href: "/facebook" },
                { icon: <Github size={18} />, href: "/github" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-700 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "Templates", "Examples", "Integrations"].map((item) => (
                <li key={item}>
                  {item === "Templates" ? (
                    <Link to="/template" className="text-gray-400 hover:text-white transition-colors">{item}</Link>
                  ) : item === "Pricing" ? (
                    <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">{item}</Link>
                  ) : item === "Features" ? (
                    <Link to="/features" className="text-gray-400 hover:text-white transition-colors">{item}</Link>
                  ) : item === "Examples" ? (
                    <Link to="/examples" className="text-gray-400 hover:text-white transition-colors">{item}</Link>
                  ) : item === "Integrations" ? (
                    <Link to="/integrations" className="text-gray-400 hover:text-white transition-colors">{item}</Link>
                  ) : (
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">{item}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Documentation', 'API', 'Guides', 'Blog', 'Help Center'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              {['About', 'Careers', 'Contact', 'Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Revilo. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;