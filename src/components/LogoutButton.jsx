import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Loader2 } from 'lucide-react';

const LogoutButton = ({ 
  variant = "ghost", 
  size = "sm", 
  className = "", 
  showIcon = true,
  showText = true,
  onLogoutSuccess = null,
  onLogoutError = null
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      console.log('LogoutButton: Starting logout process...');
      setIsLoggingOut(true);
      
      // Call success callback if provided (before logout)
      if (onLogoutSuccess) {
        console.log('LogoutButton: Calling onLogoutSuccess callback...');
        onLogoutSuccess();
      }
      
      // Perform logout (AuthContext will handle redirect)
      console.log('LogoutButton: Calling AuthContext logout...');
      await logout();
      
      console.log('LogoutButton: Logout completed successfully');
      // Note: AuthContext already handles redirect, so we don't need to navigate here
    } catch (error) {
      console.error('LogoutButton: Logout error:', error);
      
      // Call error callback if provided
      if (onLogoutError) {
        onLogoutError(error);
      } else {
        // Default behavior: show error message
        console.error('Terjadi kesalahan saat logout. Anda akan diarahkan ke halaman login.');
      }
      
      // AuthContext will handle redirect even on error
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`text-red-600 hover:text-red-700 hover:bg-red-50 ${className}`}
      data-testid="logout-button"
    >
      {isLoggingOut ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : showIcon ? (
        <LogOut className="w-4 h-4 mr-2" />
      ) : null}
      {showText && (isLoggingOut ? 'Logging out...' : 'Logout')}
    </Button>
  );
};

export default LogoutButton;
