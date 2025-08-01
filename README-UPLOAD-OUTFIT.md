# Upload Foto & Pilih Outfit - AI Outfit Generator

Halaman untuk upload foto diri dan pilih outfit dari koleksi untuk generate kombinasi baru menggunakan AI.

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
http://localhost:5173/upload-outfit
```

## 🎯 Fitur Utama

### ✨ Upload Foto dengan Drag & Drop
- **Drag & Drop**: Drag foto langsung ke area upload
- **File Picker**: Klik untuk memilih file dari komputer
- **Preview**: Preview foto yang diupload
- **File Info**: Tampilkan nama dan ukuran file
- **Remove**: Hapus foto yang diupload

### 🖼️ Pilih Outfit dari Gallery
- **Visual Selection**: Klik outfit untuk memilih
- **Selection Indicator**: Indikator visual outfit yang dipilih
- **Search & Filter**: Cari dan filter outfit
- **Grid/List View**: Toggle antara grid dan list view

### 🤖 Generate dengan AI
- **Status Check**: Cek status upload dan pilihan
- **Generate Options**: Toggle flag untuk advanced generation
- **Real-time Processing**: Loading state saat generate
- **Download Result**: Download hasil generate

## 🛠️ Teknologi yang Digunakan

- **React 18**: Framework utama
- **Shadcn/ui**: Component library
- **Lucide React**: Icon library
- **FileReader API**: Handle file uploads
- **Drag & Drop API**: Drag and drop functionality
- **Fetch API**: HTTP requests ke backend
- **Blob API**: Handle binary image data

## 📁 Struktur Komponen

```
src/
├── pages/
│   └── upload-outfit.jsx    # Halaman utama dengan upload & generate
├── components/ui/           # Shadcn UI components
├── App.jsx                  # Routing dengan /upload-outfit
└── app-sidebar.jsx          # Sidebar dengan menu Upload Outfit
```

## 🎨 Workflow Upload & Generate

### 1. **Upload Foto**
   - Drag & drop foto ke area upload, atau
   - Klik "Pilih File" untuk memilih dari komputer
   - Preview foto akan muncul
   - File info ditampilkan (nama, ukuran)

### 2. **Pilih Outfit**
   - Browse gallery outfit di bawah
   - Klik outfit untuk memilih
   - Indikator visual akan muncul
   - Status "Outfit dipilih" akan aktif

### 3. **Generate**
   - Cek status upload dan pilihan
   - Toggle flag jika diperlukan
   - Klik "Generate Outfit"
   - Loading state akan muncul

### 4. **Download Result**
   - Hasil generate akan ditampilkan
   - Klik "Download" untuk menyimpan

## 🔧 File Upload Features

### Drag & Drop
```javascript
const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    handleFileSelect(e.dataTransfer.files[0]);
  }
};
```

### File Validation
```javascript
const handleFileSelect = (file) => {
  if (file && file.type.startsWith('image/')) {
    // Process valid image file
  } else {
    alert('Please select a valid image file');
  }
};
```

### File Preview
```javascript
const reader = new FileReader();
reader.onload = (e) => {
  setUploadedImage({
    file: file,
    url: e.target.result,
    name: file.name,
    size: file.size
  });
};
```

## 🎯 Fitur Detail

### Upload Area
- **Drag Active State**: Visual feedback saat drag
- **File Type Validation**: Hanya terima file gambar
- **Size Limit**: Support file hingga 5MB
- **Preview**: Tampilkan foto yang diupload
- **Remove Button**: Hapus foto dengan X button

### Outfit Selection
- **Click to Select**: Klik outfit untuk memilih
- **Visual Feedback**: Ring border dan check icon
- **Selection Status**: Tampilkan status "Dipilih"
- **Hover Effects**: Overlay dengan instruksi

### Status Indicators
- **Upload Status**: Green check jika foto diupload
- **Selection Status**: Green check jika outfit dipilih
- **Generate Ready**: Button aktif jika keduanya siap

### Generate Process
- **Validation**: Pastikan foto dan outfit dipilih
- **Loading State**: Spinner dengan text "Generating..."
- **Error Handling**: Error message jika gagal
- **Success State**: Tampilkan hasil generate

## 🚨 Error Handling

### Upload Errors
- **Invalid File Type**: Alert untuk file non-gambar
- **File Too Large**: Validasi ukuran file
- **Upload Failed**: Error state dengan retry

### Generate Errors
- **Missing Files**: Validasi foto dan outfit
- **API Error**: Error dari backend
- **Network Error**: Koneksi gagal

### Recovery Options
- **Retry Upload**: Upload ulang foto
- **Reselect Outfit**: Pilih outfit lain
- **Clear All**: Reset semua pilihan

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked upload areas
- Full-width buttons
- Simplified controls

### Tablet (768px - 1024px)
- Two column upload areas
- Medium grid layout
- Side-by-side controls

### Desktop (> 1024px)
- Two column upload areas
- Four column grid
- Full feature set

## 🔧 Customization

### File Upload Settings
Edit di `upload-outfit.jsx`:
```javascript
// File size limit
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Supported file types
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
```

### UI Components
Import shadcn components:
```javascript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
```

### Styling
Custom CSS classes:
```css
.drag-active {
  @apply border-primary bg-primary/5;
}

.upload-area {
  @apply border-2 border-dashed rounded-lg p-6 text-center;
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
   http://localhost:5173/upload-outfit
   ```

4. **Test upload & generate:**
   - Drag & drop foto atau klik "Pilih File"
   - Pilih outfit dari gallery
   - Klik "Generate Outfit"
   - Download hasil generate

## 🔄 Workflow Lengkap

1. **Load Page** → Fetch clothing data
2. **Upload Photo** → Drag & drop atau file picker
3. **Select Outfit** → Click outfit from gallery
4. **Check Status** → Verify both are ready
5. **Generate** → Call API with uploaded + selected
6. **Process** → Handle loading and errors
7. **Display** → Show generated result
8. **Download** → Save generated image

## 📝 Notes

- **File Support**: JPG, PNG, WebP (Max: 5MB)
- **Drag & Drop**: Works on modern browsers
- **File Preview**: Uses FileReader API
- **Memory Management**: URL.createObjectURL cleanup
- **Error Recovery**: Retry mechanisms available
- **Accessibility**: Keyboard navigation support

## 🎨 UI/UX Features

### Visual Feedback
- **Drag States**: Border color changes on drag
- **Selection States**: Ring border and check icons
- **Loading States**: Spinner animations
- **Success States**: Green checkmarks
- **Error States**: Red error messages

### Interactive Elements
- **Hover Effects**: Scale and shadow on cards
- **Click Feedback**: Visual response on clicks
- **Smooth Transitions**: CSS transitions
- **Responsive Layout**: Adapts to screen size

Sekarang Anda bisa upload foto diri dan pilih outfit untuk generate kombinasi baru dengan AI! 🎨✨ 