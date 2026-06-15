import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1/',
  timeout: 5000, // 5 seconds connection threshold
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to extract data automatically
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Request Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
