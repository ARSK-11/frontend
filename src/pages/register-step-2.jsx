import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowRight, ArrowLeft, User, MapPin, LogOut } from 'lucide-react';
import UserInfo from '@/components/UserInfo';
import apiService from '@/lib/api';
import useLogout from '@/hooks/useLogout';

// Komponen Step Indicator sederhana, dengan step yang sudah dilewati menjadi hijau
const SimpleStepIndicator = ({ currentStep }) => {
  const steps = [1, 2, 3];
  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((step, idx) => {
        let stepClass = '';
        if (step < currentStep) {
          // Step yang sudah dilewati, hijau
          stepClass = 'bg-green-500 text-white';
        } else if (step === currentStep) {
          // Step aktif, biru
          stepClass = 'bg-primary text-primary-foreground';
        } else {
          // Step belum dilewati, abu
          stepClass = 'bg-muted text-muted-foreground';
        }
        return (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${stepClass} border-2 border-background shadow-sm`}
            >
              {step}
            </div>
            {idx < steps.length - 1 && (
              <div className="w-8 h-0.5 bg-muted mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
};

const RegisterStep2 = () => {
  const navigate = useNavigate();
  const { user, updateRegistrationStatus } = useAuth();
  const { loading: authLoading } = useProtectedRoute(false); // Tidak perlu registrasi penuh
  const { logout, isLoggingOut } = useLogout();
  const [address, setAddress] = useState(user?.address || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiService.updateAddress(address);
      updateRegistrationStatus({ ...user, address, registration_step: 2 });
      navigate('/register/step/3');
    } catch (error) {
      setError(error.message || 'Terjadi kesalahan saat menyimpan alamat');
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
          <SimpleStepIndicator currentStep={2} />

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
              <p className="text-xs text-muted-foreground">Lengkapi alamat Anda</p>
            </div>
          </div>

          <div>
            <CardTitle className="text-xl mb-2 flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              Masukkan Alamat
            </CardTitle>
            <CardDescription>Langkah 2 dari 3</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">
                Alamat Lengkap
              </Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="min-h-[100px] resize-none"
                placeholder="Masukkan alamat lengkap Anda..."
              />
            </div>

            {error && (
              <div className="text-destructive text-sm text-center bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/register/step/1')}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
              <Button
                type="submit"
                disabled={loading || !address.trim()}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    Lanjutkan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
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

export default RegisterStep2;
