const API_BASE_URL = import.meta.env.DEV 
  ? '' // Use proxy in development
  : (import.meta.env.VITE_API_URL || 'https://portfoliobackend-chi.vercel.app');

export default API_BASE_URL;
