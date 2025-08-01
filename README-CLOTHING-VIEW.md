# Clothing View & Generate - AI Outfit Generator

Halaman untuk melihat koleksi pakaian dan generate outfit baru menggunakan AI dengan API generate.

## 🚀 Cara Menjalankan

### 1. Start Backend Server
```bash
cd /home/aris/Documents/coding/prototype/backend
npm start
```
Backend akan berjalan di: `http://localhost:3000`

### 2. Start Frontend
```bash
cd /home/aris/Documents/coding/percobaan/frontend
npm run dev
```
Frontend akan berjalan di: `http://localhost:5173`

### 3. Akses Halaman
```
http://localhost:5173/clothing-view
```

## 🎯 Fitur Utama

### ✨ Generate Outfit dengan AI
- **Image Selection**: Pilih foto diri dan outfit dari koleksi
- **AI Generation**: Generate outfit baru menggunakan API
- **Real-time Processing**: Loading state saat generate
- **Download Result**: Download hasil generate
- **Error Handling**: Penanganan error yang user-friendly

### 🖼️ Clothing Gallery
- **Grid/List View**: Toggle antara grid dan list view
- **Search & Filter**: Cari dan filter berdasarkan nama dan tipe file
- **Image Preview**: Preview gambar dengan hover effects
- **Quick Actions**: Upload ke Image 1/2 dengan satu klik

### 📱 Interactive Features
- **Drag & Drop**: Area upload yang intuitif
- **Visual Feedback**: Loading states dan progress indicators
- **Responsive Design**: Bekerja di semua ukuran layar
- **Keyboard Navigation**: Support keyboard shortcuts

## 🛠️ Teknologi yang Digunakan

- **React 18**: Framework utama
- **Shadcn/ui**: Component library
- **Lucide React**: Icon library
- **Fetch API**: HTTP requests ke backend
- **Blob API**: Handle binary image data
- **URL.createObjectURL**: Preview generated images

## 📁 Struktur Komponen

```
src/
├── pages/
│   └── clothing-view.jsx    # Halaman utama dengan generate feature
├── components/ui/           # Shadcn UI components
├── App.jsx                  # Routing dengan /clothing-view
└── app-sidebar.jsx          # Sidebar dengan menu Clothing View
```

## 🎨 Workflow Generate

### 1. **Pilih Gambar**
   - Klik "Image 1" untuk foto diri
   - Klik "Image 2" untuk outfit
   - Gambar akan ditampilkan di preview area

### 2. **Set Options**
   - Toggle flag untuk advanced generation
   - Flag akan dikirim ke API sebagai boolean

### 3. **Generate**
   - Klik "Generate Outfit"
   - Loading state akan muncul
   - API akan dipanggil dengan data yang dipilih

### 4. **Download Result**
   - Hasil generate akan ditampilkan
   - Klik "Download" untuk menyimpan gambar

## 🔧 API Integration

### Generate Endpoint
```javascript
POST http://localhost:3000/generate
Content-Type: application/json

{
  "image1": "http://localhost:3000/api/assets/clothing/filename1.webp",
  "image2": "http://localhost:3000/api/assets/clothing/filename2.webp",
  "flag": true
}
```

### Response Handling
```javascript
// Handle binary response
const blob = await response.blob();
const imageUrl = URL.createObjectURL(blob);
setGeneratedImage(imageUrl);
```

## 🎯 Fitur Detail

### Image Selection
- **Preview Area**: Tampilkan gambar yang dipilih
- **Remove Button**: Hapus gambar yang dipilih
- **Validation**: Pastikan dua gambar dipilih sebelum generate
- **Reset**: Clear generated image saat pilih gambar baru

### Generate Process
- **Loading State**: Spinner dengan text "Generating..."
- **Error Handling**: Tampilkan error message jika gagal
- **Success State**: Tampilkan hasil generate
- **Download**: Auto-download dengan nama "generated-outfit.webp"

### Gallery Features
- **Grid Layout**: Responsive grid (1-4 kolom)
- **Hover Effects**: Overlay dengan action buttons
- **Quick Upload**: Button "Image 1" dan "Image 2" di setiap card
- **File Info**: Tampilkan ukuran dan tipe file

## 🚨 Error Handling

### Common Errors
- **Network Error**: Koneksi ke backend gagal
- **API Error**: Generate API mengembalikan error
- **Image Error**: Gambar tidak bisa dimuat
- **Validation Error**: Gambar belum dipilih

### Error States
- **Loading Error**: Retry button untuk reload data
- **Generate Error**: Error message dengan detail
- **Image Error**: Fallback untuk gambar yang rusak

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked image selection
- Full-width buttons
- Simplified controls

### Tablet (768px - 1024px)
- Two column image selection
- Medium grid layout
- Side-by-side controls

### Desktop (> 1024px)
- Four column grid
- Horizontal image selection
- Full feature set

## 🔧 Customization

### Mengubah API Endpoint
Edit di `clothing-view.jsx`:
```javascript
const response = await fetch('http://localhost:3000/generate', {
  // ... config
});
```

### Mengubah UI Components
Import shadcn components:
```javascript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
```

### Menambah Validasi
Tambahkan di `handleGenerate`:
```javascript
if (!selectedImage1 || !selectedImage2) {
  setGenerateError('Pilih dua gambar terlebih dahulu');
  return;
}
```

## 🎉 Quick Start

1. **Start backend:**
   ```bash
   cd /home/aris/Documents/coding/prototype/backend
   npm start
   ```

2. **Start frontend:**
   ```bash
   cd /home/aris/Documents/coding/percobaan/frontend
   npm run dev
   ```

3. **Buka browser:**
   ```
   http://localhost:5173/clothing-view
   ```

4. **Test generate:**
   - Pilih dua gambar dari gallery
   - Klik "Generate Outfit"
   - Download hasil generate

## 🔄 Workflow Lengkap

1. **Load Page** → Fetch clothing data
2. **Select Images** → Choose Image 1 & 2
3. **Set Options** → Toggle flag if needed
4. **Generate** → Call API with selected data
5. **Process** → Handle loading and errors
6. **Display** → Show generated result
7. **Download** → Save generated image

## 📝 Notes

- **Image Format**: Support .webp, .jpg, .png, .gif
- **API Response**: Expects binary image data
- **File Naming**: Generated files named "generated-outfit.webp"
- **Memory Management**: URL.createObjectURL should be revoked after use
- **Error Recovery**: Retry mechanism for failed requests

Sekarang Anda bisa generate outfit baru dengan AI menggunakan koleksi pakaian yang tersedia! 🎨✨ 