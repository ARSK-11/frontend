import { 
  Search, 
  RefreshCw, 
  Settings, 
  Plus as PlusIcon,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* <Search className="w-5 h-5 text-gray-500" /> */}
          
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-4">
          <RefreshCw className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" />
          <Settings className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" />
          
          {/* New Access button */}
          <Button size="sm" className="bg-green-500 hover:bg-green-600 shadow-sm">
            <PlusIcon className="w-4 h-4 mr-1" />
            New Access
          </Button>
          
          {/* Single user avatar */}
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-sm cursor-pointer hover:shadow-md transition-shadow"></div>
        </div>
      </div>
    </header>
  )
}
