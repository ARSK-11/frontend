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
  Bell
} from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Menu items yang sesuai dengan tema Itinari.ai
  const menuItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
      route: "/"
    },
    {
      title: "Shop",
      url: "/shop",
      icon: ShoppingBag,
      route: "/shop"
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

  const handleMenuClick = (url) => {
    navigate(url);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 h-screen z-50">
      {/* Logo and Back Button */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Fashion.ai</span>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="space-y-1">
          <div className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
            Menu
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.route;
              const isCommunity = item.title === "Community" && location.pathname === "/";
              
              return (
                <button
                  key={item.title}
                  onClick={() => handleMenuClick(item.url)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActive || isCommunity
                      ? "text-blue-600 bg-blue-50 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activities */}
        {/* <div className="mt-8 space-y-1">
          <div className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
            Last 7 days
          </div>
          <div className="space-y-1">
            <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              5 Days in Japan - Spring Collection
            </div>
            <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              Solo Fashion Trip to Seoul
            </div>
            <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              Budget Adventure Collection
            </div>
          </div>
        </div> */}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">AF</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Ananda Faris</div>
            <div className="text-xs text-gray-500">Free Account</div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  )
}