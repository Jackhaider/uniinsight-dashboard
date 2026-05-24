import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch, API_URL } from '../utils/api';

const AuthContext = createContext();

export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  PARENT: 'parent',
  STUDENT: 'student'
};

import { mockFetch } from '../utils/mockApi';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await apiFetch('/users/me');
      if (response.ok) {
        const userData = await response.json();
        userData.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.role}`;
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('uniinsight_access_token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      let response;
      try {
        response = await fetch(`${API_URL}/auth/login/access-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        });
      } catch (networkError) {
        console.warn("Backend offline, using Mock Login!");
        response = await mockFetch('/auth/login/access-token', { method: 'POST' });
      }

      if (!response.ok) {
        setLoading(false);
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('uniinsight_access_token', data.access_token);
      localStorage.setItem('uniinsight_refresh_token', data.refresh_token);

      await fetchUser();
      return true;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('uniinsight_access_token');
    localStorage.removeItem('uniinsight_refresh_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
