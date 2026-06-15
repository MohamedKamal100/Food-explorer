import React, { useState, useEffect } from 'react';
import { useSearchMeals } from '../../hooks/useMeals';
import { useDebounce } from '../../hooks/useSearch';
import { Search, Utensils, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MealCard from '../ui/MealCard';
import SkeletonCard from '../ui/SkeletonCard';
import MealModal from '../ui/MealModal';

export default function SmartSearch() {
  const [query, setQuery] = useState('');
  const [activeMeal, setActiveMeal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  // Fetch meals based on debounced query
  const { data: searchResults = [], isLoading, isError } = useSearchMeals(debouncedQuery, {
    enabled: debouncedQuery.trim().length > 0,
  });

  // Coordinate search value from the Hero's search submit
  useEffect(() => {
    const handleHeroSearch = (e) => {
      if (e.detail) {
        setQuery(e.detail);
      }
    };
    window.addEventListener('search-trigger', handleHeroSearch);
    return () => window.removeEventListener('search-trigger', handleHeroSearch);
  }, []);

  const handleClear = () => {
    setQuery('');
  };

  const showPlaceholder = query.trim().length === 0;
  const noResults = !isLoading && !isError && debouncedQuery.trim().length > 0 && searchResults.length === 0;

  return (
    <>
      <section id="search" className="py-24 bg-dark-bg scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-3 mb-16">
            <span className="text-brand-orange text-xs font-bold tracking-widest uppercase">
              Smart Locator
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-100 tracking-tight">
              Real-time Gourmet Search
            </h2>
            <div className="h-[2px] w-12 bg-brand-orange mt-2" />
            <p className="text-slate-400 text-sm max-w-md mt-2 leading-relaxed">
              Query our databases instantly. Explore recipe directions, ingredients lists, and media walkthroughs.
            </p>
          </div>

          {/* Search Input Box */}
          <div className="max-w-xl mx-auto mb-16 relative">
            <div className="absolute inset-0 bg-brand-orange/5 rounded-2xl blur-md pointer-events-none" />
            <div className="relative flex items-center glass-panel rounded-2xl border border-white/5 focus-within:border-brand-orange/45 transition-colors duration-300">
              <Search className="w-5 h-5 text-slate-500 ml-4.5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by meal name (e.g. 'Beef', 'Soup', 'Cake')..."
                className="w-full bg-transparent border-none text-slate-100 placeholder:text-slate-500 py-4.5 px-4 focus:outline-none text-sm font-medium"
              />
              <AnimatePresence>
                {query.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleClear}
                    className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-brand-orange mr-3 transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Suggestion List (Popover dropdown when typing) */}
            <AnimatePresence>
              {!isLoading && query.trim().length > 0 && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-3 glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-30 max-h-60 overflow-y-auto custom-scrollbar"
                >
                  <div className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-dark-bg/60 border-b border-white/5">
                    Match results suggestion
                  </div>
                  <ul>
                    {searchResults.slice(0, 5).map((meal) => (
                      <li key={meal.idMeal}>
                        <button
                          onClick={() => {
                            setActiveMeal(meal);
                            setModalOpen(true);
                          }}
                          className="w-full flex items-center justify-between text-left px-5 py-3 hover:bg-white/[0.04] transition-colors border-b border-white/[0.03] last:border-0 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={`${meal.strMealThumb}/preview`}
                              alt={meal.strMeal}
                              className="w-8 h-8 rounded-lg object-cover bg-dark-bg"
                            />
                            <div>
                              <p className="text-slate-200 text-sm font-bold line-clamp-1">{meal.strMeal}</p>
                              <p className="text-slate-400 text-xs">{meal.strCategory} • {meal.strArea}</p>
                            </div>
                          </div>
                          <span className="flex items-center gap-1 text-[10px] font-bold text-brand-orange uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-3.5 h-3.5" /> View
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Area */}
          <div className="min-h-[200px]">
            
            {/* Show Placeholder */}
            {showPlaceholder && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Utensils className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-slate-400 text-sm font-medium">Type a search query above to browse matching recipes.</p>
              </motion.div>
            )}

            {/* Skeletons while Loading */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, idx) => (
                  <SkeletonCard key={idx} />
                ))}
              </div>
            )}

            {/* No Results Empty State */}
            {noResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center max-w-sm mx-auto glass-panel rounded-3xl p-8 border border-white/5"
              >
                <div className="w-16 h-16 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-6 animate-pulse">
                  <X className="w-7 h-7 text-brand-red" />
                </div>
                <h3 className="text-lg font-display font-bold text-slate-200 mb-2">No Recipes Found</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  We couldn't find any dishes matching "{query}". Try checking your spelling or search for common ingredients like 'chicken', 'pasta', or 'cake'.
                </p>
              </motion.div>
            )}

            {/* Render Results Grid */}
            {!isLoading && !showPlaceholder && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {searchResults.map((meal, index) => (
                  <MealCard key={meal.idMeal} meal={meal} index={index} />
                ))}
              </motion.div>
            )}

          </div>

        </div>
      </section>

      {/* Suggestion Popover Modal */}
      <MealModal
        meal={activeMeal}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
