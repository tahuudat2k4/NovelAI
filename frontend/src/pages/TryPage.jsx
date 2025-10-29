import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import InputForm from '../components/InputForm';
import logo from '../assets/logo/logo.png';
const TryPage = () => {
   const [activeTab, setActiveTab] = useState('input');

  return (
      <div className="min-h-screen bg-slate-950">
    <header className="fixed top-0 w-full bg-slate-900/50 border-b border-purple-500/20 shadow-lg z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
               <img src={logo} alt="logo" className="h-8 w-8 mr-2 mb-1" /> 
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">NovelAI</span>
            </Link>
          </div>

  
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-10">
            <a 
              href="https://github.com/tahuudat2k4/NovelAI"
              target='_blank'    
              className="text-white hover:text-indigo-600"
            >
              <svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <Link to="/" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
              ← Return Home 
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-indigo-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
     {/* Sidebar and Content Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed left-0 top-16 h-screen w-64 bg-slate-900/60 backdrop-blur-sm border-r border-purple-500/20">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('input')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeTab === 'input'
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-400'
                  }`}
                >
                  <div className="flex items-center cursor-pointer">
                    <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Input
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('storage')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeTab === 'storage'
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-400'
                  }`}
                >
                  <div className="flex items-center cursor-pointer">
                    <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Storage
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="h-screen ml-64 flex-1 p-8 pt-24 bg-gradient-to-l from-purple-950/50 to-slate-950 " >
          {activeTab === 'input' && (
            <div className="text-white">
              {/* Input content will go here */}
              <InputForm/>
            </div>
          )}
          {activeTab === 'storage' && (
            <div className="text-white">
              {/* Storage content will go here */}
            </div>
          )}
        </div>
      </div>
    </div>
     
   
  )
}

export default TryPage;
