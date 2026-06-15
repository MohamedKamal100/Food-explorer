import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Globe, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';

import { motion } from 'framer-motion';
import { useMealDetails } from '../hooks/useMeals';
import { useFavoritesStore } from '../hooks/useFavorites';
import { getIngredients, getYoutubeEmbedUrl } from '../utils/helpers';
import { CUISINE_MAP } from '../utils/constants';

export default function MealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const { data: meal, isLoading, isError, error } = useMealDetails(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg pt-32 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-display font-medium tracking-wide">Loading gourmet details...</p>
      </div>
    );
  }

  if (isError || !meal) {
    return (
      <div className="min-h-screen bg-dark-bg pt-32 px-6 flex flex-col items-center justify-center">
        <AlertTriangle className="w-16 h-16 text-brand-red mb-6" />
        <h2 className="text-2xl font-display font-black text-slate-200 mb-2">Recipe Not Found</h2>
        <p className="text-slate-400 text-sm max-w-md text-center mb-8">
          {error?.message || "We couldn't retrieve the details for this dish. The recipe may have been removed or the connection failed."}
        </p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand-orange to-brand-amber font-display font-bold text-sm text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    );
  }

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

  const handleFavoriteToggle = () => {
    if (favorited) {
      removeFavorite(id);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-bg pb-24"
    >
      {/* Visual Hero Header */}
      <div className="relative h-[45vh] md:h-[60vh] w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Parallax mask overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/30 to-black/50" />

        {/* Floating Back Navigation & Heart toggle */}
        <div className="absolute top-28 left-0 right-0 z-10 px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4.5 py-2.5 rounded-full backdrop-blur-md bg-black/40 border border-white/10 hover:border-brand-orange/40 text-slate-300 hover:text-brand-orange transition-all duration-300 hover:-translate-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Back</span>
          </button>

          <button
            onClick={handleFavoriteToggle}
            className="p-3 rounded-full backdrop-blur-md bg-black/40 border border-white/10 hover:border-brand-orange/40 text-slate-300 hover:text-brand-orange transition-all duration-300 cursor-pointer"
            aria-label="Toggle favorite"
          >
            <Heart className={`w-5 h-5 ${favorited ? 'fill-brand-orange text-brand-orange scale-110' : ''}`} />
          </button>
        </div>

        {/* Heading Title overlay */}
        <div className="absolute bottom-10 left-0 right-0 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              {category && (
                <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md border border-brand-orange/30 bg-brand-orange/15 text-brand-orange">
                  {category}
                </span>
              )}
              {area && (
                <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-md border border-white/15 bg-white/15 text-slate-300">
                  {flag} {area}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-slate-100 tracking-tight leading-tight max-w-3xl">
              {name}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Ingredients Column (1/3) */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-1"
        >
          <div className="glass-panel rounded-3xl p-6 border border-white/5 sticky top-28">
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-white/5">
              <BookOpen className="w-5 h-5 text-brand-orange" />
              <h3 className="font-display font-bold text-slate-200 text-lg uppercase tracking-wider">
                Ingredients
              </h3>
            </div>

            <ul className="flex flex-col gap-3">
              {ingredients.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between py-3 px-4 rounded-xl border border-white/5 bg-white/[0.01] text-sm text-slate-300 hover:border-brand-orange/20 transition-all duration-300 hover:bg-white/[0.02]"
                >
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-md border border-brand-gold/15">
                    {item.measure}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Recipe & Video Column (2/3) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 flex flex-col gap-10"
        >
          {/* Instructions Box */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5">
            <div className="flex items-center gap-2.5 mb-8 pb-4 border-b border-white/5">
              <Globe className="w-5 h-5 text-brand-orange" />
              <h3 className="font-display font-bold text-slate-200 text-lg uppercase tracking-wider">
                Preparation Instructions
              </h3>
            </div>

            <div className="text-slate-300 leading-relaxed space-y-6 font-normal">
              {instructions
                ?.split('\r\n')
                .filter((para) => para.trim() !== '')
                .map((paragraph, index) => {
                  const cleaned = paragraph.replace(/^\d+\.\s*/, '');
                  return (
                    <div key={index} className="flex gap-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full border border-brand-orange/20 bg-brand-orange/10 text-brand-orange text-sm font-bold shrink-0 mt-0.5 shadow-sm">
                        {index + 1}
                      </span>
                      <p className="flex-1 text-sm md:text-base text-slate-300 pt-0.5">{cleaned}</p>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* YouTube Iframe Box */}
          {youtubeEmbedUrl && (
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5">
              <div className="flex items-center gap-2.5 mb-6">
                <FaYoutube className="w-6 h-6 text-brand-red" />
                <h3 className="font-display font-bold text-slate-200 text-lg uppercase tracking-wider">
                  Video Demonstration
                </h3>
              </div>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/5 bg-black shadow-lg">
                <iframe
                  src={youtubeEmbedUrl}
                  title={`${name} Demonstration`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
