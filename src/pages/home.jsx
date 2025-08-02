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
  List
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://backend2-1-t2fh.onrender.com";

export default function HomePage() {
  const navigate = useNavigate();
  const [clothingItems, setClothingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  useEffect(() => {
    fetchClothingItems();
    // eslint-disable-next-line
  }, []);

  const fetchClothingItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/clothing`);
      const data = await response.json();
      if (data.success) {
        setClothingItems(data.data);
      } else {
        setError('Gagal memuat data pakaian');
      }
    } catch (err) {
      setError('Error: ' + err.message);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin h-16 w-16 border-4 border-gray-200 border-t-black mx-auto"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-black animate-ping"></div>
          </div>
          <div className="space-y-2">
            <p className="text-black font-medium">Memuat koleksi pakaian...</p>
            <p className="text-gray-500 text-sm">Mohon tunggu sebentar</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Card className="w-full max-w-md border-2 border-black">
          <CardContent className="pt-8 text-center space-y-6">
            <div className="text-black text-6xl">⚠️</div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-black">Oops! Terjadi Kesalahan</h3>
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
    <div className="flex h-full bg-white">
      {/* Left Column - Product List */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">Create Transaction</h1>
              <p className="text-gray-600">Pilih dan beli produk fashion favorit Anda</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center space-x-2 bg-black text-white"
              >
                <Grid3X3 className="w-4 h-4" />
                <span>Grid</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center space-x-2 bg-black text-white"
              >
                <List className="w-4 h-4" />
                <span>List</span>
              </Button>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="bg-white border border-black p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari produk fashion, brand, atau kategori..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 h-12 text-lg border-black bg-white focus:ring-2 focus:ring-black"
                />
              </div>
              <Button 
                size="lg" 
                className="h-12 px-8 bg-black hover:bg-gray-800 text-white"
              >
                <Search className="w-5 h-5 mr-2" />
                Cari
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-12 px-6 border-black hover:bg-black hover:text-white"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Enhanced Category Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { id: "all", label: "Semua Produk", count: clothingItems.length },
              { id: "shirt", label: "Kemeja", count: clothingItems.filter(item => item.desc.toLowerCase().includes('shirt')).length },
              { id: "pants", label: "Celana", count: clothingItems.filter(item => item.desc.toLowerCase().includes('pants')).length },
              { id: "dress", label: "Gaun", count: clothingItems.filter(item => item.desc.toLowerCase().includes('dress')).length },
              { id: "shoes", label: "Sepatu", count: clothingItems.filter(item => item.desc.toLowerCase().includes('shoes')).length },
              { id: "batik", label: "Batik", count: clothingItems.filter(item => item.desc.toLowerCase().includes('batik')).length }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 flex items-center space-x-3 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-black text-white"
                    : "bg-white text-black border border-black hover:bg-gray-100"
                }`}
              >
                <span className="font-medium">{category.label}</span>
                <span className={`text-xs px-2 py-1 ${
                  selectedCategory === category.id ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4" : "space-y-4"}>
          {filteredItems.map((item, index) => {
            const isNew = index % 5 === 0;
            const price = (Math.floor(100 + Math.random() * 900) * 10).toLocaleString('id-ID');
            
            if (viewMode === "list") {
              return (
                <Card key={index} className="bg-white border border-black">
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
                          <Badge className="absolute top-2 right-2 bg-black text-white text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1 p-6 flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-xl mb-2">{item.desc}</h3>
                          <p className="text-gray-600 mb-3">{item.desc} - ID: {item.id}</p>
                          <div className="flex items-center space-x-4">
                            <span className="font-bold text-2xl text-black">Rp {price}</span>
                            <Badge className="bg-gray-100 text-black">Stock: {Math.floor(Math.random() * 200) + 50}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button 
                            onClick={() => addToCart(item)}
                            className="bg-black hover:bg-gray-800 text-white"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => navigate('/tryon', { state: { selectedClothing: item } })}
                            className="border-black text-black hover:bg-black hover:text-white"
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
              <Card key={index} className="bg-white border border-black">
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
                    <div className="hidden absolute inset-0 bg-gray-200 items-center justify-center" style={{ display: 'none' }}>
                      <div className="text-center text-gray-500">
                        <div className="text-2xl mb-2">🖼️</div>
                        <p className="text-sm">Image not available</p>
                      </div>
                    </div>
                    <Badge className="absolute top-3 left-3 bg-black text-white text-xs">
                      {Math.floor(Math.random() * 200) + 50} Stock
                    </Badge>
                    {isNew && (
                      <Badge className="absolute top-3 right-3 bg-black text-white text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-lg line-clamp-2 text-black">{item.desc}</h3>
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {item.desc} - ID: {item.id}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-black">Rp {price}</span>
                      <Button 
                        onClick={() => addToCart(item)}
                        size="sm"
                        className="bg-black hover:bg-gray-800 text-white"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-black text-black hover:bg-black hover:text-white"
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
                        className="flex-1 bg-black hover:bg-gray-800 text-white text-xs"
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        Coba
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
