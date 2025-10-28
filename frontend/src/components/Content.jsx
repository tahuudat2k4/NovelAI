import React from 'react';
import { Link } from 'react-router-dom';

const Content = () => {
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
        <Link to="/try" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
          Get Started →
        </Link>
      </section>

      {/* Features Grid */}
      <section id='about' className="px-4 py-16">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
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