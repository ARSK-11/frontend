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
import { useNavigate } from "react-router-dom";

const BACKEND_BASE_URL = "https://backend2-1-t2fh.onrender.com";
const BACKEND_USER_URL = "https://backend-user-ftr6.onrender.com";
const BACKEND1_URL = "http://localhost:3000";

// Sidebar component
function Sidebar({ selectedClothingItem }) {
  return (
    <aside className="w-full lg:w-[35%] flex-shrink-0">
      {/* Sidebar: Clothing Thumbnail + Info */}
      <div className="bg-white rounded-xl p-4 flex flex-col items-left mb-6">
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <Shirt className="h-6 w-6 text-black" />
          </div>
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-300 mb-2 bg-gray-100 flex items-center justify-center">
            {selectedClothingItem ? (
              <img
                src={`${BACKEND_BASE_URL}/uploads/${selectedClothingItem.image}`}
                alt={selectedClothingItem.desc}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-400">No clothing</span>
            )}
          </div>
          {selectedClothingItem && (
            <>
              <h3 className="font-semibold text-black text-center text-xs">
                {selectedClothingItem.desc}
              </h3>
              <p className="text-xs text-gray-500 text-center">
                ID: {selectedClothingItem.id}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Sidebar: Everyday Look Info */}
      <div className="bg-white rounded-xl p-4">
        <h2 className="text-base font-bold text-black mb-2">EVERYDAY LOOK</h2>
        <p className="text-gray-700 mb-4 text-xs">
          Great style for everyday wear. Elegant sunglasses accentuate the face's oval shape, while a casually draped sweater adds a hint of luxury and style.
        </p>
        {/* Product Items */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <div className="w-7 h-7 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">💍</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-xs">Pack of 2 stainless steel signet rings</p>
              <p className="text-xs text-gray-500">Color: Silver | Size: S | PULL&BEAR</p>
            </div>
            <span className="font-bold text-xs">$17.99</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <div className="w-7 h-7 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">👕</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-xs">Rustic oversize long sleeve shirt</p>
              <p className="text-xs text-gray-500">Color: White | Size: XS | ZARA</p>
              <p className="text-xs text-gray-400 line-through">$230.00</p>
            </div>
            <span className="font-bold text-xs text-green-600">$119.99</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <div className="w-7 h-7 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">🧥</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-xs">Round neck sweater</p>
              <p className="text-xs text-gray-500">Color: Green | Size: S | BERSHKA</p>
            </div>
            <span className="font-bold text-xs">$149.99</span>
          </div>
        </div>
        {/* Price Summary */}
        <div className="border-t pt-3 space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Discount:</span>
            <span className="text-green-600">-$239.99</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>$120.99</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t pt-2">
            <span>Total price:</span>
            <span>$168.97</span>
          </div>
        </div>
        <Button className="w-full bg-black text-white hover:bg-gray-800 font-bold py-2 mt-4 text-xs">
          Go to checkout
        </Button>
      </div>
    </aside>
  );
}

export default function TryOnPage() {
  const navigate = useNavigate();

  const [uploadedPersonImage, setUploadedPersonImage] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
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

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchClothingItems();
  }, []);

  const fetchClothingItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_BASE_URL}/api/clothing`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.success) {
        setClothingItems(data.data);
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

  const getSelectedClothingItem = () => {
    if (clothingItems && clothingItems.length > 0) {
      return clothingItems[0];
    }
    return null;
  };

  const handleGenerate = async () => {
    const selectedClothingItem = getSelectedClothingItem();
    if (!selectedClothingItem || !uploadedPersonImageUrl) {
      alert("Pilih pakaian dan upload foto orang terlebih dahulu");
      return;
    }
    setGenerating(true);
    setGenerateError(null);
    setGeneratedResult(null);
    try {
      const clothingUrl = `${BACKEND_BASE_URL}/uploads/${selectedClothingItem.image}`;
      const response = await fetch(`${BACKEND1_URL}/api/tryon`, {
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
    const selectedClothingItem = getSelectedClothingItem();
    if (!selectedClothingItem || !uploadedPersonImageUrl) {
      alert("Pilih pakaian dan upload foto orang terlebih dahulu");
      return;
    }
    setGenerating(true);
    setGenerateError(null);
    try {
      const clothingUrl = `${BACKEND_BASE_URL}/uploads/${selectedClothingItem.image}`;
      const response = await fetch(`${BACKEND1_URL}/api/tryon`, {
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
      <div className="flex items-center justify-center min-h-[400px] bg-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto border-black"></div>
          <p className="text-lg text-black font-semibold">
            Memuat data pakaian...
          </p>
        </div>
      </div>
    );
  }

  const selectedClothingItem = getSelectedClothingItem();

  return (
    <>
      <div className="p-4 bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="bg-white hover:bg-gray-100 text-black border-gray-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-black">
              Virtual Try-On
            </h1>
            <p className="text-base text-gray-700 font-medium">
              Coba pakaian secara virtual dengan AI
            </p>
          </div>
        </div>

        {/* Main Layout: TryOn kiri, Sidebar kanan 35% */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: TryOn Content */}
          <div className="w-full lg:w-[65%]">
            <div className="relative bg-white p-0 overflow-hidden border border-gray-200">
              {/* Main Image */}
              <div className="relative">
                {uploadedPersonImage ? (
                  <img
                    src={uploadedPersonImage.preview}
                    alt="Uploaded person"
                    className="w-full h-[80vh] object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-[80vh] flex items-center justify-center transition-colors cursor-pointer ${
                      dragActive
                        ? "border-black bg-gray-100"
                        : "border-gray-300 bg-white"
                    } hover:border-black hover:bg-gray-100`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-center text-gray-500">
                      <Camera className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg font-medium">Upload foto orang</p>
                      <p className="text-sm mt-2">Drag & drop atau klik untuk memilih file</p>
                      <p className="text-xs mt-1 text-gray-400">Format: JPG, PNG, GIF (Max 5MB)</p>
                    </div>
                  </div>
                )}

                {/* AI Mirror Toggle */}
                {generatedResult && generatedResult.resultUrl && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-2 rounded-lg flex items-center gap-2">
                    <span className="text-sm font-medium">AI Mirror</span>
                    <button
                      onClick={() => setAiMirrorEnabled(!aiMirrorEnabled)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        aiMirrorEnabled ? 'bg-black' : 'bg-gray-400'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          aiMirrorEnabled ? 'translate-x-5' : 'translate-x-1'
                        }`}
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
                      className="w-24 h-24 object-cover rounded-lg border-2 border-white"
                    />
                  </div>
                )}

                {/* Swap Image Button */}
                {generatedResult && generatedResult.resultUrl && uploadedPersonImage && (
                  <Button
                    onClick={() => {
                      if (generatedResult && generatedResult.resultUrl && uploadedPersonImage) {
                        const tempPreview = uploadedPersonImage.preview;
                        setUploadedPersonImage({
                          ...uploadedPersonImage,
                          preview: generatedResult.resultUrl
                        });
                        setGeneratedResult({
                          ...generatedResult,
                          resultUrl: tempPreview
                        });
                      }
                    }}
                    className="absolute bottom-4 right-4 bg-white hover:bg-gray-100 text-black rounded-full w-12 h-12 p-0 border border-gray-300"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </Button>
                )}

                {/* Remove Image Button */}
                {uploadedPersonImage && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-4 right-4"
                    onClick={removeUploadedImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="p-4 bg-white border-t">
                  <div className="flex flex-col items-center gap-2 w-full">
                    <Loader2 className="h-5 w-5 animate-spin text-black" />
                    <span className="text-black font-medium text-sm">
                      Mengupload foto orang...
                    </span>
                    <div className="w-full bg-gray-200 rounded-lg h-2 mt-2 overflow-hidden">
                      <div
                        className="bg-black h-full rounded-lg transition-all"
                        style={{
                          width: `${uploadProgress}%`,
                          transition: "width 0.2s",
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-semibold">
                      {uploadProgress}%
                    </span>
                  </div>
                </div>
              )}

              {/* Upload Error */}
              {uploadError && (
                <div className="p-4 bg-white border-t">
                  <div className="text-red-500 text-sm font-semibold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {uploadError}
                  </div>
                </div>
              )}

              {/* Generate Buttons */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-3">
                  <Button
                    onClick={handleGenerate}
                    disabled={
                      !selectedClothingItem ||
                      !uploadedPersonImageUrl ||
                      uploading ||
                      generating
                    }
                    className="flex-1 bg-black text-white font-bold hover:bg-gray-800 transition"
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
                    className="flex-1 bg-gray-800 text-white font-bold hover:bg-black transition"
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
                  <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-200 rounded-lg mt-3">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <p className="text-sm text-red-500 font-semibold">
                      {generateError}
                    </p>
                  </div>
                )}
              </div>

              {/* Output Thumbnail */}
              {generatedResult && generatedResult.resultUrl && (
                <div className="p-4 bg-white border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-black">Output:</span>
                      <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200">
                        <img
                          src={generatedResult.resultUrl}
                          alt="Generated output"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleDownloadResult}
                      size="sm"
                      className="bg-black hover:bg-gray-800 text-white"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
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