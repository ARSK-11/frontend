# Troubleshooting - Error "Failed to Fetch"

## Masalah
Error "Failed to fetch" terjadi ketika aplikasi tidak dapat terhubung ke backend server untuk fitur Try-On.

## Penyebab Umum
1. **Backend server offline** - Server AI Try-On tidak tersedia
2. **Cloudflare tunnel expired** - URL tunnel sudah tidak aktif
3. **Network connectivity issues** - Masalah koneksi internet
4. **CORS issues** - Cross-origin resource sharing error
5. **Invalid API key** - API key yang digunakan tidak valid

## Solusi yang Telah Diterapkan

### 1. CORS Configuration
- Dynamic CORS origin checking untuk mendukung multiple domains
- Support untuk Cloudflare tunnel domains
- Wildcard domain support untuk `*.trycloudflare.com`

### 2. Enhanced Error Handling
- Error handling yang lebih detail dengan logging
- Timeout handling untuk mencegah hanging requests
- User-friendly error messages dalam bahasa Indonesia

### 3. Multiple Endpoint Support
- Endpoint `/api/tryon` untuk API calls
- Endpoint `/tryon` untuk akses langsung
- Health check endpoint `/health` untuk monitoring

### 4. Improved User Experience
- Loading states yang lebih informatif
- Progress indicators untuk upload
- Better error messages dengan detail teknis

## Cara Mengatasi Error

### Untuk Developer:
1. **Test CORS** - Gunakan file `test-cors.html` untuk test konektivitas
2. **Periksa console** - Buka Developer Tools untuk melihat error detail
3. **Update URL backend** - Jika perlu, update URL di `tryon.jsx`
4. **Restart backend services** - Jika Anda memiliki akses ke backend
5. **Cek CORS configuration** - Pastikan domain frontend ada di `ALLOWED_ORIGINS`

### Untuk User:
1. **Refresh halaman** - Coba refresh browser
2. **Cek koneksi internet** - Pastikan koneksi internet stabil
3. **Clear browser cache** - Hapus cache browser dan coba lagi
4. **Coba browser lain** - Test dengan browser yang berbeda

## Konfigurasi Backend URL

### URL Saat Ini:
```javascript
const BACKEND_BASE_URL = "https://backend2-1-t2fh.onrender.com";
const BACKEND_USER_URL = "https://backend-user-ftr6.onrender.com";
const BACKEND1_URL = "https://shut-penalty-decrease-croatia.trycloudflare.com";
```

### Cara Update URL:
1. Buka file `src/pages/tryon.jsx`
2. Update konstanta URL sesuai kebutuhan
3. Restart development server

## Monitoring dan Debugging

### Console Logs:
- Semua request ke backend akan di-log di console
- Error details akan ditampilkan untuk debugging
- Status response dari setiap backend akan di-log

### Network Tab:
- Gunakan Developer Tools > Network tab
- Lihat request yang gagal dan response error
- Periksa status code dan response body

## Best Practices

1. **Always implement fallback URLs**
2. **Use proper timeout handling**
3. **Provide user-friendly error messages**
4. **Monitor backend health regularly**
5. **Implement retry mechanisms**
6. **Log errors for debugging**

## Support

Jika masalah masih berlanjut:
1. Periksa log error di console
2. Cek status backend di UI
3. Hubungi administrator untuk bantuan teknis
4. Pastikan semua service backend berjalan dengan normal 