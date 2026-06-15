import api from './api';
import { toast } from 'react-hot-toast';
import {
  MOCK_CATEGORIES,
  MOCK_CUISINES,
  MOCK_MEALS,
  MOCK_MEAL_DETAILS
} from '../utils/mockData';

// Prevent duplicate offline toast alerts when page loads multiple queries simultaneously
let lastToastTime = 0;
function toastOfflineOnce() {
  const now = Date.now();
  if (now - lastToastTime > 6000) {
    lastToastTime = now;
    toast('Gourmet API offline. Loading cellar fallback recipes... 📴', {
      icon: '📴',
      style: {
        background: '#111216',
        color: '#ff8e3c',
        border: '1px solid rgba(249, 115, 22, 0.25)',
        fontWeight: 'bold',
      },
    });
  }
}

export const mealService = {
  // 1. Get a random recipe
  getRandomMeal: async () => {
    try {
      const response = await api.get('random.php');
      return response.data.meals?.[0] || null;
    } catch (error) {
      toastOfflineOnce();
      const keys = Object.keys(MOCK_MEAL_DETAILS);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      return MOCK_MEAL_DETAILS[randomKey];
    }
  },

  // 2. Search meals by name
  searchMeals: async (query = '') => {
    try {
      const response = await api.get(`search.php?s=${encodeURIComponent(query)}`);
      return response.data.meals || [];
    } catch (error) {
      toastOfflineOnce();
      if (!query.trim()) return MOCK_MEALS;
      const lower = query.toLowerCase();
      return MOCK_MEALS.filter(
        (m) =>
          m.strMeal.toLowerCase().includes(lower) ||
          m.strCategory.toLowerCase().includes(lower) ||
          m.strArea.toLowerCase().includes(lower)
      );
    }
  },

  // 3. Get all food categories
  getCategories: async () => {
    try {
      const response = await api.get('categories.php');
      return response.data.categories || [];
    } catch (error) {
      toastOfflineOnce();
      return MOCK_CATEGORIES;
    }
  },

  // 4. Filter meals by category name
  getMealsByCategory: async (category) => {
    try {
      const response = await api.get(`filter.php?c=${encodeURIComponent(category)}`);
      return response.data.meals || [];
    } catch (error) {
      toastOfflineOnce();
      if (!category) return MOCK_MEALS;
      return MOCK_MEALS.filter((m) => m.strCategory.toLowerCase() === category.toLowerCase());
    }
  },

  // 5. Get list of all cuisines (areas)
  getCuisines: async () => {
    try {
      const response = await api.get('list.php?a=list');
      return response.data.meals || [];
    } catch (error) {
      toastOfflineOnce();
      return MOCK_CUISINES;
    }
  },

  // 6. Filter meals by cuisine (area)
  getMealsByCuisine: async (area) => {
    try {
      const response = await api.get(`filter.php?a=${encodeURIComponent(area)}`);
      return response.data.meals || [];
    } catch (error) {
      toastOfflineOnce();
      if (!area) return MOCK_MEALS;
      return MOCK_MEALS.filter((m) => m.strArea.toLowerCase() === area.toLowerCase());
    }
  },

  // 7. Get details of a single meal by ID
  getMealDetails: async (id) => {
    try {
      const response = await api.get(`lookup.php?i=${encodeURIComponent(id)}`);
      return response.data.meals?.[0] || null;
    } catch (error) {
      toastOfflineOnce();
      return MOCK_MEAL_DETAILS[id] || MOCK_MEALS.find((m) => m.idMeal === id) || null;
    }
  },
};
