"use client";
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const signup = async (username, email, password, role) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, { username, email, password, role });
      if (response.status === 201) {
        await login(username, password);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, { username, password });
      if (response.status === 200) {
        Cookies.set('token', response.data.token); // Store token in cookies
        setUser(response.data.user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`; // Set default authorization header
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('/api/auth/logout');
      if (response.status === 200) {
        setUser(null);
        Cookies.remove('token');
        delete axios.defaults.headers.common['Authorization']; // Remove default authorization header
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const checkAuth = async () => {
    try {
      const token = Cookies.get('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/checkAuth`);
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error during auth check:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
