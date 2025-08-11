import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, requireRegistration = false }) => {
  const { user, loading, isRegistered } = useAuth();

  // Tampilkan loading saat mengecek status autentikasi
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center supabase-gradient-dark">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-green-400" />
          <p className="text-gray-400">Memeriksa status autentikasi...</p>
        </div>
      </div>
    );
  }

  // Jika user tidak login, redirect ke login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika memerlukan registrasi lengkap dan user belum registrasi
  if (requireRegistration && !isRegistered) {
    const currentStep = user.registration_step || 0;
    return <Navigate to={`/register/step/${currentStep + 1}`} replace />;
  }

  // Jika semua kondisi terpenuhi, tampilkan children
  return children;
};

export default ProtectedRoute;
