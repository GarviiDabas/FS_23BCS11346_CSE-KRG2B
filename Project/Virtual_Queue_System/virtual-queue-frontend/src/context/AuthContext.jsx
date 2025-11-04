// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. CHECK FOR ID ON LOAD
    try {
      const token = localStorage.getItem('authToken');
      const userName = localStorage.getItem('userName');
      const userRole = localStorage.getItem('userRole');
      const userId = localStorage.getItem('userId'); // This is a STRING (e.g., "2")

      if (token && userName && userRole && userId) {
        
        // --- THIS IS THE FIX ---
        // We must convert the string "2" back into the number 2
        setUser({ id: Number(userId), name: userName, role: userRole }); 
        // --- END OF FIX ---

      }
    } catch (e) {
      console.error("Failed to load user from localStorage", e);
    }
    setLoading(false);
  }, []);

  // 2. LOGIN FUNCTION (This was already correct)
 // 2. UPDATE LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      
      const { token, name, role, id } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', name);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userId', id); 

      const user = { id, name, role };
      setUser(user);

      // --- ADD THIS LINE ---
      return user; // Return the user object on successful login
      // --- END OF FIX ---

    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // 3. LOGOUT FUNCTION (This was already correct)
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId'); 
    
    setUser(null);
  };

  const value = { user, isAuthenticated: !!user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};