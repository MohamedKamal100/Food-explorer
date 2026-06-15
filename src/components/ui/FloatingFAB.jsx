import React, { useState } from 'react';
import { Compass, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { mealService } from '../../services/mealService';
import MealModal from './MealModal';
import { toast } from 'react-hot-toast';

export default function FloatingFAB() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSurpriseClick = async () => {
    if (loading) return;
    setLoading(true);

    const toastId = toast.loading('Consulting our master chefs... 🎲', {
      style: {
        background: '#111216',
        color: '#e2e8f0',
        border: '1px solid rgba(249, 115, 22, 0.2)',
      },
    });

    try {
      const randomMeal = await mealService.getRandomMeal();
      if (randomMeal) {
        setMeal(randomMeal);
        setModalOpen(true);
        toast.dismiss(toastId);
      } else {
        toast.error('Could not fetch a recipe. Try again!', { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Try again!', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={handleSurpriseClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2.5 px-6 py-4 rounded-full bg-gradient-to-r from-brand-orange via-brand-amber to-brand-gold text-white font-display font-bold text-sm tracking-wide shadow-[0_8px_30px_rgb(249,115,22,0.35)] hover:shadow-[0_8px_35px_rgb(249,115,22,0.5)] animate-pulse-glow transition-all duration-300 border border-white/10 cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4.5 h-4.5 animate-spin" />
          ) : (
            <Compass className="w-4.5 h-4.5 animate-bounce" />
          )}
          <span>Surprise Me 🍽️</span>
        </motion.button>
      </div>

      {/* Render Modal */}
      <MealModal
        meal={meal}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
