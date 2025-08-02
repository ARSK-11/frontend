import { Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">About Page</h1>
      <p className="text-black">
        Ini adalah halaman About.
      </p>
    </div>
  );
}

function Inbox() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Inbox Page</h1>
      <p className="text-black">
        Ini adalah halaman Inbox.
      </p>
    </div>
  );
}

// Komponen untuk halaman 404 Not Found (hanya content)
function NotFound404() {
  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-black">404 - Not Found</h1>
      <p className="text-black">Halaman yang Anda cari tidak ditemukan.</p>
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
          <div className="flex h-screen bg-white">
            <AppSidebar />
            <div className="flex-1 flex flex-col ml-16">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/tryon" element={<TryOnPage />} />
                  {/* Tambahkan route lain di sini */}
                  <Route path="*" element={<NotFound404 />} />
                </Routes>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;