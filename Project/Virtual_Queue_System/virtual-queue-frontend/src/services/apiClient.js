import axios from 'axios';

// 1. Get the API URL from environment variables (for Vercel)
//    and provide a fallback for local development (http://localhost:8080)
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api` || 'http://localhost:8080/api';
// 2. Create a configured instance of axios
const apiClient = axios.create({
  baseURL: API_BASE_URL, // Use the variable here
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3. This is the magic part: an "interceptor"
// This function runs BEFORE every request is sent
apiClient.interceptors.request.use(
  (config) => {
    // Get the auth token from local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;