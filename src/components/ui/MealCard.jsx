import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavoritesStore } from '../../hooks/useFavorites';
import { CUISINE_MAP } from '../../utils/constants';

export default function MealCard({ meal, index = 0, defaultCategory = '', defaultArea = '' }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  
  const id = meal.idMeal;
  const name = meal.strMeal;
  const image = meal.strMealThumb;
  const category = meal.strCategory || defaultCategory;
  const area = meal.strArea || defaultArea;

  const favorited = isFavorite(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      removeFavorite(id);
    } else {
      addFavorite(meal);
    }
  };

  // Extract flag from CUISINE_MAP if area matches
  const flag = CUISINE_MAP[area]?.flag || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex flex-col justify-between glass-panel rounded-2xl p-4 border border-white/5 hover:border-brand-orange/30 transition-all duration-300 hover:shadow-[0_12px_45px_-12px_rgba(249,115,22,0.18)]"
    >
      {/* Upper/Visual container */}
      <div>
        {/* Image Container with Hover zoom and Favorites toggle */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-dark-bg">
          <img
            src={`${image}/preview`} // Using preview size to optimize bandwidth and speed up loading
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />

          {/* Heart Toggle Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md bg-black/40 border border-white/10 hover:border-brand-orange/40 text-slate-300 hover:text-brand-orange hover:scale-110 transition-all duration-200 z-10"
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-300 ${
                favorited ? 'fill-brand-orange text-brand-orange scale-110' : 'text-slate-300'
              }`}
            />
          </button>

          {/* Steam animation overlay */}
          <div className="absolute bottom-2 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="flex gap-1.5 items-end justify-center mb-1">
              <span className="w-[2px] h-3 bg-white/20 rounded-full animate-steam" style={{ animationDelay: '0.1s' }} />
              <span className="w-[2px] h-5 bg-white/30 rounded-full animate-steam" style={{ animationDelay: '0.4s' }} />
              <span className="w-[2px] h-4 bg-white/20 rounded-full animate-steam" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>

        {/* Badges / Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {category && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border border-brand-orange/10 bg-brand-orange/5 text-brand-orange">
              {category}
            </span>
          )}
          {area && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border border-white/5 bg-white/5 text-slate-400">
              {flag} {area}
            </span>
          )}
        </div>

        {/* Meal Title */}
        <h3 className="font-display font-bold text-slate-100 text-lg mb-4 line-clamp-1 group-hover:text-brand-gold transition-colors">
          {name}
        </h3>
      </div>

      {/* Action CTA */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
        <Link
          to={`/meal/${id}`}
          className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-slate-400 group-hover:text-brand-orange transition-colors"
        >
          View Recipe
          <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
