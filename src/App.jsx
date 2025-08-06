import { Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import Navbar from "@/components/navbar";

// pages
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import TryOnPage from "@/pages/tryon";

// Komponen halaman
function Home() {
  return (
    <HomePage />
  );
}

function About() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">About Page</h1>
      <p className="text-gray-600">
        Ini adalah halaman About dengan tema Itinari.ai.
      </p>
    </div>
  );
}

function Inbox() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Inbox Page</h1>
      <p className="text-gray-600">
        Ini adalah halaman Inbox dengan tema Itinari.ai.
      </p>
    </div>
  );
}

// Komponen untuk halaman 404 Not Found (hanya content)
function NotFound404() {
  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">404 - Not Found</h1>
      <p className="text-gray-600">Halaman yang Anda cari tidak ditemukan.</p>
    </div>
  );
}

// Layout dengan sidebar dan navbar
function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <AppSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Navbar */}
        <Navbar />
        
        {/* Content */}
        <div className="flex-1 flex">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
          
          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginPage />
        }
      />
      <Route
        path="/*"
        element={
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/tryon" element={<TryOnPage />} />
              {/* Tambahkan route lain di sini */}
              <Route path="*" element={<NotFound404 />} />
            </Routes>
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default App;