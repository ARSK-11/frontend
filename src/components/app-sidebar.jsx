import { 
  Calendar, 
  Home, 
  Inbox, 
  Settings, 
  User,
  ShoppingBag,
  Users,
  Clock,
  Link,
  FileText,
  LogOut,
  Eye,
  ArrowLeft,
  Search,
  Sparkles,
  MapPin,
  Star,
  CreditCard,
  ChevronRight,
  Bell,
  FolderOpen,
  Activity,
  HelpCircle
} from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import LogoutButton from "./LogoutButton";
import { useState, useRef, useEffect } from "react";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Menu items yang sesuai dengan tema Itinari.ai
  const menuItems = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      route: "/dashboard"
    },
    {
      title: "Timeline",
      url: "/timeline",
      icon: Activity,
      route: "/timeline"
    },
    {
      title: "Directory",
      url: "/directory",
      icon: FolderOpen,
      route: "/directory"
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: Inbox,
      route: "/inbox"
    },
    {
      title: "About",
      url: "/about",
      icon: FileText,
      route: "/about"
    },
  ];

  // Tutup menu saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Tutup menu saat tekan Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [showUserMenu]);

  const handleMenuClick = (url) => {
    navigate(url);
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleMenuItemClick = (action) => {
    setShowUserMenu(false);
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'directory':
        navigate('/directory');
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'help':
        navigate('/help');
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
    <div className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 flex flex-col fixed left-0 top-0 h-screen z-50">
      {/* Logo dan Tombol Kembali */}
      <div className="p-3 border-b border-white/10">
        <div className="flex items-center">
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: "#313131" }}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-base text-white">Threadify</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {/* <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400 focus:border-[#313131]"
          />
        </div>
      </div> */}

      {/* Navigation Menu */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        <div className="space-y-1">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.route;
              const isCommunity = item.title === "Community" && location.pathname === "/";
              
              return (
                <Button
                  key={item.title}
                  onClick={() => handleMenuClick(item.url)}
                  variant="ghost"
                  className={`w-full justify-start px-3 py-2 rounded-[5px] transition-colors duration-150 ${
                    isActive || isCommunity
                      ? "bg-[#313131] text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  style={{
                    borderRadius: 5,
                    paddingLeft: 12,
                    paddingRight: 12,
                    paddingTop: 8,
                    paddingBottom: 8,
                    backgroundColor: (isActive || isCommunity) ? "#313131" : undefined
                  }}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.title}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-white/10" ref={menuRef}>
        <DropdownMenu open={showUserMenu} onOpenChange={setShowUserMenu}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-1.5 h-auto hover:bg-white/10 min-h-0">
              <div className="flex items-center space-x-2 w-full">
                <Avatar className="w-8 h-8">
                  {user?.image_url ? (
                    <AvatarImage src={user.image_url} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-[#313131] text-white">
                      {getInitials()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="text-xs font-medium truncate text-white">
                    {getDisplayName()}
                  </div>
                  <div className="text-[11px] text-gray-400 truncate">
                    {user?.email}
                  </div>
                  <div className="flex items-center mt-0.5">
                    <Badge 
                      variant={user?.is_registered ? "default" : "outline"}
                      className={`text-[10px] px-2 py-0.5 ${
                        user?.is_registered 
                          ? "bg-[#313131] text-white" 
                          : "bg-black/20 text-gray-400 border-white/10"
                      }`}
                    >
                      {user?.is_registered ? 'Registered' : 'Unregistered'}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-48 border-white/10 shadow-lg"
            align="end" 
            forceMount
            style={{ minWidth: 0, padding: 0, backgroundColor: "#18181b" }} // Memastikan background solid, tidak transparan
          >
            <DropdownMenuLabel className="font-normal px-3 py-2">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  {user?.image_url ? (
                    <AvatarImage src={user.image_url} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-[#313131] text-white">
                      {getInitials()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate text-white">
                    {getDisplayName()}
                  </p>
                  <p className="text-[11px] text-gray-400 truncate">
                    {user?.email}
                  </p>
                  <div className="flex items-center mt-0.5">
                    <Badge 
                      variant={user?.is_registered ? "default" : "outline"}
                      className={`text-[10px] px-2 py-0.5 ${
                        user?.is_registered 
                          ? "bg-[#313131] text-white" 
                          : "bg-black/20 text-gray-400 border-white/10"
                      }`}
                    >
                      {user?.is_registered ? 'Registered' : 'Unregistered'}
                    </Badge>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem onClick={() => handleMenuItemClick('profile')} className="text-white hover:bg-white/10 text-xs px-3 py-2">
              <User className="mr-2 h-4 w-4" />
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick('settings')} className="text-white hover:bg-white/10 text-xs px-3 py-2">
              <Settings className="mr-2 h-4 w-4" />
              Pengaturan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick('directory')} className="text-white hover:bg-white/10 text-xs px-3 py-2">
              <FileText className="mr-2 h-4 w-4" />
              Direktori Saya
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick('notifications')} className="text-white hover:bg-white/10 text-xs px-3 py-2">
              <Bell className="mr-2 h-4 w-4" />
              Notifikasi
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick('help')} className="text-white hover:bg-white/10 text-xs px-3 py-2">
              <HelpCircle className="mr-2 h-4 w-4" />
              Bantuan
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <LogoutButton
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-2"
              showIcon={true}
              showText={true}
              onLogoutSuccess={() => {
                console.log('Sidebar: Closing user menu on logout...');
                setShowUserMenu(false);
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}