import "../App.css";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";

const API_BASE = "https://backend2-1-t2fh.onrender.com";

export default function HomePage() {
  const navigate = useNavigate();
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
    } catch (err) {
      // Try to use cached data if network fails
      const cachedData = localStorage.getItem('clothingCache');
              if (cachedData) {
          try {
            const parsedData = JSON.parse(cachedData);
            setClothingItems(parsedData);
            setIsFromCache(true);
            console.log('Using cached data due to network error');
          } catch (err) {
            setError('Error: ' + err.message);
          }
        } else {
          setError('Error: ' + err.message);
        }
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = clothingItems.filter(item => {
    const matchesSearch = item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.desc.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      // Generate random price for demo
      const price = Math.floor(100 + Math.random() * 900) * 10;
      setCart([...cart, { 
        ...item, 
        quantity: 1, 
        size: "42", 
        color: "Green",
        price: price
      }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.12;
  const discount = subtotal * 0.10;
  const total = subtotal + tax - discount;

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
  };

  const clearCache = () => {
    localStorage.removeItem('clothingCache');
    localStorage.removeItem('clothingCacheTimestamp');
    console.log('Cache cleared');
  };

  const refreshData = () => {
    clearCache();
    setIsFromCache(false);
    setShowLoadingScreen(true);
    fetchClothingItems();
  };

  if (showLoadingScreen) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center space-y-8 max-w-md mx-auto p-8">
          {/* Loading Text */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-gray-900">
              Memuat koleksi pakaian...
            </div>
            
            {/* Animated Loading Dots */}
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-3">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full animate-pulse relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 font-medium">
              Mohon tunggu sebentar
            </div>
          </div>
          
          <div className="text-xs text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
            Mengambil data terbaru dari server
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md border border-gray-200 shadow-lg">
          <CardContent className="pt-8 text-center space-y-6">
            <div className="text-red-500 text-6xl">⚠️</div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Oops! Terjadi Kesalahan</h3>
              <p className="text-gray-600">{error}</p>
            </div>
            <Button onClick={fetchClothingItems} variant="outline" className="w-full">
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

    return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Explore, Share & Connect with Fellow Fashion Enthusiasts
        </h1>
        <p className="text-gray-600 mb-6">
          Discover the latest fashion trends, share your style, and connect with fashion lovers from around the world.
        </p>
        
        {/* Search and Create */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Best time to visit fashion stores?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 h-12 text-lg bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button 
            size="lg" 
            className="h-12 w-12 p-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
          >
            <Search className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
            {/* Featured Discussions Header */}
            {/* <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Featured Discussions</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Most Recent</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshData}
                  className="text-gray-500 hover:text-blue-500"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div> */}

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
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {category.label}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    selectedCategory === category.id ? 'bg-white text-blue-500' : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
        </div>

            {/* Product Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
          {filteredItems.map((item, index) => {
            const isNew = index % 5 === 0;
            const price = (Math.floor(100 + Math.random() * 900) * 10).toLocaleString('id-ID');
                const replies = Math.floor(Math.random() * 100) + 10;
                const views = Math.floor(Math.random() * 5000) + 500;
                const lastReply = Math.floor(Math.random() * 24) + 1;
            
            if (viewMode === "list") {
              return (
                    <Card key={index} className="bg-white border border-gray-200 hover:border-blue-300 transition-all duration-200">
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
                        <div className="hidden absolute inset-0 bg-gray-200 items-center justify-center" style={{ display: 'none' }}>
                          <div className="text-center text-gray-500">
                            <div className="text-2xl mb-2">🖼️</div>
                            <p className="text-sm">Image not available</p>
                          </div>
                        </div>
                        {isNew && (
                              <Badge className="absolute top-2 right-2 bg-blue-500 text-white text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1 p-6 flex items-center justify-between">
                        <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge className="bg-gray-100 text-gray-600 text-xs">Fashion</Badge>
                              </div>
                              <h3 className="font-bold text-xl mb-2 text-gray-900">{item.desc}</h3>
                              <p className="text-gray-600 mb-3">{replies} replies • {views.toLocaleString()} views • Last reply {lastReply} hours ago by @fashionlover</p>
                          <div className="flex items-center space-x-4">
                                <span className="font-bold text-2xl text-blue-500">Rp {price}</span>
                                <Badge className="bg-gray-100 text-gray-600">Stock: {Math.floor(Math.random() * 200) + 50}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button 
                            onClick={() => addToCart(item)}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => navigate('/tryon', { state: { selectedClothing: item } })}
                                className="border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500"
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
                  <Card key={index} className="bg-white border border-gray-200 hover:border-blue-300 transition-all duration-200 product-card">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={`${API_BASE}/uploads/${item.image}`}
                      alt={item.desc}
                          className="w-full h-48 object-cover product-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-gray-200 items-center justify-center" style={{ display: 'none' }}>
                      <div className="text-center text-gray-500">
                        <div className="text-2xl mb-2">🖼️</div>
                        <p className="text-sm">Image not available</p>
                      </div>
                    </div>
                        <Badge className="absolute top-3 left-3 bg-gray-100 text-gray-600 text-xs badge stock">
                      {Math.floor(Math.random() * 200) + 50} Stock
                    </Badge>
                    {isNew && (
                          <Badge className="absolute top-3 right-3 bg-blue-500 text-white text-xs badge new">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-gray-100 text-gray-600 text-xs">Fashion</Badge>
                        </div>
                        <h3 className="font-bold text-lg line-clamp-2 text-gray-900 product-title">{item.desc}</h3>
                    <p className="text-gray-600 text-xs line-clamp-2">
                          {replies} replies • {views.toLocaleString()} views • Last reply {lastReply} hours ago
                    </p>
                    <div className="flex items-center justify-between">
                          <span className="font-bold text-lg text-blue-500 product-price">Rp {price}</span>
                      <Button 
                        onClick={() => addToCart(item)}
                        size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                            className="border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = `${API_BASE}/uploads/${item.image}`;
                          link.download = item.image;
                          link.click();
                        }}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => navigate('/tryon', { state: { selectedClothing: item } })}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs"
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                            Try On
                      </Button>
                    </div>
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
