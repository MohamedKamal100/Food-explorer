import React from 'react';
import { useMealsByCategory, useSearchMeals } from '../../hooks/useMeals';
import MealCard from '../ui/MealCard';
import SkeletonCard from '../ui/SkeletonCard';
import { ChefHat } from 'lucide-react';

export default function FeaturedMeals({ selectedCategory }) {
  // If category is selected, filter by category; otherwise search for 'chicken' (popular default)
  const isCategoryFilter = !!selectedCategory;
  
  const categoryQuery = useMealsByCategory(selectedCategory);
  const defaultQuery = useSearchMeals('chicken', { enabled: !isCategoryFilter });

  const query = isCategoryFilter ? categoryQuery : defaultQuery;
  const { data: meals = [], isLoading, isError } = query;

  // Limit display to 8 items for premium clean layouts
  const displayedMeals = meals.slice(0, 8);

  return (
    <section className="py-20 bg-dark-surface border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-2 block">
              Curated Selection
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-100 tracking-tight flex items-center gap-3">
              {selectedCategory ? `${selectedCategory} Specialties` : 'Chef\'s Signatures'}
              {!selectedCategory && <ChefHat className="w-8 h-8 text-brand-gold animate-float" />}
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-sm font-medium">
            {selectedCategory
              ? `Discover authentic recipes belonging to the ${selectedCategory} culinary family.`
              : 'Browse our highly-rated popular dishes recommended by culinary experts.'}
          </p>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="text-center py-12 glass-panel rounded-3xl border border-brand-red/10 p-8 max-w-md mx-auto">
            <p className="text-brand-red font-semibold mb-2">Network Error</p>
            <p className="text-slate-400 text-sm">Could not retrieve recipes from TheMealDB. Please check your connection or reload the page.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && displayedMeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-base">No recipes found for this selection.</p>
          </div>
        )}

        {/* Grid List */}
        {!isLoading && !isError && displayedMeals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedMeals.map((meal, index) => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
                index={index}
                defaultCategory={selectedCategory}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
