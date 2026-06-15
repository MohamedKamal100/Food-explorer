import { useQuery } from '@tanstack/react-query';
import { mealService } from '../services/mealService';

// 1. Fetch a random meal
export function useRandomMeal(options = {}) {
  return useQuery({
    queryKey: ['randomMeal'],
    queryFn: mealService.getRandomMeal,
    refetchOnWindowFocus: false,
    ...options,
  });
}

// 2. Search meals by name with custom config (e.g. debounced query)
export function useSearchMeals(query, options = {}) {
  return useQuery({
    queryKey: ['searchMeals', query],
    queryFn: () => mealService.searchMeals(query),
    enabled: typeof query === 'string',
    ...options,
  });
}

// 3. Fetch all categories
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: mealService.getCategories,
    staleTime: 1000 * 60 * 60, // 1 hour caching
  });
}

// 4. Fetch meals by category
export function useMealsByCategory(category) {
  return useQuery({
    queryKey: ['mealsByCategory', category],
    queryFn: () => mealService.getMealsByCategory(category),
    enabled: !!category,
  });
}

// 5. Fetch all cuisines (areas)
export function useCuisines() {
  return useQuery({
    queryKey: ['cuisines'],
    queryFn: mealService.getCuisines,
    staleTime: 1000 * 60 * 60, // 1 hour caching
  });
}

// 6. Fetch meals by cuisine (area)
export function useMealsByCuisine(cuisine) {
  return useQuery({
    queryKey: ['mealsByCuisine', cuisine],
    queryFn: () => mealService.getMealsByCuisine(cuisine),
    enabled: !!cuisine,
  });
}

// 7. Fetch single meal details by ID
export function useMealDetails(id) {
  return useQuery({
    queryKey: ['mealDetails', id],
    queryFn: () => mealService.getMealDetails(id),
    enabled: !!id,
  });
}
