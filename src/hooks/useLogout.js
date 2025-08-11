import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const useLogout = (options = {}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);

  const {
    redirectTo = '/login',
    showAlert = true,
    clearCache = true,
    onSuccess = null,
    onError = null
  } = options;

  const performLogout = async () => {
    try {
      setIsLoggingOut(true);
      setError(null);

      // Clear additional cache data if specified
      if (clearCache) {
        // Clear specific items that might not be cleared by AuthContext
        localStorage.removeItem('userPreferences');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('searchHistory');
        localStorage.removeItem('filters');
        localStorage.removeItem('viewMode');
        localStorage.removeItem('selectedCategory');
        localStorage.removeItem('lastSearchTerm');
      }

      // Perform logout (AuthContext will handle most clearing)
      await logout();

      // Note: AuthContext already handles redirect, so we don't need to navigate here
      // But we can still call callbacks if needed
      if (onSuccess) {
        onSuccess();
      } else if (showAlert) {
        // Show success message (though user will be redirected anyway)
        console.log('Logout berhasil! Anda telah keluar dari aplikasi.');
      }

    } catch (err) {
      console.error('Logout failed:', err);
      setError(err.message || 'Terjadi kesalahan saat logout');

      // Call error callback if provided
      if (onError) {
        onError(err);
      } else if (showAlert) {
        // Show error message
        console.error(`Logout gagal: ${err.message || 'Terjadi kesalahan. Anda akan diarahkan ke halaman login.'}`);
      }

      // AuthContext will handle redirect even on error
    } finally {
      setIsLoggingOut(false);
    }
  };

  const confirmLogout = (message = 'Apakah Anda yakin ingin keluar?') => {
    if (window.confirm(message)) {
      performLogout();
    }
  };

  return {
    logout: performLogout,
    confirmLogout,
    isLoggingOut,
    error,
    clearError: () => setError(null)
  };
};

export default useLogout;
