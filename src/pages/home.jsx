import "../App.css";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  ChevronRight,
  Download,
  Sparkles,
  Search,
  Filter,
  Grid3X3,
  List,
  RefreshCw,
  Database,
  Globe,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Star,
  Eye,
  MessageCircle,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from "@/contexts/AuthContext";

const API_BASE = "https://backend2-1-t2fh.onrender.com";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clothingItems, setClothingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [isFromCache, setIsFromCache] = useState(false);

  useEffect(() => {
    // Check if we have cached data first
    const cachedData = localStorage.getItem('clothingCache');
    const cacheTimestamp = localStorage.getItem('clothingCacheTimestamp');
    const now = Date.now();
    const cacheAge = now - (cacheTimestamp ? parseInt(cacheTimestamp) : 0);
    const cacheValid = cacheAge < 30 * 60 * 1000; // 30 minutes cache

    if (cachedData && cacheValid) {
      try {
        const parsedData = JSON.parse(cachedData);
        setClothingItems(parsedData);
        setLoading(false);
        setIsFromCache(true);
        console.log('Data loaded from cache');
      } catch (err) {
        console.error('Error parsing cached data:', err);
        fetchClothingItems();
      }
    } else {
      // Show loading screen only if no valid cache
      setShowLoadingScreen(true);
      fetchClothingItems();
    }
    // eslint-disable-next-line
  }, []);

  const fetchClothingItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/clothing`);
      const data = await response.json();
      if (data.success) {
        setClothingItems(data.data);
        setIsFromCache(false);
        // Cache the data
        localStorage.setItem('clothingCache', JSON.stringify(data.data));
        localStorage.setItem('clothingCacheTimestamp', Date.now().toString());
        console.log('Data cached successfully');
      } else {
        // Try to use cached data if server fails
        const cachedData = localStorage.getItem('clothingCache');
        if (cachedData) {
          try {
            const parsedData = JSON.parse(cachedData);
            setClothingItems(parsedData);
            setIsFromCache(true);
            console.log('Using cached data due to server error');
          } catch (err) {
            setError('Gagal memuat data pakaian');
          }
        } else {
          setError('Gagal memuat data pakaian');
        }
      }
    } catch (error) {
      console.error('Error fetching clothing items:', error);
      // Try to use cached data if network fails
      const cachedData = localStorage.getItem('clothingCache');
              if (cachedData) {
          try {
            const parsedData = JSON.parse(cachedData);
            setClothingItems(parsedData);
            setIsFromCache(true);
            console.log('Using cached data due to network error');
          } catch (err) {
          setError('Gagal memuat data pakaian');
          }
        } else {
        setError('Gagal memuat data pakaian');
        }
    } finally {
      setLoading(false);
      setShowLoadingScreen(false);
    }
  };

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        return prevCart.map(cartItem =>
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
        );
    } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
  };

  const clearCache = () => {
    localStorage.removeItem('clothingCache');
    localStorage.removeItem('clothingCacheTimestamp');
    setIsFromCache(false);
  };

  const refreshData = () => {
    clearCache();
    fetchClothingItems();
  };

  // Filter items based on search term and selected category
  const filteredItems = clothingItems.filter(item => {
    const matchesSearch = item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
      item.desc.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });



  if (showLoadingScreen) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen supabase-gradient-dark">
        <div className="w-full max-w-md pt-6">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-white">
              Memuat koleksi pakaian...
            </div>
            
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>

            <div className="space-y-3">
              <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
                <div className="bg-green-400 h-full rounded-full animate-pulse relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 animate-pulse"></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-400 font-medium">
                Mohon tunggu sebentar
              </div>
            </div>
            
            <Badge variant="outline" className="text-xs bg-black/20 text-gray-400 border-white/10">
              Mengambil data terbaru dari server
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen supabase-gradient-dark">
        <Card className="w-full max-w-md supabase-gradient-card" style={{ borderRadius: "5px" }}>
          <CardContent className="pt-6 text-center space-y-6">
            <div className="text-red-400 text-6xl">⚠️</div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Oops! Terjadi Kesalahan</h3>
              <p className="text-gray-400">{error}</p>
            </div>
            <Button onClick={fetchClothingItems} variant="outline" className="w-full bg-black/20 text-gray-300 border-white/10 hover:bg-white/10">
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

    return (
    <div className="p-6 supabase-gradient-dark min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-white">
              Dashboard - Selamat Datang, {user?.first_name || user?.email || 'User'}!
            </h1>
            <p className="text-gray-400 mb-6">
              Explore, share & connect with fellow fashion enthusiasts. Discover the latest trends and manage your private files.
            </p>
          </div>
          
          {/* User Status */}
          <div className="flex items-center space-x-4">
            <Badge variant={user?.is_registered ? "default" : "outline"} className={user?.is_registered ? "bg-green-500 text-white" : "bg-black/20 text-gray-400 border-white/10"}>
              {user?.is_registered ? 'Registered' : 'Unregistered'}
            </Badge>
            {isFromCache && (
              <Badge variant="outline" className="text-xs bg-black/20 text-gray-400 border-white/10">
                From Cache
              </Badge>
            )}
          </div>
        </div>
        
        {/* Search and Create */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Best time to visit fashion stores?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 h-12 text-lg bg-black/20 border-white/10 text-white placeholder-gray-400 focus:border-green-500"
            />
          </div>
          <Button 
            size="lg" 
            className="h-12 w-12 p-0 rounded-full supabase-gradient hover:opacity-90"
          >
            <Search className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {/* Featured Discussions Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Featured Discussions</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Most Recent</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshData}
              className="text-gray-400 hover:text-green-400 hover:bg-white/10"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { id: "all", label: "All Products", count: clothingItems.length },
            { id: "shirt", label: "Shirts", count: clothingItems.filter(item => item.desc.toLowerCase().includes('shirt')).length },
            { id: "pants", label: "Pants", count: clothingItems.filter(item => item.desc.toLowerCase().includes('pants')).length },
            { id: "dress", label: "Dresses", count: clothingItems.filter(item => item.desc.toLowerCase().includes('dress')).length },
            { id: "shoes", label: "Shoes", count: clothingItems.filter(item => item.desc.toLowerCase().includes('shoes')).length },
            { id: "batik", label: "Batik", count: clothingItems.filter(item => item.desc.toLowerCase().includes('batik')).length }
          ].map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className={`rounded-full ${
                selectedCategory === category.id 
                  ? "supabase-gradient text-white" 
                  : "bg-black/20 text-gray-300 border-white/10 hover:bg-white/10"
              }`}
            >
              {category.label}
              <Badge variant={selectedCategory === category.id ? "secondary" : "outline"} className={`ml-2 text-xs ${
                selectedCategory === category.id 
                  ? "bg-white/20 text-white" 
                  : "bg-black/20 text-gray-400 border-white/10"
              }`}>
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "supabase-gradient text-white" : "bg-black/20 text-gray-300 border-white/10 hover:bg-white/10"}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "supabase-gradient text-white" : "bg-black/20 text-gray-300 border-white/10 hover:bg-white/10"}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
          {filteredItems.map((item, index) => {
            const isNew = index % 5 === 0;
            const price = (Math.floor(100 + Math.random() * 900) * 10).toLocaleString('id-ID');
            const replies = Math.floor(Math.random() * 100) + 10;
            const views = Math.floor(Math.random() * 5000) + 500;
            const lastReply = Math.floor(Math.random() * 24) + 1;
            const stock = Math.floor(Math.random() * 200) + 50;
            
            if (viewMode === "list") {
              return (
                <Card key={index} className="transition-all duration-200" style={{ borderRadius: "5px" }}>
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-48 h-32 relative">
                        <img
                          src={`${API_BASE}/uploads/${item.image}`}
                          alt={item.desc}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden absolute inset-0 bg-muted items-center justify-center" style={{ display: 'none' }}>
                          <div className="text-center text-muted-foreground">
                            <div className="text-2xl mb-2">🖼️</div>
                            <p className="text-sm">Image not available</p>
                          </div>
                        </div>
                        {isNew && (
                          <Badge className="absolute top-2 right-2 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1 p-6 flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary" className="text-xs">Fashion</Badge>
                          </div>
                          <h3 className="font-bold text-xl mb-2">{item.desc}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {replies} replies
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {views.toLocaleString()} views
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {lastReply} hours ago
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="font-bold text-2xl text-primary">Rp {price}</span>
                            <Badge variant="outline">Stock: {stock}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button 
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => navigate('/tryon', { state: { selectedClothing: item } })}
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Try On
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }

                        return (
              <Card key={index} className="transition-all duration-200 hover:shadow-lg supabase-gradient-card hover:glow-green" style={{ borderRadius: "5px" }}>
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={`${API_BASE}/uploads/${item.image}`}
                      alt={item.desc}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-black/50 items-center justify-center" style={{ display: 'none' }}>
                      <div className="text-center text-gray-400">
                        <div className="text-2xl mb-2">🖼️</div>
                        <p className="text-sm">Image not available</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="absolute top-3 left-3 text-xs bg-black/50 text-white border-white/20">
                      {stock} Stock
                    </Badge>
                    {isNew && (
                      <Badge className="absolute top-3 right-3 text-xs bg-green-500 text-white">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs bg-black/20 text-gray-300 border-white/10">Fashion</Badge>
                    </div>
                    <h3 className="font-bold text-lg line-clamp-2 text-white">{item.desc}</h3>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span className="flex items-center">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {replies}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {lastReply}h
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-green-400">Rp {price}</span>
                      <Button 
                        onClick={() => addToCart(item)}
                        size="sm"
                        className="supabase-gradient text-white hover:opacity-90"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/tryon', { state: { selectedClothing: item } })}
                      className="w-full bg-black/20 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Try On
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
