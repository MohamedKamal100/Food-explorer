import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import { useCategories } from '../../hooks/useMeals';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

export default function CategoriesExplorer({ selectedCategory, onSelectCategory }) {
  const { data: categories = [], isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="flex gap-4 overflow-x-hidden w-full max-w-7xl px-6">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="w-48 h-36 shrink-0 rounded-2xl bg-white/5 animate-pulse border border-white/5"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) return null;

  return (
    <section id="categories" className="py-20 bg-dark-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="text-brand-orange text-xs font-bold tracking-widest uppercase">
            Curated Menus
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-100 tracking-tight">
            Explore by Category
          </h2>
          <div className="h-[2px] w-12 bg-brand-orange mt-2" />
          <p className="text-slate-400 text-sm max-w-md mt-2 leading-relaxed">
            Click on any gourmet category below to instantly filter our catalog of recipes.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="relative px-2 py-4">
          <Swiper
            modules={[Navigation, Pagination, FreeMode]}
            spaceBetween={20}
            slidesPerView={1}
            freeMode={true}
            navigation={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              320: { slidesPerView: 1.5, spaceBetween: 15 },
              480: { slidesPerView: 2.2, spaceBetween: 15 },
              768: { slidesPerView: 3.5, spaceBetween: 20 },
              1024: { slidesPerView: 4.5, spaceBetween: 20 },
              1280: { slidesPerView: 5.5, spaceBetween: 24 },
            }}
            className="w-full pb-14"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat.strCategory;
              return (
                <SwiperSlide key={cat.idCategory}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectCategory(cat.strCategory)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      active
                        ? 'bg-gradient-to-br from-brand-orange/20 to-brand-gold/10 border-brand-orange shadow-[0_8px_30px_rgba(249,115,22,0.15)]'
                        : 'glass-panel border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Category Image */}
                    <div className="w-24 h-20 mx-auto mb-4 overflow-hidden rounded-xl bg-white/[0.02]">
                      <img
                        src={cat.strCategoryThumb}
                        alt={cat.strCategory}
                        className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                      />
                    </div>

                    {/* Category Title */}
                    <h3 className={`font-display font-bold text-center text-base transition-colors ${
                      active ? 'text-brand-orange' : 'text-slate-200'
                    }`}>
                      {cat.strCategory}
                    </h3>
                  </motion.button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
