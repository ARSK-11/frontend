import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useProtectedRoute = (requireRegistration = false) => {
  const { user, loading, isRegistered } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // User tidak login, redirect ke login
        navigate('/login');
        return;
      }

      if (requireRegistration && !isRegistered) {
        // User belum registrasi lengkap, redirect ke step registrasi
        const currentStep = user.registration_step || 0;
        navigate(`/register/step/${currentStep + 1}`);
        return;
      }
    }
  }, [user, loading, isRegistered, requireRegistration, navigate]);

  return {
    user,
    loading,
    isRegistered,
    isAuthenticated: !!user,
  };
};
