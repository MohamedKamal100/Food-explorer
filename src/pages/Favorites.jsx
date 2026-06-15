import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavoritesStore } from '../hooks/useFavorites';
import MealCard from '../components/ui/MealCard';

export default function Favorites() {
  const { favorites } = useFavoritesStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-bg pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-2 block">
              Curated Selection
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-black text-slate-100 tracking-tight flex items-center gap-3">
              Your Cookbook <ChefHat className="w-8 h-8 text-brand-gold" />
            </h1>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-sm font-medium">
            Manage your saved culinary findings. All favorites are stored locally in your browser.
          </p>
        </div>

        {/* Favorites List / Empty State */}
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel rounded-3xl border border-white/5 p-12 md:p-20 flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-8 animate-float">
              <Heart className="w-10 h-10 text-brand-orange" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-display font-black text-slate-200 mb-4 tracking-tight">
              Your Cookbook is Empty
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mb-8 font-medium">
              You haven't bookmarked any gourmet recipes yet. Tap the heart icon on any recipe card to start building your collection.
            </p>

            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-amber font-display font-semibold text-sm text-white hover:shadow-lg hover:shadow-brand-orange/20 transition-all duration-300"
            >
              <Compass className="w-4.5 h-4.5" />
              Discover Recipes
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {favorites.map((meal, index) => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
                index={index}
                defaultCategory={meal.strCategory}
                defaultArea={meal.strArea}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
