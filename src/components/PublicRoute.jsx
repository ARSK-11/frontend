import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

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

  // Jika user sudah login, redirect ke dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Jika user belum login, tampilkan children
  return children;
};

export default PublicRoute;
