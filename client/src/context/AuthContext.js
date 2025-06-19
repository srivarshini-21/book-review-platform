import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem('token');
        setLoading(false);
      });
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  // Signup function
  const signup = async (credentials) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/signup', credentials, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      console.error('Signup error:', {
        request: err.config,
        response: err.response?.data
      });
      throw new Error(
        err.response?.data?.message || 
        'Signup failed. Please try again.'
      );
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/'); // Redirect to home/login
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};