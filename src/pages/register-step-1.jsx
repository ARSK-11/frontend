import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, ArrowRight, User, LogOut } from 'lucide-react';
// StepIndicator dan UserInfo tetap dipakai
import StepIndicator from '@/components/StepIndicator';
import UserInfo from '@/components/UserInfo';
import apiService from '@/lib/api';
import useLogout from '@/hooks/useLogout';

// Komponen Step Indicator sederhana, tapi tetap menampilkan angka di dalam bulatan
const SimpleStepIndicator = ({ currentStep }) => {
  // 3 step, tampilkan bulatan kecil dan garis sederhana, bulatan berisi angka step
  const steps = [1, 2, 3];
  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
              currentStep === step
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            } border-2 border-background shadow-sm`}
          >
            {step}
          </div>
          {idx < steps.length - 1 && (
            <div className="w-8 h-0.5 bg-muted mx-2" />
          )}
        </div>
      ))}
    </div>
  );
};

const RegisterStep1 = () => {
  const navigate = useNavigate();
  const { user, updateRegistrationStatus } = useAuth();
  const { loading: authLoading } = useProtectedRoute(false); // Tidak perlu registrasi penuh
  const { logout, isLoggingOut } = useLogout();
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiService.updateName(formData.first_name, formData.last_name);
      updateRegistrationStatus({ ...user, first_name: formData.first_name, last_name: formData.last_name, registration_step: 1 });
      navigate('/register/step/2');
    } catch (error) {
      setError(error.message || 'Terjadi kesalahan saat menyimpan nama');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen supabase-gradient-dark">
        <Card className="w-96 supabase-gradient-card">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-green-400" />
              <p className="text-gray-400">Memverifikasi autentikasi...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen supabase-gradient-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md supabase-gradient-card">
        <CardHeader className="text-center pb-6">
          {/* Step Indicator sederhana */}
          <SimpleStepIndicator currentStep={1} />

          {/* User Info */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Avatar className="w-12 h-12">
              {user?.image_url ? (
                <AvatarImage src={user.image_url} alt="Profile" />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="w-6 h-6" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-left">
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Lengkapi data diri Anda</p>
            </div>
          </div>

          <div>
            <CardTitle className="text-lg mb-2">Masukkan Nama Lengkap</CardTitle>
            <CardDescription>Langkah 1 dari 3</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="first_name" className="text-sm font-medium">
                Nama Depan
              </Label>
              <Input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
                className="h-11"
                placeholder="Masukkan nama depan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name" className="text-sm font-medium">
                Nama Belakang
              </Label>
              <Input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
                className="h-11"
                placeholder="Masukkan nama belakang"
              />
            </div>

            {error && (
              <div className="text-destructive text-sm text-center bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            {/* Tombol Lanjutkan */}
            <Button
              type="submit"
              disabled={loading || !formData.first_name.trim() || !formData.last_name.trim()}
              className="w-full h-9"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  Lanjutkan ke Step 2
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <Separator />

          <div className="text-center space-y-3">
            <Button
              variant="outline"
              onClick={logout}
              disabled={isLoggingOut}
              className="w-full"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">Keluar dari proses registrasi</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterStep1;
