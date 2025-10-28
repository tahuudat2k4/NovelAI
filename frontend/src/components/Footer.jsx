import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-950 text-white border-t border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 pb-3 pt-9">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */ }
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              NovelAI
            </h3>
            <p className="text-gray-300">
              Creating the future of storytelling with artificial intelligence.
            </p>
          </div>

          {/* Quick Links */ }
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={ () => scrollToSection('home') }
                  className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Home
                </button>
              </li>
              <li>
                <button onClick={ () => scrollToSection('about') }
                  className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  About
                </button>
              </li>
              <li>
                <button onClick={ () => scrollToSection('contact') }
                  className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors duration-200">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */ }
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="cursor-pointer flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <a href="https://facebook.com/novelai" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li className="cursor-pointer flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <a href="https://github.com/novelai" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+84 338447628</span>
              </li>
              <li className="cursor-pointer flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200">
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:novelai24@gmail.com">
                  novelai24@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */ }
        <div className="border-t border-purple-500/30 mt-8 pt-2 text-center">
          <p className="text-gray-300">
            © { new Date().getFullYear() } NovelAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;