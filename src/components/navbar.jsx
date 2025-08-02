import { 
  Search, 
  RefreshCw, 
  Settings, 
  Plus as PlusIcon,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  // Fungsi untuk refresh halaman
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="bg-white border-b border-black px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* <Search className="w-5 h-5 text-black" /> */}
          <span className="text-black">
            example@gmail.com
          </span>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Tombol refresh yang bisa di-klik */}
          <button
            onClick={handleRefresh}
            className="focus:outline-none"
            title="Refresh"
            aria-label="Refresh"
            type="button"
          >
            <RefreshCw className="w-5 h-5 text-black hover:text-gray-600 cursor-pointer transition-colors" />
          </button>
          <Settings className="w-5 h-5 text-black hover:text-gray-600 cursor-pointer transition-colors" />
          
          {/* New Access button */}
          <Button size="sm" className="bg-black hover:bg-gray-800 text-white shadow-sm">
            <PlusIcon className="w-4 h-4 mr-1" />
            New Access
          </Button>
          
          {/* Single user avatar */}
          <div className="w-8 h-8 bg-black rounded-full shadow-sm cursor-pointer hover:shadow-md transition-shadow"></div>
        </div>
      </div>
    </header>
  )
}
