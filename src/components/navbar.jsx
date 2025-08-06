import { 
  Search, 
  RefreshCw, 
  Settings, 
  Plus as PlusIcon,
  User,
  Bell,
  Globe,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  // Fungsi untuk refresh halaman
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm">example@gmail.com</span>
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="w-4 h-4" />
            <select className="bg-transparent border-none focus:ring-0 text-sm">
              <option>English (US)</option>
              <option>Bahasa Indonesia</option>
            </select>
            <span className="text-gray-400">•</span>
            <select className="bg-transparent border-none focus:ring-0 text-sm">
              <option>ID Rupiah (IDR)</option>
              <option>USD Dollar</option>
            </select>
          </div>

          {/* Notification Bell */}
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
            <Bell className="w-4 h-4" />
          </Button>

          {/* Tombol refresh yang bisa di-klik */}
          {/* <button
            onClick={handleRefresh}
            className="focus:outline-none"
            title="Refresh"
            aria-label="Refresh"
            type="button"
          >
            <RefreshCw className="w-5 h-5 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors" />
          </button> */}
          
          <Settings className="w-5 h-5 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors" />
          
          {/* New Access button */}
          {/* <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white shadow-sm">
            <PlusIcon className="w-4 h-4 mr-1" />
            New Access
          </Button> */}
          
          {/* User Profile */}
          {/* <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full shadow-sm cursor-pointer hover:shadow-md transition-shadow flex items-center justify-center">
              <span className="text-white font-medium text-sm">AF</span>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-900">Ananda Faris</div>
              <div className="text-xs text-gray-500">Free Account</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div> */}
        </div>
      </div>
    </header>
  )
}
