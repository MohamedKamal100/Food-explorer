import React, { useState } from 'react';
import Hero from '../components/hero/Hero';
import CategoriesExplorer from '../components/categories/CategoriesExplorer';
import FeaturedMeals from '../components/featuredMeals/FeaturedMeals';
import SmartSearch from '../components/search/SmartSearch';
import GlobalCuisine from '../components/globalCuisine/GlobalCuisine';
import Testimonials from '../components/testimonials/Testimonials';
import CTASection from '../components/cta/CTASection';
import { motion } from 'framer-motion';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-dark-bg"
    >
      {/* Cinematic Hero Header */}
      <Hero />

      {/* Categories Horizontal Carousel */}
      <CategoriesExplorer
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Grid of Featured / Filtered Recipes */}
      <FeaturedMeals selectedCategory={selectedCategory} />

      {/* Interactive Search Section */}
      <SmartSearch />

      {/* Cuisine Selector Tabs & Grid */}
      <GlobalCuisine />

      {/* Customer Testimonials Grid */}
      <Testimonials />

      {/* Animated Mesh Signup footer */}
      <CTASection />
    </motion.div>
  );
}
