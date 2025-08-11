import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '@/lib/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const userData = await apiService.getCurrentUser();
      setUser(userData.user);
      
      // Check registration status if user is logged in
      if (userData.user) {
        const regStatus = await apiService.getRegistrationStatus();
        setRegistrationStatus(regStatus.user);
      }
    } catch (error) {
      console.log('User not authenticated:', error.message);
      setUser(null);
      setRegistrationStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      await apiService.loginWithGoogle();
      // After successful login, check auth status to update user state
      await checkAuthStatus();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Starting logout process...');
      
      // Call backend logout API first
      console.log('Calling backend logout API...');
      const logoutResponse = await apiService.logout();
      console.log('Backend logout response:', logoutResponse);
      
      // Clear all local storage and session storage
      console.log('Clearing localStorage and sessionStorage...');
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear specific cache items
      localStorage.removeItem('clothingCache');
      localStorage.removeItem('clothingCacheTimestamp');
      localStorage.removeItem('userPreferences');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('searchHistory');
      localStorage.removeItem('filters');
      
      // Clear cookies (if any)
      console.log('Clearing cookies...');
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
      
      // Clear any other browser storage
      if (window.indexedDB) {
        console.log('Clearing IndexedDB...');
        const databases = await window.indexedDB.databases();
        databases.forEach(db => {
          window.indexedDB.deleteDatabase(db.name);
        });
      }
      
      // Clear service worker cache if exists
      if ('serviceWorker' in navigator) {
        console.log('Clearing service workers...');
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let registration of registrations) {
          await registration.unregister();
        }
      }
      
      // Clear cache storage if exists
      if ('caches' in window) {
        console.log('Clearing cache storage...');
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      
      // Clear React state
      console.log('Clearing React state...');
      setUser(null);
      setRegistrationStatus(null);
      
      console.log('Logout completed successfully');
      
      // Force page reload to clear all memory and redirect
      console.log('Redirecting to login page...');
      window.location.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      
      // Even if API call fails, clear local data and redirect
      console.log('Fallback: clearing local data and redirecting...');
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      setRegistrationStatus(null);
      window.location.replace('/login');
      
      throw error;
    }
  };

  const updateRegistrationStatus = (status) => {
    setRegistrationStatus(status);
  };

  const value = {
    user,
    loading,
    registrationStatus,
    login,
    logout,
    checkAuthStatus,
    updateRegistrationStatus,
    isAuthenticated: !!user,
    isRegistered: registrationStatus?.is_registered || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
