import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/logo.png';
import NovelInputForm from '../components/NovelInputForm';
import NovelView from '../components/NovelView';
import NovelList from '../components/NovelList';

const NovelPage = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [currentNovel, setCurrentNovel] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'create', 'view'

  const handleNovelCreated = (novel) => {
    setCurrentNovel(novel);
    setView('view');
  };

  const handleViewNovel = (novel) => {
    setCurrentNovel(novel);
    setView('view');
  };

  const handleBack = () => {
    setCurrentNovel(null);
    setView('list');
    setActiveTab('library');
  };

  const renderContent = () => {
    if (view === 'view' && currentNovel) {
      return <NovelView novel={currentNovel} onBack={handleBack} />;
    }

    if (activeTab === 'create') {
      return <NovelInputForm onNovelCreated={handleNovelCreated} />;
    }

    if (activeTab === 'library') {
      return <NovelList onViewNovel={handleViewNovel} />;
    }

    return null;
  };

  return (
    <div className="min-h-full bg-slate-950">
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-900/50 border-b border-purple-500/20 shadow-lg z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="logo" className="h-8 w-8 mr-2 mb-1" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  NovelAI
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              <a
                href="https://github.com/tahuudat2k4/NovelAI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-indigo-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <Link
                to="/"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                ← Return Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        {view !== 'view' && (
          <div className="fixed left-0 top-16 h-screen w-64 bg-slate-900/60 backdrop-blur-sm border-r border-purple-500/20">
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('create')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeTab === 'create'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-400'
                    }`}
                  >
                    <div className="flex items-center cursor-pointer">
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Create Novel
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('library')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeTab === 'library'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-400'
                    }`}
                  >
                    <div className="flex items-center cursor-pointer">
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Novel Library
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 p-8 pt-20 bg-gradient-to-l from-purple-950/50 to-slate-950 ${view !== 'view' ? 'ml-64' : ''}`}>
          <div className="text-white w-full min-h-screen">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelPage;