import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Camera,
  Shirt,
  X,
  AlertCircle,
  Download,
  ArrowLeft,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Rename BACKEND_BASE_URL to BACKEND_CLOTH_URL
const BACKEND_CLOTH_URL = "https://backend2-1-t2fh.onrender.com";
const BACKEND_USER_URL = "https://backend-user-ftr6.onrender.com";
// Rename BACKEND1_URL to BACKEND_TRYON_URL
const BACKEND_TRYON_URL = "http://localhost:3001";

// Sidebar component
function Sidebar({ selectedClothingItem }) {
  const [selectedSize, setSelectedSize] = useState('M');

  const sizes = [
    { size: 'S', stock: 5 },
    { size: 'M', stock: 10 },
    { size: 'L', stock: 8 },
    { size: 'XL', stock: 3 }
  ];

  return (
    <aside className="w-full lg:w-[45%] flex-shrink-0">
      {/* Sidebar: Clothing Thumbnail + Info */}
      <div
        className="p-4 bg-neutral-900 shadow-sm"
        style={{
          border: "1.5px solid #23272e",
          borderRadius: "5px"
        }}
      >
        <h2 className="text-base font-bold text-white mb-2">DETAIL PAKAIAN</h2>
        <p className="text-neutral-300 mb-4 text-xs">
          Tampilan pakaian yang elegan dan nyaman untuk dipakai sehari-hari. Cocok untuk berbagai acara.
        </p>
        {/* Gambar dan Info Produk */}
        <div className="space-y-2 mb-4">
          <div
            className="flex items-center gap-2 p-2 bg-neutral-800"
            style={{
              border: "1.5px solid #23272e",
              borderRadius: "5px"
            }}
          >
            <div className="w-16 h-16 bg-neutral-700 flex items-center justify-center overflow-hidden"
              style={{ borderRadius: "5px" }}
            >
              {selectedClothingItem && (
                <img
                  src={`${BACKEND_CLOTH_URL}/uploads/${selectedClothingItem.image}`}
                  alt={selectedClothingItem.desc}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: "5px" }}
                />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-xs text-white">{selectedClothingItem?.desc || "Nama Pakaian"}</p>
              <p className="text-xs text-neutral-400">Warna: Putih | Ukuran: {selectedSize}</p>
            </div>
            <span className="font-bold text-xs text-white">Rp 299.000</span>
          </div>
        </div>

        {/* Size Selector */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2 text-white">Pilih Ukuran:</p>
          <div className="flex gap-2">
            {sizes.map(({ size, stock }) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-sm font-medium transition-colors flex flex-col items-center border`}
                style={{
                  background: selectedSize === size ? "#fff" : "#23272e",
                  color: selectedSize === size ? "#18181b" : "#e5e7eb",
                  border: selectedSize === size ? "1.5px solid #fff" : "1.5px solid #23272e",
                  borderRadius: "5px"
                }}
              >
                <span>{size}</span>
                <span className="text-xs mt-1 text-neutral-400">{stock} tersisa</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ringkasan Harga */}
        <div
          className="pt-3 space-y-1 text-xs"
          style={{
            borderTop: "1.5px solid #23272e"
          }}
        >
          <div className="flex justify-between">
            <span className="text-neutral-300">Diskon:</span>
            <span className="text-green-400">-Rp 50.000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-300">Ongkos Kirim:</span>
            <span className="text-white">Rp 20.000</span>
          </div>
          <div
            className="flex justify-between font-bold text-base pt-2"
            style={{
              borderTop: "1.5px solid #23272e"
            }}
          >
            <span className="text-white">Total:</span>
            <span className="text-white">Rp 269.000</span>
          </div>
        </div>
        <Button className="w-full bg-white text-black hover:bg-neutral-200 font-bold py-2 mt-4 text-xs shadow-sm"
          style={{ borderRadius: "5px" }}
        >
          Checkout Now
        </Button>
      </div>
    </aside>
  );
}

export default function TryOnPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [uploadedPersonImage, setUploadedPersonImage] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedClothingItem, setSelectedClothingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [generateError, setGenerateError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedPersonImageUrl, setUploadedPersonImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [aiMirrorEnabled, setAiMirrorEnabled] = useState(true);
  const [showOriginal, setShowOriginal] = useState(true);

  const fileInputRef = useRef(null);

  useEffect(() => {
    // Set body background to transparent
    document.body.style.background = "transparent";
    // Optional: clean up on unmount
    return () => {
      document.body.style.background = "";
    };
  }, []);

  useEffect(() => {
    fetchClothingItems();
  }, []);

  useEffect(() => {
    if (location.state && location.state.selectedClothing) {
      setSelectedClothingItem(location.state.selectedClothing);
    }
  }, [location.state]);

  const fetchClothingItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_CLOTH_URL}/api/clothing`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.success) {
        setClothingItems(data.data);
        if (!location.state?.selectedClothing && data.data.length > 0) {
          setSelectedClothingItem(data.data[0]);
        }
        setError(null);
      } else {
        setError("Gagal memuat data pakaian");
      }
    } catch (err) {
      setError("Error: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Silakan pilih file gambar yang valid (JPG, PNG, GIF)");
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Ukuran file terlalu besar. Maksimal 5MB");
      return;
    }
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert("Format file tidak didukung. Gunakan JPG, PNG, atau GIF");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedPersonImage({
        file: file,
        preview: e.target.result,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);

    setUploading(true);
    setError(null);
    setUploadError(null);
    setUploadedPersonImageUrl(null);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      formData.append("image", file);
      await new Promise((resolve, reject) => {
        const xhr = new window.XMLHttpRequest();
        xhr.open("POST", `${BACKEND_USER_URL}/api/upload-image`);
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            let data = null;
            try {
              data = JSON.parse(xhr.responseText);
            } catch (e) {
              setUploadError("Gagal parsing response backend.");
              return reject(e);
            }
            if (data && data.filename) {
              const url = `${BACKEND_USER_URL}/api/images/${data.filename}`;
              setUploadedPersonImageUrl(url);
              setUploadError(null);
              resolve();
            } else {
              setUploadError(
                "Gagal upload foto orang: " +
                  (data && data.error ? data.error : "Unknown error")
              );
              reject(new Error(data && data.error ? data.error : "Unknown error"));
            }
          } else {
            setUploadError(
              "Gagal upload foto orang: " + xhr.statusText
            );
            reject(new Error(xhr.statusText));
          }
        };
        xhr.onerror = () => {
          setUploadError("Gagal upload foto orang: Network error");
          reject(new Error("Network error"));
        };
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setUploadProgress(
              Math.round((event.loaded / event.total) * 100)
            );
          }
        };
        xhr.send(formData);
      });
    } catch (err) {
      setUploadError("Gagal upload foto orang: " + (err?.message || "Unknown error"));
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const removeUploadedImage = () => {
    setUploadedPersonImage(null);
    setUploadedPersonImageUrl(null);
    setGeneratedResult(null);
    setGenerateError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGenerate = async () => {
    if (!selectedClothingItem || !uploadedPersonImageUrl) {
      alert("Pilih pakaian dan upload foto orang terlebih dahulu");
      return;
    }
    setGenerating(true);
    setGenerateError(null);
    setGeneratedResult(null);
    try {
      const clothingUrl = `${BACKEND_CLOTH_URL}/uploads/${selectedClothingItem.image}`;
      const response = await fetch(`${BACKEND_TRYON_URL}/api/tryon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "contohapikey123",
        },
        body: JSON.stringify({
          mask_type: "overall",
          media_url: uploadedPersonImageUrl,
          garment_url: clothingUrl,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload Error: ${response.status} - ${errorText}`);
      }
      const result = await response.json();
      if (
        result &&
        result.status === "READY" &&
        result.media_urls &&
        result.media_urls.length > 0
      ) {
        const resultUrl = result.media_urls[0];
        setGeneratedResult({
          eventId: result.event_id,
          resultUrl: resultUrl,
          status: result.status,
        });
      } else {
        setGenerateError(
          "Gagal menghasilkan hasil try-on: " +
            (result && result.error ? result.error : "Unknown error")
        );
      }
    } catch (err) {
      setGenerateError("Error: " + (err?.message || "Unknown error"));
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadResult = () => {
    if (generatedResult && generatedResult.resultUrl) {
      const link = document.createElement("a");
      link.href = generatedResult.resultUrl;
      link.download = `tryon-result-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleRegenerateMirror = async () => {
    if (!selectedClothingItem || !uploadedPersonImageUrl) {
      alert("Pilih pakaian dan upload foto orang terlebih dahulu");
      return;
    }
    setGenerating(true);
    setGenerateError(null);
    try {
      const clothingUrl = `${BACKEND_CLOTH_URL}/uploads/${selectedClothingItem.image}`;
      const response = await fetch(`${BACKEND_TRYON_URL}/api/tryon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "contohapikey123",
        },
        body: JSON.stringify({
          mask_type: "overall",
          media_url: uploadedPersonImageUrl,
          garment_url: clothingUrl,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload Error: ${response.status} - ${errorText}`);
      }
      const result = await response.json();
      if (
        result &&
        result.status === "READY" &&
        result.media_urls &&
        result.media_urls.length > 0
      ) {
        const resultUrl = result.media_urls[0];
        setGeneratedResult({
          eventId: result.event_id,
          resultUrl: resultUrl,
          status: result.status,
        });
      } else {
        setGenerateError(
          "Gagal menghasilkan hasil try-on: " +
            (result && result.error ? result.error : "Unknown error")
        );
      }
    } catch (err) {
      setGenerateError("Error: " + (err?.message || "Unknown error"));
    } finally {
      setGenerating(false);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-transparent">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto border-white"></div>
          <p className="text-lg text-white font-semibold">
            Memuat data pakaian...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 min-h-screen bg-transparent">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="hover:bg-neutral-800 text-white border"
            style={{
              border: "1.5px solid #23272e"
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Virtual Try-On
            </h1>
            <p className="text-base text-neutral-300 font-medium">
              Coba pakaian secara virtual dengan AI
            </p>
          </div>
        </div>

        {/* Main Layout: TryOn kiri, Sidebar kanan 35% */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: TryOn Content */}
          <div className="w-full lg:w-[55%]">
            <div
              className="relative p-0 overflow-hidden bg-neutral-900 shadow-sm"
              style={{
                border: "1.5px solid #23272e",
                borderRadius: "5px"
              }}
            >
              {/* Main Image */}
              <div className="relative">
                {uploadedPersonImage ? (
                  <img
                    src={showOriginal ? uploadedPersonImage.preview : (generatedResult ? generatedResult.resultUrl : uploadedPersonImage.preview)}
                    alt="Uploaded person"
                    className="w-full h-[80vh] object-cover bg-neutral-800"
                    style={{ borderRadius: "5px" }}
                  />
                ) : (
                  <div
                    className={`w-full h-[80vh] flex items-center justify-center transition-colors cursor-pointer`}
                    style={{
                      border: dragActive
                        ? "2.5px solid #fff"
                        : "2.5px solid #23272e",
                      background: dragActive
                        ? "#23272e"
                        : "#18181b",
                      borderRadius: "5px"
                    }}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-center text-neutral-500">
                      <Camera className="h-16 w-16 mx-auto mb-4 text-neutral-400" />
                      <p className="text-lg font-medium text-white">Upload foto orang</p>
                      <p className="text-sm mt-2 text-neutral-400">Drag & drop atau klik untuk memilih file</p>
                      <p className="text-xs mt-1 text-neutral-500">Format: JPG, PNG, GIF (Max 5MB)</p>
                    </div>
                  </div>
                )}

                {/* AI Mirror Toggle */}
                {generatedResult && generatedResult.resultUrl && (
                  <div
                    className="absolute top-4 left-4 bg-black text-white px-2 py-1 flex items-center gap-2 shadow"
                    style={{
                      border: "1.5px solid #23272e",
                      borderRadius: "6px",
                      minHeight: "32px",
                      minWidth: "auto",
                    }}
                  >
                    <span className="text-xs font-medium">AI Mirror</span>
                    <button
                      onClick={() => setAiMirrorEnabled(!aiMirrorEnabled)}
                      className="relative inline-flex h-4 w-7 items-center transition-colors"
                      style={{
                        background: aiMirrorEnabled ? "#fff" : "#23272e",
                        border: "1.2px solid #23272e",
                        borderRadius: "8px",
                        padding: "2px",
                        boxShadow: aiMirrorEnabled ? "0 0 4px #fff2" : "none",
                        transition: "background 0.2s, border 0.2s",
                      }}
                    >
                      <span
                        className="inline-block h-3 w-3 transform bg-black transition-transform"
                        style={{
                          transform: aiMirrorEnabled ? "translateX(14px)" : "translateX(2px)",
                          borderRadius: "50%",
                          boxShadow: "0 1px 2px #0002",
                        }}
                      />
                    </button>
                  </div>
                )}

                {/* AI Mirror Output */}
                {aiMirrorEnabled && generatedResult && generatedResult.resultUrl && (
                  <div className="absolute top-16 left-4">
                    <img
                      src={generatedResult.resultUrl}
                      alt="AI Mirror output"
                      className="w-24 h-24 object-cover"
                      style={{
                        border: "1.5px solid #23272e",
                        background: "#18181b",
                        borderRadius: "5px"
                      }}
                    />
                  </div>
                )}

                {/* Swap Image Button */}
                {generatedResult && generatedResult.resultUrl && uploadedPersonImage && (
                  <Button
                    onClick={() => setShowOriginal(!showOriginal)}
                    className="absolute bottom-4 right-4 hover:bg-neutral-200 text-black flex items-center justify-center"
                    style={{
                      border: "2px solid rgb(221, 221, 221)",
                      borderRadius: "50%",
                      width: "48px",
                      height: "48px",
                      padding: 0,
                    }}
                  >
                    <RefreshCw className="h-6 w-6" />
                  </Button>
                )}

                {/* Remove Image Button */}
                {uploadedPersonImage && (
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Hapus gambar"
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    style={{ borderRadius: "50%", width: "36px", height: "36px", minWidth: "36px", minHeight: "36px" }}
                    onClick={removeUploadedImage}
                    tabIndex={0}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div
                  className="p-4 bg-neutral-800"
                  style={{
                    borderTop: "1.5px solid #23272e",
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px"
                  }}
                >
                  <div className="flex flex-col items-center gap-2 w-full">
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                    <span className="text-white font-medium text-sm">
                      Mengupload foto orang...
                    </span>
                    <div className="w-full bg-neutral-700 h-2 mt-2 overflow-hidden"
                      style={{ borderRadius: "5px" }}
                    >
                      <div
                        className="bg-white h-full transition-all"
                        style={{
                          width: `${uploadProgress}%`,
                          transition: "width 0.2s",
                          borderRadius: "5px"
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-neutral-400 font-semibold">
                      {uploadProgress}%
                    </span>
                  </div>
                </div>
              )}

              {/* Upload Error */}
              {uploadError && (
                <div
                  className="p-4 bg-red-900"
                  style={{
                    borderTop: "1.5px solid #23272e",
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px"
                  }}
                >
                  <div className="text-red-400 text-sm font-semibold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {uploadError}
                  </div>
                </div>
              )}

              {/* Generate Buttons */}
              <div
                className="p-4 bg-neutral-800"
                style={{
                  borderTop: "1.5px solid #23272e",
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px"
                }}
              >
                <div className="flex gap-3">
                  <Button
                    onClick={handleGenerate}
                    disabled={
                      !selectedClothingItem ||
                      !uploadedPersonImageUrl ||
                      uploading ||
                      generating
                    }
                    className="flex-1 bg-white text-black font-bold hover:bg-neutral-200 transition shadow"
                    style={{ borderRadius: "5px" }}
                  >
                    {generating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Try-On
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleRegenerateMirror}
                    disabled={
                      !selectedClothingItem ||
                      !uploadedPersonImageUrl ||
                      uploading ||
                      generating ||
                      !generatedResult
                    }
                    className="flex-1 bg-neutral-700 text-white font-bold hover:bg-neutral-600 transition shadow"
                    style={{ borderRadius: "5px" }}
                  >
                    {generating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Regenerating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </>
                    )}
                  </Button>
                </div>

                {generateError && (
                  <div
                    className="flex items-center gap-2 p-3 bg-red-900 mt-3"
                    style={{
                      border: "1.5px solid #23272e",
                      borderRadius: "5px"
                    }}
                  >
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <p className="text-sm text-red-400 font-semibold">
                      {generateError}
                    </p>
                  </div>
                )}
              </div>

              {/* Output Thumbnail */}
              {generatedResult && generatedResult.resultUrl && (
                <div
                  className="p-4 bg-neutral-800"
                  style={{
                    borderTop: "1.5px solid #23272e",
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px"
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-16 h-16 overflow-hidden bg-neutral-900"
                        style={{
                          border: "1.5px solid #23272e",
                          borderRadius: "5px"
                        }}
                      >
                        <img
                          src={generatedResult.resultUrl}
                          alt="Hasil generate"
                          className="w-full h-full object-cover"
                          style={{ borderRadius: "5px" }}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleDownloadResult}
                      size="sm"
                      className="bg-white hover:bg-neutral-200 text-black shadow"
                      style={{ borderRadius: "5px" }}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Unduh
                    </Button>
                  </div>
                </div>
              )}

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </div>
          {/* End TryOn Content */}

          {/* Sidebar */}
          <Sidebar selectedClothingItem={selectedClothingItem} />
        </div>
      </div>
    </>
  );
}