import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, Check, Camera, User, Upload, LogOut } from 'lucide-react';
import UserInfo from '@/components/UserInfo';
import apiService from '@/lib/api';
import useLogout from '@/hooks/useLogout';

// Komponen Step Indicator sederhana, step yang sudah dilewati jadi hijau
const SimpleStepIndicator = ({ currentStep }) => {
  const steps = [1, 2, 3];
  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((step, idx) => {
        let stepClass = '';
        if (step < currentStep) {
          stepClass = 'bg-green-500 text-white';
        } else if (step === currentStep) {
          stepClass = 'bg-primary text-primary-foreground';
        } else {
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

const RegisterStep3 = () => {
  const navigate = useNavigate();
  const { user, updateRegistrationStatus } = useAuth();
  const { loading: authLoading } = useProtectedRoute(false);
  const { logout, isLoggingOut } = useLogout();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File terlalu besar. Maksimal 5MB.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('File harus berupa gambar.');
        return;
      }
      setSelectedFile(file);
      setError('');
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (selectedFile) {
        // Gunakan endpoint private untuk menyimpan di folder private user
        await apiService.uploadProfileImagePrivate(selectedFile);
      }
      updateRegistrationStatus({
        ...user,
        is_registered: true,
        registration_step: 3,
      });
      navigate('/');
    } catch (error) {
      setError(error.message || 'Terjadi kesalahan saat menyimpan foto profil');
    } finally {
      setLoading(false);
    }
  };

  const handleUseGooglePhoto = async () => {
    setLoading(true);
    setError('');
    try {
      // Gunakan endpoint private untuk foto Google
      await apiService.useGooglePhotoPrivate();
      updateRegistrationStatus({
        ...user,
        is_registered: true,
        registration_step: 3,
      });
      navigate('/');
    } catch (error) {
      setError(error.message || 'Terjadi kesalahan saat menggunakan foto Google');
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
          <SimpleStepIndicator currentStep={3} />

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
              <p className="text-xs text-muted-foreground">Lengkapi foto profil Anda</p>
            </div>
          </div>

          <div>
            <CardTitle className="text-xl mb-2 flex items-center justify-center gap-2">
              <Camera className="w-5 h-5" />
              Upload Foto Profil
            </CardTitle>
            <CardDescription>Langkah 3 dari 3 - Langkah terakhir</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Upload Area */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Foto Profil</Label>
              
              {/* Preview Area */}
              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    {previewUrl ? (
                      <AvatarImage src={previewUrl} alt="Preview" />
                    ) : user?.image_url ? (
                      <AvatarImage src={user.image_url} alt="Current" />
                    ) : (
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        <Camera className="w-8 h-8" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {previewUrl && (
                    <Badge className="absolute -top-2 -right-2 bg-green-500 text-white">
                      <Check className="w-3 h-3" />
                    </Badge>
                  )}
                </div>
              </div>

              {/* Upload Options */}
              <div className="space-y-3">
                {/* Drag & Drop Area */}
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Klik atau drag & drop file gambar
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maksimal 5MB (JPG, PNG, GIF)
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {/* Use Google Photo Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleUseGooglePhoto}
                  disabled={loading}
                  className="w-full"
                >
                  <User className="mr-2 h-4 w-4" />
                  Gunakan Foto Google
                </Button>
              </div>
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
                onClick={() => navigate('/register/step/2')}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    Selesai
                    <Check className="ml-2 h-4 w-4" />
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

export default RegisterStep3;
