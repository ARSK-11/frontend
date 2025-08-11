import { 
  Settings, 
  Bell,
  Globe,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  // Fungsi untuk refresh halaman
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="bg-black/50 backdrop-blur-xl border-b border-white/10 px-3 py-2 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Kiri */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="font-bold text-base text-white">Threadify</span>
          </div>
          <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-400 border-green-500/20 px-2 py-0.5">
            Free
          </Badge>
        </div>
        
        {/* Kanan */}
        <div className="flex items-center space-x-2">
          {/* Pilihan Bahasa */}
          <div className="flex items-center space-x-1">
            <Globe className="w-3 h-3 text-gray-400" />
            <Select defaultValue="en">
              <SelectTrigger className="w-24 h-8 bg-black/20 border-white/10 text-xs text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10 text-xs">
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="id">ID</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tombol Feedback */}
          <Button variant="outline" size="xs" className="bg-black/20 border-white/10 text-xs text-white hover:bg-white/10 px-2 py-1 h-8">
            Feedback
          </Button>

          {/* Notifikasi */}
          <Button variant="ghost" size="xs" className="relative text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0">
            <Bell className="w-3.5 h-3.5" />
            <Badge className="absolute -top-1 -right-1 h-3 w-3 p-0 text-[9px] bg-green-500">3</Badge>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="xs" className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0">
            <Settings className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
