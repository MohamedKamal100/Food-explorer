import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      // Add a meal to favorites
      addFavorite: (meal) => {
        const { favorites } = get();
        if (favorites.some((fav) => fav.idMeal === meal.idMeal)) return;

        set({ favorites: [...favorites, meal] });
        toast.success(`"${meal.strMeal}" saved to favorites! 🧡`, {
          style: {
            background: '#111216',
            color: '#e2e8f0',
            border: '1px solid rgba(249, 115, 22, 0.2)',
          },
        });
      },

      // Remove a meal from favorites
      removeFavorite: (idMeal) => {
        const { favorites } = get();
        const meal = favorites.find((fav) => fav.idMeal === idMeal);
        if (!meal) return;

        set({ favorites: favorites.filter((fav) => fav.idMeal !== idMeal) });
        toast.success(`Removed "${meal.strMeal}" from favorites`, {
          style: {
            background: '#111216',
            color: '#e2e8f0',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          },
        });
      },

      // Check if a meal is favorited
      isFavorite: (idMeal) => {
        return get().favorites.some((fav) => fav.idMeal === idMeal);
      },
    }),
    {
      name: 'food-explorer-favorites', // Key for localStorage
    }
  )
);
