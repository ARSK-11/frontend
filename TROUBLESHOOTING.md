# Troubleshooting Guide - Upload Outfit & Generate

## 🚨 Masalah Umum dan Solusi

### 1. **Hasil Generate Kosong**

#### Gejala:
- Generate button tidak berfungsi
- Hasil generate kosong/tidak muncul
- Error "Hasil generate kosong"

#### Penyebab:
- Backend tidak berjalan
- API endpoint tidak tersedia
- File upload tidak valid
- Outfit tidak dipilih dengan benar

#### Solusi:

**A. Cek Backend Server:**
```bash
# Pastikan backend berjalan
cd /home/aris/Documents/coding/prototype/backend
npm start

# Cek apakah server berjalan di port 3000
curl http://localhost:3000/api/assets/clothing
```

**B. Test API dengan File HTML:**
```bash
# Buka file test di browser
open coding/percobaan/frontend/test-api.html
```

**C. Cek Console Browser:**
1. Buka Developer Tools (F12)
2. Lihat tab Console
3. Cari error messages
4. Pastikan semua console.log menampilkan data yang benar

### 2. **File Upload Tidak Berfungsi**

#### Gejala:
- Drag & drop tidak bekerja
- File picker tidak membuka
- File tidak ter-upload

#### Solusi:

**A. Cek File Type:**
```javascript
// Pastikan file adalah gambar
if (!file.type.startsWith('image/')) {
  alert('Please select a valid image file');
  return;
}
```

**B. Cek File Size:**
```javascript
// Limit 5MB
const maxSize = 5 * 1024 * 1024;
if (file.size > maxSize) {
  alert('File too large');
  return;
}
```

**C. Cek Browser Support:**
- Pastikan browser modern (Chrome, Firefox, Safari, Edge)
- Enable JavaScript
- Allow file access

### 3. **Outfit Tidak Muncul di Gallery**

#### Gejala:
- Gallery kosong
- "No Outfits Found" message
- Loading spinner tidak berhenti

#### Solusi:

**A. Cek Backend Clothing Directory:**
```bash
# Pastikan folder ada dan berisi file
ls -la /home/aris/Documents/coding/prototype/backend/public/assets/clothing/
```

**B. Cek API Response:**
```bash
curl -v http://localhost:3000/api/assets/clothing
```

**C. Cek File Permissions:**
```bash
# Pastikan file bisa diakses
chmod 644 /home/aris/Documents/coding/prototype/backend/public/assets/clothing/*
```

### 4. **Generate API Error**

#### Gejala:
- Error "HTTP error! status: 500"
- Error "API tidak mengembalikan gambar yang valid"
- Generate button disabled

#### Solusi:

**A. Cek Backend Logs:**
```bash
# Lihat log backend
cd /home/aris/Documents/coding/prototype/backend
npm start
# Lihat output di terminal
```

**B. Test Generate API Manual:**
```bash
# Test dengan curl
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "image1": "data:image/jpeg;base64,/9j/4AAQ...",
    "image2": "http://localhost:3000/api/assets/clothing/test.jpg",
    "flag": false
  }'
```

**C. Cek CORS:**
```javascript
// Pastikan CORS diaktifkan di backend
app.use(cors());
```

### 5. **Memory Issues**

#### Gejala:
- Browser crash
- Slow performance
- Memory leaks

#### Solusi:

**A. Cleanup URLs:**
```javascript
// Cleanup blob URLs
URL.revokeObjectURL(uploadedImageUrl);
URL.revokeObjectURL(generatedImageUrl);
```

**B. Reset State:**
```javascript
// Reset semua state
setUploadedImage(null);
setSelectedOutfit(null);
setGeneratedImage(null);
setGenerateError(null);
```

## 🔧 Debug Steps

### Step 1: Check Backend Status
```bash
# 1. Start backend
cd /home/aris/Documents/coding/prototype/backend
npm start

# 2. Test API endpoints
curl http://localhost:3000/api/assets/clothing
curl -X POST http://localhost:3000/generate -H "Content-Type: application/json" -d '{}'
```

### Step 2: Check Frontend Console
1. Buka browser
2. Buka Developer Tools (F12)
3. Lihat tab Console
4. Cari error messages
5. Pastikan semua console.log menampilkan data yang benar

### Step 3: Use Test HTML File
1. Buka `coding/percobaan/frontend/test-api.html`
2. Test clothing API
3. Upload test image
4. Select outfit
5. Test generate

### Step 4: Check Network Tab
1. Buka Developer Tools
2. Lihat tab Network
3. Cek request/response untuk:
   - `/api/assets/clothing`
   - `/generate`
4. Pastikan status 200 OK

## 📋 Checklist Debug

### Backend Checklist:
- [ ] Server berjalan di port 3000
- [ ] CORS diaktifkan
- [ ] Folder `/public/assets/clothing/` ada
- [ ] File gambar ada di folder
- [ ] File permissions benar
- [ ] API `/api/assets/clothing` berfungsi
- [ ] API `/generate` berfungsi

### Frontend Checklist:
- [ ] React app berjalan di port 5173
- [ ] Console tidak ada error
- [ ] File upload berfungsi
- [ ] Drag & drop berfungsi
- [ ] Gallery menampilkan outfit
- [ ] Outfit selection berfungsi
- [ ] Generate button aktif
- [ ] Generate process berjalan
- [ ] Hasil generate muncul

### Browser Checklist:
- [ ] JavaScript enabled
- [ ] File access allowed
- [ ] Network requests allowed
- [ ] Console accessible
- [ ] Developer tools working

## 🐛 Common Error Messages

### "Upload foto dan pilih outfit terlebih dahulu"
- **Cause**: Missing uploaded image or selected outfit
- **Solution**: Upload image and select outfit

### "Gagal memuat data pakaian"
- **Cause**: Backend API not responding
- **Solution**: Start backend server

### "HTTP error! status: 500"
- **Cause**: Backend server error
- **Solution**: Check backend logs

### "API tidak mengembalikan gambar yang valid"
- **Cause**: Generate API returning wrong content type
- **Solution**: Check backend generate function

### "Hasil generate kosong"
- **Cause**: Generated image is 0 bytes
- **Solution**: Check backend image processing

### "Invalid outfit selection"
- **Cause**: Outfit URL is invalid
- **Solution**: Refresh page and reselect outfit

## 🔄 Reset & Recovery

### Reset Frontend State:
```javascript
// Di browser console
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Reset Backend:
```bash
# Restart backend server
cd /home/aris/Documents/coding/prototype/backend
npm start
```

### Clear Browser Cache:
1. Buka Developer Tools
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

## 📞 Support

Jika masalah masih berlanjut:

1. **Cek semua checklist di atas**
2. **Gunakan file test-api.html untuk debug**
3. **Lihat console browser untuk error details**
4. **Cek backend logs untuk server errors**
5. **Pastikan semua dependencies terinstall**

### Dependencies Check:
```bash
# Frontend
cd /home/aris/Documents/coding/percobaan/frontend
npm install

# Backend
cd /home/aris/Documents/coding/prototype/backend
npm install
```

Sekarang Anda memiliki tools lengkap untuk debug dan fix masalah upload-outfit! 🔧✨ 