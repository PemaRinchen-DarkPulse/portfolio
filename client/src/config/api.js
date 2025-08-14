const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:5000' // Use local server in development
  : (import.meta.env.VITE_API_URL || 'https://portfoliobackend-chi.vercel.app');

export default API_BASE_URL;
