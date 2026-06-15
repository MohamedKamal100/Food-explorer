/**
 * Extracts and pairs ingredients and measurements from a flat MealDB API object.
 * @param {object} meal The meal object from the API.
 * @returns {Array<{id: number, name: string, measure: string}>} Array of ingredient-measure pairs.
 */
export function getIngredients(meal) {
  if (!meal) return [];
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim() !== '') {
      ingredients.push({
        id: i,
        name: name.trim(),
        measure: measure ? measure.trim() : '',
      });
    }
  }
  return ingredients;
}

/**
 * Converts a standard YouTube link from the API into a safe embeddable URL.
 * @param {string} url The youtube link (e.g., watch?v=...)
 * @returns {string} Safe iframe source URL.
 */
export function getYoutubeEmbedUrl(url) {
  if (!url) return '';
  let videoId = '';
  try {
    if (url.includes('v=')) {
      const parts = url.split('v=');
      if (parts[1]) {
        videoId = parts[1].split('&')[0];
      }
    } else if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/');
      if (parts[1]) {
        videoId = parts[1].split('?')[0];
      }
    } else if (url.includes('embed/')) {
      const parts = url.split('embed/');
      if (parts[1]) {
        videoId = parts[1].split('?')[0];
      }
    }
  } catch (error) {
    console.error('Failed to parse YouTube URL:', error);
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0` : '';
}
