import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Compass, Search } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll Progress Indicator setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Smooth scroll handler for anchor links
  const handleAnchorClick = (e, targetId) => {
    if (location.pathname !== '/') return;
    
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-bg/85 backdrop-blur-md border-b border-dark-border py-4 shadow-lg shadow-black/20'
            : 'bg-transparent py-6'
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-orange to-brand-gold origin-left"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl font-display font-black tracking-tight flex items-center">
              <span className="text-gradient-orange-gold">Food</span>
              <span className="text-slate-100 group-hover:text-brand-gold transition-colors duration-200 ml-1">Explorer</span>
              <span className="text-brand-orange text-xs px-1.5 py-0.5 rounded-md border border-brand-orange/20 bg-brand-orange/10 font-bold tracking-wide uppercase ml-2">PRO</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm tracking-wide uppercase transition-colors hover:text-brand-orange ${
                  isActive && location.hash === '' ? 'text-brand-orange' : 'text-slate-400'
                }`
              }
            >
              Home
            </NavLink>

            <a
              href="#categories"
              onClick={(e) => handleAnchorClick(e, 'categories')}
              className="text-slate-400 hover:text-brand-orange text-sm tracking-wide uppercase transition-colors"
            >
              Categories
            </a>

            <a
              href="#search"
              onClick={(e) => handleAnchorClick(e, 'search')}
              className="text-slate-400 hover:text-brand-orange text-sm tracking-wide uppercase transition-colors"
            >
              Search
            </a>

            <a
              href="#cuisine"
              onClick={(e) => handleAnchorClick(e, 'cuisine')}
              className="text-slate-400 hover:text-brand-orange text-sm tracking-wide uppercase transition-colors"
            >
              Cuisine
            </a>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center gap-1.5 text-sm tracking-wide uppercase transition-colors hover:text-brand-orange ${
                  isActive ? 'text-brand-orange' : 'text-slate-400'
                }`
              }
            >
              <Heart className="w-4 h-4 fill-current" />
              Favorites
            </NavLink>
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/favorites"
              className="relative p-2.5 rounded-full border border-dark-border bg-dark-surface hover:border-brand-orange/30 hover:text-brand-orange transition-all duration-300"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <a
              href="#search"
              onClick={(e) => handleAnchorClick(e, 'search')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-amber font-display font-semibold text-sm text-white hover:shadow-lg hover:shadow-brand-orange/20 transition-all duration-300"
            >
              <Search className="w-4 h-4" />
              Explore Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-full border border-dark-border bg-dark-surface text-slate-300 hover:text-brand-orange transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[75px] left-0 right-0 z-40 bg-dark-bg/95 backdrop-blur-lg border-b border-dark-border py-8 px-6 flex flex-col gap-6 shadow-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-5 text-lg font-semibold">
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive && location.hash === '' ? 'text-brand-orange' : 'text-slate-400'
                }
              >
                Home
              </NavLink>

              <a
                href="#categories"
                onClick={(e) => {
                  setIsOpen(false);
                  handleAnchorClick(e, 'categories');
                }}
                className="text-slate-400 hover:text-brand-orange"
              >
                Categories
              </a>

              <a
                href="#search"
                onClick={(e) => {
                  setIsOpen(false);
                  handleAnchorClick(e, 'search');
                }}
                className="text-slate-400 hover:text-brand-orange"
              >
                Search
              </a>

              <a
                href="#cuisine"
                onClick={(e) => {
                  setIsOpen(false);
                  handleAnchorClick(e, 'cuisine');
                }}
                className="text-slate-400 hover:text-brand-orange"
              >
                Cuisine
              </a>

              <NavLink
                to="/favorites"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? 'text-brand-orange' : 'text-slate-400'}`
                }
              >
                <Heart className="w-5 h-5 fill-current" />
                Favorites
              </NavLink>
            </nav>

            <div className="h-[1px] bg-dark-border" />

            <div className="flex flex-col gap-3">
              <a
                href="#search"
                onClick={(e) => {
                  setIsOpen(false);
                  handleAnchorClick(e, 'search');
                }}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber font-display font-semibold text-white"
              >
                <Compass className="w-5 h-5" />
                Start Exploring
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
