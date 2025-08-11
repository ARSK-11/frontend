import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Shield,
  Bell,
  HelpCircle,
  FileText
} from 'lucide-react';
import LogoutButton from './LogoutButton';

const UserMenu = ({ 
  showUserInfo = true,
  showProfile = true,
  showSettings = true,
  showNotifications = true,
  showHelp = true,
  showLogout = true,
  className = ""
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu when pressing Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (action) => {
    setIsOpen(false);
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'help':
        navigate('/help');
        break;
      case 'directory':
        navigate('/directory');
        break;
      default:
        break;
    }
  };

  const getDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user?.first_name) {
      return user.first_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    if (user?.first_name) {
      return user.first_name[0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* User Profile Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleMenuClick}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          {user?.image_url ? (
            <img 
              src={user.image_url} 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-blue-600">
              {getInitials()}
            </span>
          )}
        </div>
        
        {/* User Name */}
        <span className="hidden md:block text-sm font-medium">
          {getDisplayName()}
        </span>
        
        {/* Chevron Icon */}
        <ChevronRight 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-90' : ''
          }`} 
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info Section */}
          {showUserInfo && (
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  {user?.image_url ? (
                    <img 
                      src={user.image_url} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-blue-600">
                      {getInitials()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {getDisplayName()}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                  <div className="flex items-center mt-1">
                    <Badge 
                      variant={user?.is_registered ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {user?.is_registered ? 'Registered' : 'Unregistered'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="py-1">
            {showProfile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMenuItemClick('profile')}
                className="w-full justify-start text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <User className="w-4 h-4 mr-3" />
                Profile
              </Button>
            )}

            {showSettings && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMenuItemClick('settings')}
                className="w-full justify-start text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMenuItemClick('directory')}
              className="w-full justify-start text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              <FileText className="w-4 h-4 mr-3" />
              My Directory
            </Button>

            {showNotifications && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMenuItemClick('notifications')}
                className="w-full justify-start text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <Bell className="w-4 h-4 mr-3" />
                Notifications
              </Button>
            )}

            {showHelp && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMenuItemClick('help')}
                className="w-full justify-start text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <HelpCircle className="w-4 h-4 mr-3" />
                Help & Support
              </Button>
            )}
          </div>

          {/* Logout Section */}
          {showLogout && (
            <div className="border-t border-gray-100 pt-1">
              <LogoutButton
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm"
                showIcon={true}
                showText={true}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
