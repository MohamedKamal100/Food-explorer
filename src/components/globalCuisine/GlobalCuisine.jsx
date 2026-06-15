import React, { useState } from 'react';
import { useCuisines, useMealsByCuisine } from '../../hooks/useMeals';
import { CUISINE_MAP } from '../../utils/constants';
import MealCard from '../ui/MealCard';
import SkeletonCard from '../ui/SkeletonCard';
import { Globe, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

// Curated list of top/popular cuisines to keep the layout extremely clean and premium
const FEATURED_CUISINES = [
  'Italian',
  'Mexican',
  'Japanese',
  'Indian',
  'French',
  'Thai',
  'Spanish',
  'Chinese',
  'Moroccan',
  'Greek',
  'American',
  'British',
];

export default function GlobalCuisine() {
  const [selectedCuisine, setSelectedCuisine] = useState('Italian');

  // Fetch cuisines list from API
  const { data: apiCuisines = [], isLoading: cuisinesLoading } = useCuisines();
  
  // Fetch meals for the selected cuisine
  const { data: cuisineMeals = [], isLoading: mealsLoading, isError } = useMealsByCuisine(selectedCuisine);

  // Limit display to 4 recipes for a clean, horizontal summary feel or compact grid
  const displayedMeals = cuisineMeals.slice(0, 4);

  // Filter API cuisines to match our featured cuisines list
  const cuisinesList = FEATURED_CUISINES.filter((name) =>
    apiCuisines.some((apiC) => apiC.strArea === name) || name === 'Italian' // Italian fallback
  );

  return (
    <section id="cuisine" className="py-24 bg-dark-surface border-b border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="text-brand-orange text-xs font-bold tracking-widest uppercase">
            Culinary Odyssey
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-100 tracking-tight">
            Gourmet Global Cuisine
          </h2>
          <div className="h-[2px] w-12 bg-brand-orange mt-2" />
          <p className="text-slate-400 text-sm max-w-md mt-2 leading-relaxed">
            Embark on a virtual taste tour. Discover local specialties and traditional recipes categorized by region.
          </p>
        </div>

        {/* Cuisine Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 max-w-4xl mx-auto">
          {cuisinesLoading ? (
            <div className="h-12 w-full flex items-center justify-center gap-2">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="h-10 w-24 rounded-full bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            cuisinesList.map((cuisine) => {
              const active = selectedCuisine === cuisine;
              const flag = CUISINE_MAP[cuisine]?.flag || '🌐';
              return (
                <motion.button
                  key={cuisine}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    active
                      ? 'border-brand-orange bg-brand-orange text-white shadow-[0_6px_20px_-5px_rgba(249,115,22,0.35)]'
                      : 'border-white/5 bg-dark-bg/60 hover:border-white/20 text-slate-300 hover:text-brand-orange hover:bg-white/[0.02]'
                  }`}
                >
                  <span className="text-base leading-none">{flag}</span>
                  <span>{cuisine}</span>
                </motion.button>
              );
            })
          )}
        </div>

        {/* Recipes Grid */}
        <div className="min-h-[350px]">
          
          {/* Loading Skeletons */}
          {mealsLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          )}

          {/* Error state */}
          {isError && !mealsLoading && (
            <div className="text-center py-12 glass-panel rounded-3xl border border-brand-red/10 p-8 max-w-md mx-auto">
              <p className="text-brand-red font-semibold mb-2">Could Not Fetch Cuisine</p>
              <p className="text-slate-400 text-sm">There was a network failure connecting to the server. Please check your network and try again.</p>
            </div>
          )}

          {/* Empty state */}
          {!mealsLoading && !isError && displayedMeals.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <Globe className="w-12 h-12 text-slate-500 mb-4 animate-spin" />
              <p className="text-slate-400 text-sm font-medium">Fetching recipes...</p>
            </div>
          )}

          {/* Grid display */}
          {!mealsLoading && !isError && displayedMeals.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedMeals.map((meal, index) => (
                <MealCard
                  key={meal.idMeal}
                  meal={meal}
                  index={index}
                  defaultArea={selectedCuisine}
                />
              ))}
            </div>
          )}
          
          {/* Explore More CTA */}
          {!mealsLoading && !isError && displayedMeals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={() => {
                  const event = new CustomEvent('search-trigger', { detail: selectedCuisine });
                  window.dispatchEvent(event);
                  document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-brand-orange transition-colors cursor-pointer"
              >
                <Compass className="w-4.5 h-4.5" />
                View all {selectedCuisine} recipes
              </button>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
