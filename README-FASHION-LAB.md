# Fashion Collection - Shadcn UI Integration

Frontend React yang terintegrasi dengan API Clothing menggunakan tema shadcn/ui yang konsisten dengan dashboard utama.

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
Frontend akan berjalan di: `http://localhost:5173` (atau port yang tersedia)

## 🎨 Fitur Desain Shadcn UI

### ✨ Konsisten dengan Dashboard
- **Shadcn Components**: Menggunakan Card, Button, Input, Select dari shadcn/ui
- **Tema Konsisten**: Mengikuti tema yang sama dengan sidebar dan navbar
- **Color System**: Menggunakan CSS variables dari shadcn theme
- **Typography**: Font dan spacing yang konsisten
- **Responsive**: Desain yang responsif untuk semua ukuran layar

### 🖼️ Clothing Gallery
- **Card Layout**: Menggunakan shadcn Card component
- **Grid/List View**: Toggle antara grid dan list view
- **Hover Effects**: Smooth hover animations
- **Loading States**: Loading spinner yang konsisten
- **Error Handling**: Error states dengan shadcn styling

### 🔍 Search & Filter
- **Search Input**: Input component dengan icon search
- **Select Dropdown**: Dropdown filter menggunakan shadcn Select
- **View Mode Toggle**: Button group untuk grid/list view
- **Real-time Filtering**: Filter real-time tanpa reload
- **Statistics**: Stats card dengan shadcn styling

### 📱 Interactive Features
- **View Image**: Buka gambar di tab baru
- **Download Image**: Download gambar langsung
- **Responsive Grid**: Grid yang menyesuaikan ukuran layar
- **Smooth Animations**: Animasi yang halus dan konsisten

## 🛠️ Teknologi yang Digunakan

- **React 18**: Framework utama
- **Shadcn/ui**: Component library
- **Tailwind CSS**: Utility classes
- **Lucide React**: Icon library
- **Fetch API**: HTTP requests ke backend
- **useState & useEffect**: State management

## 📁 Struktur Komponen

```
src/
├── pages/
│   └── home.jsx          # Halaman utama dengan Fashion Collection
├── components/ui/        # Shadcn UI components
│   ├── card.jsx
│   ├── button.jsx
│   ├── input.jsx
│   ├── select.jsx
│   └── ...
├── App.css               # Styles dan tema
└── App.jsx               # Root component dengan sidebar
```

## 🎯 Fitur Utama

### 1. **Header Section**
- Judul "Fashion Collection" dengan typography shadcn
- Deskripsi aplikasi dengan muted text
- Stats card dengan metrics

### 2. **Control Panel**
- Search input dengan icon
- Select dropdown untuk filter
- View mode toggle buttons
- Semua menggunakan shadcn components

### 3. **Clothing Grid/List**
- Card layout yang konsisten
- Hover effects dengan overlay
- Action buttons dengan shadcn styling
- Responsive design

### 4. **Loading & Error States**
- Loading spinner yang konsisten
- Error handling dengan Card component
- Empty state dengan proper styling

## 🎨 Design Elements

### Color Scheme (Shadcn)
- **Primary**: CSS variable `hsl(var(--primary))`
- **Secondary**: CSS variable `hsl(var(--secondary))`
- **Muted**: CSS variable `hsl(var(--muted))`
- **Background**: CSS variable `hsl(var(--background))`
- **Foreground**: CSS variable `hsl(var(--foreground))`

### Components Used
- **Card**: Untuk layout utama
- **Button**: Untuk actions dan controls
- **Input**: Untuk search
- **Select**: Untuk dropdown filters
- **Icons**: Lucide React icons

### Animations
- **Hover**: Smooth transitions
- **Scale**: Image zoom on hover
- **Fade**: Opacity transitions
- **Transform**: Card lift effects

## 🔧 Customization

### Mengubah Tema
Edit CSS variables di `App.css`:
```css
:root {
  --primary: oklch(0.216 0.006 56.043);
  --secondary: oklch(0.97 0.001 106.424);
  --muted: oklch(0.97 0.001 106.424);
}
```

### Menambah Komponen
Import shadcn components:
```javascript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
```

### Styling Konsisten
Gunakan utility classes Tailwind dengan shadcn theme:
```javascript
className="text-primary bg-secondary hover:bg-accent"
```

## 🚨 Troubleshooting

### CORS Error
- Pastikan backend berjalan di port 3000
- CORS middleware sudah ditambahkan di backend
- Restart kedua server jika perlu

### Styling Issues
- Pastikan shadcn components terinstall
- Cek apakah CSS variables ter-load
- Restart development server

### Component Errors
- Pastikan semua imports benar
- Cek apakah path ke components/ui benar
- Verifikasi versi shadcn/ui

## 📱 Responsive Design

### Mobile (< 768px)
- Single column grid
- Stacked controls
- Smaller text sizes

### Tablet (768px - 1024px)
- Two column grid
- Side-by-side controls
- Medium text sizes

### Desktop (> 1024px)
- Four column grid
- Horizontal controls
- Full text sizes

## 🎉 Quick Start

1. **Clone dan setup:**
   ```bash
   cd /home/aris/Documents/coding/percobaan/frontend
   npm install
   ```

2. **Start backend:**
   ```bash
   cd /home/aris/Documents/coding/prototype/backend
   npm start
   ```

3. **Start frontend:**
   ```bash
   npm run dev
   ```

4. **Buka browser:**
   ```
   http://localhost:5173
   ```

## 🔄 Perubahan dari Versi Sebelumnya

### ✅ Yang Diperbarui:
- **Tema**: Dari dark gradient ke shadcn theme
- **Components**: Menggunakan shadcn/ui components
- **Styling**: Konsisten dengan dashboard
- **Layout**: Card-based layout
- **Icons**: Lucide React icons
- **Typography**: Shadcn typography system

### 🎨 Keunggulan Baru:
- **Konsistensi**: Tema yang sama dengan sidebar/navbar
- **Maintainability**: Menggunakan design system yang established
- **Accessibility**: Shadcn components sudah accessible
- **Performance**: Optimized components
- **Developer Experience**: Better DX dengan shadcn

Sekarang Fashion Collection menggunakan tema shadcn yang konsisten dengan dashboard utama! 🎨✨ 