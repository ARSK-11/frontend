import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/obify-logo.png" alt="Threadify Logo" className="h-8 w-8" />
            <span className="text-xl font-bold">
              <span className="text-green-400">Thread</span>
              <span className="text-white">ify</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-green-900/40">
                Masuk
              </Button>
            </Link>
            <Link to="/register/step/1">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Daftar
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Virtual Try-On
            <span className="block text-green-400">Revolusi Fashion</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Coba pakaian secara virtual dengan teknologi AI canggih. 
            Lihat bagaimana pakaian terlihat pada Anda sebelum membeli.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register/step/1">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                Mulai Sekarang
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-green-400 text-green-400 hover:bg-green-900/40 px-8 py-3 text-lg">
                Coba Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-xl text-gray-300">
            Nikmati pengalaman berbelanja fashion yang berbeda
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-green-900/40 border-green-700 text-white">
            <CardHeader>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <CardTitle className="text-xl">AI Virtual Try-On</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Coba pakaian secara real-time dengan teknologi AI yang canggih. 
                Lihat hasil yang akurat dan natural.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-green-900/40 border-green-700 text-white">
            <CardHeader>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle className="text-xl">Instan & Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Hasil virtual try-on dalam hitungan detik. 
                Tidak perlu menunggu lama untuk melihat hasilnya.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-green-900/40 border-green-700 text-white">
            <CardHeader>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle className="text-xl">Koleksi Lengkap</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Ribuan pakaian dari berbagai brand dan kategori. 
                Temukan style yang sesuai dengan kepribadian Anda.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Cara Kerja
          </h2>
          <p className="text-xl text-gray-300">
            Hanya dalam 3 langkah sederhana
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Upload Foto</h3>
            <p className="text-gray-300">
              Upload foto Anda dengan pose yang jelas dan pencahayaan yang baik
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Pilih Pakaian</h3>
            <p className="text-gray-300">
              Pilih pakaian yang ingin Anda coba dari koleksi yang tersedia
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Lihat Hasil</h3>
            <p className="text-gray-300">
              Dapatkan hasil virtual try-on yang akurat dalam hitungan detik
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Siap Mencoba?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Bergabunglah dengan ribuan pengguna yang sudah merasakan kemudahan virtual try-on
          </p>
          <Link to="/register/step/1">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-green-900/40">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img src="/obify-logo.png" alt="Threadify Logo" className="h-6 w-6" />
            <span className="font-semibold">
              <span className="text-green-400">Thread</span>
              <span className="text-white">ify</span>
            </span>
          </div>
          <div className="flex space-x-6 text-gray-300">
            <a href="#" className="hover:text-green-400 transition-colors">Tentang</a>
            <a href="#" className="hover:text-green-400 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-green-400 transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-green-400 transition-colors">Kontak</a>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-400">
          <p>&copy; 2024 Threadify. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
