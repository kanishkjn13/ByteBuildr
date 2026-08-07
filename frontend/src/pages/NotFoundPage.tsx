import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Search, Home, Mail, HelpCircle, ArrowRight } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to portfolio filtering or contact with query as project idea
      navigate(`${ROUTES.PORTFOLIO}?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | ByteBuilders</title>
        <meta name="description" content="The page you are looking for does not exist on ByteBuilders." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="not-found-container bg-[var(--bg-primary)]">
        {/* Animated Background Orbs */}
        <div className="glow-blob blob-blue" />
        <div className="glow-blob blob-cyan" />
        <div className="glow-blob blob-purple" />
        
        {/* AI Cyber Grid Background */}
        <div className="ai-grid-bg" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10 flex flex-col items-center">
          
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            
            {/* Left Side: Illustration Panel */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-5 flex justify-center order-2 lg:order-1"
            >
              <div className="code-box relative glass-panel">
                <div className="scanline" />
                <div className="code-header">
                  <div className="code-dot bg-rose-500" />
                  <div className="code-dot bg-amber-500" />
                  <div className="code-dot bg-emerald-500" />
                  <span className="text-[10px] font-mono text-slate-500 ml-2">error_handler.py</span>
                </div>
                <div className="code-body text-left">
                  <p className="text-blue-400">import <span className="text-purple-400">agency_router</span></p>
                  <p className="text-blue-400">import <span className="text-purple-400">sys</span></p>
                  <br />
                  <p className="text-slate-600"># Check server status</p>
                  <p className="text-blue-400">def <span className="text-amber-400">resolve_route</span>(path):</p>
                  <p className="pl-4 text-slate-400">request = agency_router.get(path)</p>
                  <p className="pl-4 text-blue-400">if <span className="text-slate-400">request.status == </span><span className="text-rose-400">404</span>:</p>
                  <p className="pl-8 text-emerald-400">print(<span className="text-rose-400">"Route not found!"</span>)</p>
                  <p className="pl-8 text-purple-400">return <span className="text-cyan-400">"SystemError: Page Null"</span></p>
                  <br />
                  <p className="text-blue-400">resolve_route(<span className="text-rose-400">"{window.location.pathname}"</span>)</p>
                  <p className="text-rose-400 font-bold mt-2 font-mono text-[9px] bg-rose-950/40 p-2 rounded-lg border border-rose-900/30">
                    &gt;&gt; SystemError: Page Null [404]
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Informative Text Panel */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="lg:col-span-7 text-center lg:text-left space-y-6 order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 neo-pill px-4 py-2 text-[10px] sm:text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold self-center lg:self-start bg-[var(--surface-recessed)] border border-[var(--border-light)]">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>ROUTE RESOLUTION FAILURE</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-5xl sm:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.05]">
                  404 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400">Error</span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                  Lost in the Neural Network?
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-lg font-medium mx-auto lg:mx-0">
                  The page you are looking for has been moved, deleted, or does not exist. Let's redirect you back to active nodes.
                </p>
              </div>

              {/* Interactive Search Field */}
              <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto lg:mx-0">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--surface-recessed)] text-xs font-medium text-[var(--text-primary)] py-3.5 pl-11 pr-24 rounded-2xl border border-[var(--border-light)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-4 focus:ring-blue-500/15 transition-all shadow-sm placeholder-[var(--text-tertiary)]"
                    placeholder="Search capabilities, projects..."
                    aria-label="Search website content"
                  />
                  <button
                    type="submit"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-[var(--accent-primary)] text-white text-[10px] font-bold py-1.5 px-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
                    aria-label="Submit search query"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to={ROUTES.HOME}
                  className="w-full sm:w-auto neo-btn neo-btn-accent text-xs py-3 px-6 justify-center font-extrabold shadow-lg rounded-full"
                  aria-label="Navigate back to Home"
                >
                  <Home className="w-4 h-4 shrink-0" />
                  <span>Return Home</span>
                </Link>

                <Link
                  to={ROUTES.CONTACT}
                  className="w-full sm:w-auto neo-btn text-xs py-3 px-6 justify-center font-extrabold border border-[var(--border-light)] bg-[var(--surface-recessed)] rounded-full gap-1.5"
                  aria-label="Navigate to Contact Us"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>Contact Architect</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </>
  );
};
