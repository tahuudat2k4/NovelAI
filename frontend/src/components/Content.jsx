import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Content = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleGetStartClick = () =>{
    setShowModal(true);
  }
  const handleOptionSelect = (path) =>{
    setShowModal(false);
    navigate(path);
  }
  return (
    <main className="pt-24 bg-gradient-to-b from-purple-950 to-slate-950">
      {/* Hero Section */}
      <section id='home' className="text-center px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome to NovelAI
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
          A comprehensive AI creative platform that helps you create unique content. From short stories and novels to images and videos, all with just a few clicks.
        </p>
       <button 
          onClick={handleGetStartClick}
          className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
        >
          Get Start →
        </button>
      </section>
       {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-purple-500/30 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Creation</h2>
            
            <div className="space-y-4">
              <button
                onClick={() => handleOptionSelect('/novel')}
                className="cursor-pointer w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Create Novel</h3>
                    <p className="text-sm text-white/80">Multi-chapter novels with coherent storylines</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleOptionSelect('/try')}
                className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Create Short Story</h3>
                    <p className="text-sm text-white/80">Quick and unique short stories</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Features Grid */}
      <section id='about' className="px-4 py-16">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          {/* Feature 0 - Novel Generation */}
          <div className="bg-slate-900/50 p-8 rounded-xl backdrop-blur-sm border border-green-500/20">
            <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Novel Generation</h3>
            <p className="text-gray-400">Create multi-chapter novels with coherent storylines. AI crafts a blueprint and writes each chapter maintaining continuity.</p>
          </div>
          {/* Feature 1 */}
          <div className="bg-slate-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
            <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Story Generation</h3>
            <p className="text-gray-400"> Create unique stories based on your requirements. AI will write stories according to your preferred style, genre, and content.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
            <div className="bg-fuchsia-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Image Generation</h3>
            <p className="text-gray-400">Generate beautiful images from text descriptions. Turn your ideas into unique artistic masterpieces.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-900/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20">
            <div className="bg-red-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Video Creation</h3>
            <p className="text-gray-400">Transform your ideas into dynamic videos. Create video content from text or images effortlessly.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="px-4 py-16 text-center bg-purple-900/20">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore the Power of AI?</h2>
        <p className="text-gray-300 mb-8">Start your creative journey today. NovelAI will accompany you in every creative project.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-purple-900/50 text-white px-6 py-3 rounded-lg font-medium border border-purple-500/30 hover:bg-purple-900/70 transition-all duration-200">
            ✨ Unlimited Creativity
          </button>
          <button className="bg-purple-900/50 text-white px-6 py-3 rounded-lg font-medium border border-purple-500/30 hover:bg-purple-900/70 transition-all duration-200">
            🚀 Fast Processing
          </button>
          <button className="bg-purple-900/50 text-white px-6 py-3 rounded-lg font-medium border border-purple-500/30 hover:bg-purple-900/70 transition-all duration-200">
            💎 High Quality
          </button>
        </div>
      </section>
    </main>
  );
};

export default Content;