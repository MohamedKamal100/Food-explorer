import React, { useRef, useEffect } from 'react';
import { X, Heart, Globe, BookOpen } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';

import { motion, AnimatePresence } from 'framer-motion';
import { getIngredients, getYoutubeEmbedUrl } from '../../utils/helpers';
import { useFavoritesStore } from '../../hooks/useFavorites';
import { CUISINE_MAP } from '../../utils/constants';

export default function MealModal({ meal, isOpen, onClose }) {
  const modalRef = useRef(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!meal) return null;

  const id = meal.idMeal;
  const name = meal.strMeal;
  const image = meal.strMealThumb;
  const category = meal.strCategory;
  const area = meal.strArea;
  const instructions = meal.strInstructions;
  const youtube = meal.strYoutube;
  
  const favorited = isFavorite(id);
  const ingredients = getIngredients(meal);
  const youtubeEmbedUrl = getYoutubeEmbedUrl(youtube);
  const flag = CUISINE_MAP[area]?.flag || '🌐';

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (favorited) {
      removeFavorite(id);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            ref={modalRef}
            className="relative w-full max-w-4xl bg-dark-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[85vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-brand-orange/40 text-slate-300 hover:text-brand-orange transition-all duration-200 z-50 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              {/* Header Hero Section */}
              <div className="relative h-64 md:h-80 w-full bg-dark-bg">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/40 to-transparent" />
                
                {/* Header Text details */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-3">
                    {category && (
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-brand-orange/20 bg-brand-orange/15 text-brand-orange">
                        {category}
                      </span>
                    )}
                    {area && (
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-white/10 bg-white/10 text-slate-300">
                        {flag} {area}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-display font-black text-slate-100 tracking-tight leading-tight">
                    {name}
                  </h2>
                </div>
              </div>

              {/* Core Details Grid */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Ingredients Left Panel (1/3 width) */}
                <div className="md:col-span-1">
                  <div className="flex items-center gap-2 mb-5">
                    <BookOpen className="w-5 h-5 text-brand-orange" />
                    <h3 className="font-display font-bold text-slate-200 text-lg uppercase tracking-wider">
                      Ingredients
                    </h3>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {ingredients.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between py-2.5 px-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-sm text-slate-300"
                      >
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-md border border-brand-gold/15">
                          {item.measure}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions Right Panel (2/3 width) */}
                <div className="md:col-span-2 flex flex-col gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-5">
                      <Globe className="w-5 h-5 text-brand-orange" />
                      <h3 className="font-display font-bold text-slate-200 text-lg uppercase tracking-wider">
                        Cooking Instructions
                      </h3>
                    </div>
                    
                    {/* Formatted Paragraphs */}
                    <div className="text-slate-300 text-sm leading-relaxed space-y-4 font-normal">
                      {instructions
                        ?.split('\r\n')
                        .filter((para) => para.trim() !== '')
                        .map((paragraph, index) => {
                          // Clean potential numbers in the beginning
                          const cleaned = paragraph.replace(/^\d+\.\s*/, '');
                          return (
                            <div key={index} className="flex gap-4">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full border border-brand-orange/20 bg-brand-orange/10 text-brand-orange text-xs font-bold shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              <p className="flex-1">{cleaned}</p>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* YouTube Embed Container */}
                  {youtubeEmbedUrl && (
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <FaYoutube className="w-5 h-5 text-brand-red" />
                        <h3 className="font-display font-bold text-slate-200 text-lg uppercase tracking-wider">
                          Video Walkthrough
                        </h3>
                      </div>
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-black">
                        <iframe
                          src={youtubeEmbedUrl}
                          title={`${name} Walkthrough`}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="border-t border-white/5 bg-dark-bg/60 p-5 flex items-center justify-between shrink-0">
              <button
                onClick={handleFavoriteClick}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer ${
                  favorited
                    ? 'border-brand-orange bg-brand-orange text-white'
                    : 'border-white/10 bg-dark-surface hover:border-brand-orange/40 text-slate-300 hover:text-brand-orange'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                {favorited ? 'Favorited' : 'Add to Favorites'}
              </button>
              
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-bold tracking-wide transition-colors cursor-pointer"
              >
                Close recipe
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
