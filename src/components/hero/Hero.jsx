import React, { useState } from 'react';
import { Compass, Search, Sparkles, ArrowDown, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRandomMeal } from '../../hooks/useMeals';
import MealModal from '../ui/MealModal';

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: featuredMeal, isLoading, refetch } = useRandomMeal();
  const [searchValue, setSearchValue] = useState('');

  const handleExploreClick = (e) => {
    e.preventDefault();
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    // Dispatch custom event to coordinate search state with SmartSearch component
    const event = new CustomEvent('search-trigger', { detail: searchValue });
    window.dispatchEvent(event);

    document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRandomClick = () => {
    if (featuredMeal) {
      setModalOpen(true);
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden bg-dark-bg">
        {/* Parallax / Cinematic Background Image with Dark Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1920&auto=format&fit=crop"
            alt="Cinematic cooking background"
            className="w-full h-full object-cover scale-105 filter brightness-[0.25] contrast-[1.1] blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/40 via-dark-bg/60 to-dark-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/80 via-transparent to-dark-bg/80" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-gold/10 rounded-full filter blur-[150px] pointer-events-none" />

        {/* Floating food elements (visual details) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 hidden md:block">
          {[
            { label: '🍕', top: '15%', left: '10%', delay: 0, scale: 0.8 },
            { label: '🥑', top: '75%', left: '8%', delay: 2, scale: 1.1 },
            { label: '🍅', top: '25%', right: '12%', delay: 1, scale: 0.9 },
            { label: '🌶️', top: '70%', right: '15%', delay: 3, scale: 1.2 },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 0 }}
              animate={{ y: [-15, 15, -15] }}
              transition={{
                duration: 6,
                delay: item.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: item.top,
                left: item.left,
                right: item.right,
                fontSize: '2rem',
                opacity: 0.45,
                filter: 'blur(0.5px)',
                transform: `scale(${item.scale})`,
              }}
            >
              {item.label}
            </motion.div>
          ))}
        </div>

        {/* Main Grid Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-20">
          {/* Text content side (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/10 w-fit"
            >
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-brand-gold">
                Premium Food Discovery Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-100 leading-[1.05]"
            >
              Discover Recipes <br />
              <span className="text-gradient-orange-gold">From Around</span> <br />
              The World
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-350 text-base md:text-lg max-w-xl leading-relaxed font-medium"
            >
              Explore thousands of recipes, gourmet cuisines, and cooking inspirations from every corner of the globe. Powered by real-time culinary data.
            </motion.p>

            {/* Interactive Search Bar */}
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative max-w-lg mt-2 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-gold rounded-2xl opacity-10 group-focus-within:opacity-20 blur-md transition-opacity duration-300 pointer-events-none" />
              <div className="relative flex items-center glass-panel rounded-2xl border border-white/10 group-focus-within:border-brand-orange/50 transition-colors duration-300">
                <Search className="w-5 h-5 text-slate-400 ml-4 group-focus-within:text-brand-orange transition-colors" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search recipes, ingredients or areas..."
                  className="w-full bg-transparent border-none text-slate-100 placeholder:text-slate-500 py-4.5 px-3 focus:outline-none text-sm font-medium"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 mr-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-display font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-brand-orange/25 transition-all duration-300 cursor-pointer"
                >
                  Search
                </button>
              </div>
            </motion.form>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mt-4"
            >
              <button
                onClick={handleExploreClick}
                className="flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber font-display font-bold text-sm tracking-wide text-white hover:shadow-xl hover:shadow-brand-orange/20 transition-all duration-300 cursor-pointer"
              >
                <Compass className="w-4.5 h-4.5" />
                Explore Meals
              </button>

              <button
                onClick={handleRandomClick}
                className="flex items-center gap-2 px-7 py-4 rounded-xl border border-white/10 bg-white/5 hover:border-brand-orange/40 hover:bg-white/[0.08] text-slate-200 hover:text-brand-orange font-display font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                Get Random Recipe
              </button>
            </motion.div>
          </div>

          {/* Featured recipe card side (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            {!isLoading && featuredMeal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
                animate={{ opacity: 1, scale: 1, rotate: -1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.4 }}
                whileHover={{ y: -6, rotate: 0 }}
                onClick={() => setModalOpen(true)}
                className="glass-panel border border-white/5 rounded-3xl p-5 w-full max-w-[340px] cursor-pointer hover:border-brand-orange/30 hover:shadow-[0_20px_50px_rgba(249,115,22,0.12)] transition-all duration-300 animate-float"
              >
                {/* Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-dark-bg">
                  <img
                    src={featuredMeal.strMealThumb}
                    alt={featuredMeal.strMeal}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-brand-orange/30 bg-brand-orange/80 text-white">
                    Recipe of the day
                  </span>
                </div>

                {/* Details */}
                <span className="text-[10px] font-bold tracking-wider uppercase text-brand-orange">
                  {featuredMeal.strCategory} • {featuredMeal.strArea}
                </span>
                <h3 className="font-display font-bold text-slate-100 text-lg leading-tight mt-1 mb-2 line-clamp-1">
                  {featuredMeal.strMeal}
                </h3>
                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                  {featuredMeal.strInstructions}
                </p>

                {/* CTA Link */}
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange">
                  View Recipe details →
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Scroll Indicator Chevron */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center pointer-events-none">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-1 opacity-60 text-slate-500 font-bold"
          >
            <span className="text-[10px] tracking-widest uppercase">Scroll Down</span>
            <ArrowDown className="w-4 h-4 text-brand-orange" />
          </motion.div>
        </div>
      </section>

      {/* Hero Featured Meal Modal */}
      <MealModal
        meal={featuredMeal}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
