import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CTASection() {
  const handleJoinClick = () => {
    toast.success('Welcome aboard, Explorer! Account creation coming soon 🍽️', {
      style: {
        background: '#111216',
        color: '#e2e8f0',
        border: '1px solid rgba(249, 115, 22, 0.2)',
      },
    });
  };

  return (
    <section className="relative py-24 overflow-hidden border-t border-white/5">
      {/* Animated Mesh Gradient Background Wrapper */}
      <div className="absolute inset-0 z-0 mesh-gradient-bg" />
      
      {/* Visual lighting accents overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-dark-bg/60 z-0 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Logo overlay badge */}
          <div className="w-14 h-14 rounded-full bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center mb-2 animate-float">
            <ChefHat className="w-7 h-7 text-brand-orange" />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-slate-100 tracking-tight leading-tight">
            Start Your <span className="text-gradient-orange-gold">Culinary Journey</span> Today
          </h2>

          <p className="text-slate-350 text-base md:text-lg max-w-xl leading-relaxed font-medium">
            Join thousands of food lovers discovering authentic recipes, cooking methods, and cuisines from around the world.
          </p>

          <button
            onClick={handleJoinClick}
            className="flex items-center gap-2 px-8 py-4.5 rounded-full bg-gradient-to-r from-brand-orange via-brand-amber to-brand-gold text-white font-display font-bold text-sm uppercase tracking-wider shadow-[0_8px_30px_rgba(249,115,22,0.4)] hover:shadow-[0_8px_40px_rgba(249,115,22,0.65)] hover:scale-103 transition-all duration-300 cursor-pointer border border-white/10"
          >
            Join Free Explorer
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
