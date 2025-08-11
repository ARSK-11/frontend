import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppSidebar } from "@/components/app-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";

// pages
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import TryOnPage from "@/pages/tryon";
import RegisterStep1 from "@/pages/register-step-1";
import RegisterStep2 from "@/pages/register-step-2";
import RegisterStep3 from "@/pages/register-step-3";
import LandingPage from "@/pages/landing";

// Komponen halaman
function Home() {
  return (
    <HomePage />
  );
}

function About() {
  return (
    <div className="p-6 supabase-gradient-dark">
      <h1 className="text-3xl font-bold mb-4 text-white">About Page</h1>
      <p className="text-gray-400">
        Ini adalah halaman About dengan tema Supabase.
      </p>
    </div>
  );
}

function Inbox() {
  return (
    <div className="p-6 supabase-gradient-dark">
      <h1 className="text-3xl font-bold mb-4 text-white">Inbox Page</h1>
      <p className="text-gray-400">
        Ini adalah halaman Inbox dengan tema Supabase.
      </p>
    </div>
  );
}

// Komponen untuk halaman 404 Not Found (hanya content)
function NotFound404() {
  return (
    <div className="p-6 flex flex-col items-center justify-center supabase-gradient-dark min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-white">404 - Not Found</h1>
      <p className="text-gray-400">Halaman yang Anda cari tidak ditemukan.</p>
    </div>
  );
}

// Layout dengan sidebar dan navbar
function AppLayout({ children }) {
  return (
    <div className="flex h-screen supabase-gradient-dark">
      {/* Left Sidebar */}
      <AppSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Navbar */}
        <Navbar />
        
        {/* Content */}
        <div className="flex-1 flex">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
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
    <AuthProvider>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/register/step/1" element={<RegisterStep1 />} />
        <Route path="/register/step/2" element={<RegisterStep2 />} />
        <Route path="/register/step/3" element={<RegisterStep3 />} />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute requireRegistration={true}>
              <AppLayout>
                <Routes>
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/tryon" element={<TryOnPage />} />
                  {/* Tambahkan route lain di sini */}
                  <Route path="*" element={<NotFound404 />} />
                </Routes>
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;