import axios from 'axios';

// 1. Create a configured instance of axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Your Spring Boot backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. This is the magic part: an "interceptor"
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