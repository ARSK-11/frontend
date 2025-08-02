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
  Eye
} from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Menu items that correspond to existing routes
  const menuItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
      route: "/"
    },
    {
      title: "Shopping",
      url: "/",
      icon: ShoppingBag,
      route: "/"
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
    {
      title: "Try On",
      url: "/tryon",
      icon: User,
      route: "/tryon"
    }
  ];

  const handleMenuClick = (url) => {
    navigate(url);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="w-16 bg-black flex flex-col items-center py-4 space-y-6 fixed left-0 top-0 h-full z-50">
      {/* Logo */}
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <Eye className="w-6 h-6 text-black" />
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.route;
          const isShopping = item.title === "Shopping" && location.pathname === "/";
          
          return (
            <button
              key={item.title}
              onClick={() => handleMenuClick(item.url)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                isActive || isShopping
                  ? "text-black bg-white"
                  : "text-white hover:text-gray-300"
              }`}
              title={item.title}
            >
              <item.icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="mt-auto">
        <button 
          className="w-10 h-10 flex items-center justify-center text-white hover:text-gray-300"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}