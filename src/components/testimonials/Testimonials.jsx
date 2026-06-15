import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../../utils/constants';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="text-brand-orange text-xs font-bold tracking-widest uppercase">
            Platform Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-100 tracking-tight">
            Loved By Chefs Everywhere
          </h2>
          <div className="h-[2px] w-12 bg-brand-orange mt-2" />
          <p className="text-slate-400 text-sm max-w-md mt-2 leading-relaxed">
            Read what home cooks, professional foodies, and recipe designers say about Food Explorer Pro.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-brand-orange/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4 text-brand-gold">
                  {[...Array(5)].map((_, i) => {
                    const active = i < Math.floor(t.rating);
                    return (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${active ? 'fill-current' : 'text-slate-600'}`}
                      />
                    );
                  })}
                  <span className="text-xs font-bold text-slate-400 ml-1">{t.rating}</span>
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium italic">
                  "{t.review}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h4 className="font-display font-bold text-slate-200 text-sm">{t.name}</h4>
                  <p className="text-slate-500 text-[10px] font-semibold tracking-wider uppercase">
                    {t.country}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
