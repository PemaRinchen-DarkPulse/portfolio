import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import API_BASE_URL from '../../config/api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
          return;
        }
        
        // Check if token is expired
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          // Token expired, clean up and return
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
          return;
        }

        // Valid token, set auth headers
        axios.defaults.headers.common['x-auth-token'] = token;
        
        // Get user data
        const res = await axios.get(`${API_BASE_URL}/api/auth/me`);
        
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Auth check error:', err);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login action
  const login = (token) => {
    localStorage.setItem('token', token);
    
    try {
      const decoded = jwtDecode(token);
      
      setUser({
        id: decoded.id,
        email: decoded.email,
        isAdmin: decoded.isAdmin,
      });
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Token decode error:', error);
      logout();
    }
  };

  // Logout action
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};