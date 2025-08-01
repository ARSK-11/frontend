import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Camera,
  Shirt,
  CheckCircle,
  X,
  AlertCircle,
  Eye,
  Download,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BACKEND_BASE_URL = "https://backend2-1-t2fh.onrender.com";
const BACKEND_USER_URL = "https://backend-user-ftr6.onrender.com";
const BACKEND1_URL = "http://localhost:3000";

export default function TryOnPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedClothing = location.state?.selectedClothing;

  const [uploadedPersonImage, setUploadedPersonImage] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClothingItem, setSelectedClothingItem] = useState(
    selectedClothing || null
  );
  const [generating, setGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [generateError, setGenerateError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedPersonImageUrl, setUploadedPersonImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchClothingItems();
  }, []);

  const fetchClothingItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_BASE_URL}/api/clothing`);
      const data = await response.json();
      if (data.success) {
        setClothingItems(data.data);
      } else {
        setError("Gagal memuat data pakaian");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (file) => {
    if (file && file.type.startsWith("image/")) {
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
              } else {
                setUploadError(
                  "Gagal upload foto orang: " +
                    (data && data.error ? data.error : "Unknown error")
                );
              }
              resolve();
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
        setUploadError("Gagal upload foto orang: " + err.message);
      } finally {
        setUploading(false);
        setTimeout(() => setUploadProgress(0), 1000);
      }
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeUploadedImage = () => {
    setUploadedPersonImage(null);
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
        result.status === "READY" &&
        result.media_urls &&
        result.media_urls.length > 0
      ) {
        setGeneratedResult({
          eventId: result.event_id,
          resultUrl: result.media_urls[0],
          status: result.status,
        });
      } else {
        setGenerateError(
          "Gagal menghasilkan hasil try-on: " +
            (result.error || "Unknown error")
        );
      }
    } catch (err) {
      setGenerateError("Error: " + err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadResult = () => {
    if (generatedResult && generatedResult.resultUrl) {
      const link = document.createElement("a");
      link.href = generatedResult.resultUrl;
      link.download = `tryon-result-${Date.now()}.jpg`;
      link.click();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-indigo-100 via-white to-pink-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto border-indigo-400"></div>
          <p className="text-lg text-indigo-500 font-semibold">
            Memuat data pakaian...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-indigo-50 via-white to-pink-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/")}
          className="shadow-md bg-white/80 hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700 drop-shadow">
            Virtual Try-On
          </h1>
          <p className="text-base text-indigo-400 font-medium">
            Coba pakaian secara virtual dengan AI
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Clothing Selection & Upload */}
        <div className="space-y-8">
          {/* Clothing Selection */}
          <Card className="shadow-lg border-2 border-indigo-100 bg-white/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <Shirt className="h-5 w-5" />
                Pilih Pakaian
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select
                className="w-full border-2 border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 transition"
                value={selectedClothingItem?.id || ""}
                onChange={(e) => {
                  const item = clothingItems.find(
                    (item) => item.id.toString() === e.target.value
                  );
                  setSelectedClothingItem(item);
                }}
              >
                <option value="">Pilih pakaian untuk dicoba</option>
                {clothingItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.desc}
                  </option>
                ))}
              </select>
              {selectedClothingItem && (
                <div className="border-2 border-indigo-100 rounded-xl p-4 bg-indigo-50/50 shadow-inner">
                  <div className="aspect-square overflow-hidden rounded-xl mb-3 border border-indigo-200">
                    <img
                      src={`${BACKEND_BASE_URL}/uploads/${selectedClothingItem.image}`}
                      alt={selectedClothingItem.desc}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-indigo-700">
                    {selectedClothingItem.desc}
                  </h3>
                  <p className="text-xs text-indigo-400">
                    ID: {selectedClothingItem.id}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Person Image Upload */}
          <Card className="shadow-lg border-2 border-indigo-100 bg-white/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <Camera className="h-5 w-5" />
                Upload Foto Orang
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!uploadedPersonImage ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                    dragActive
                      ? "border-indigo-400 bg-indigo-50"
                      : "border-indigo-200 bg-white/80"
                  } hover:border-indigo-400 hover:bg-indigo-50`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    boxShadow:
                      dragActive &&
                      "0 0 0 4px rgba(99,102,241,0.15), 0 2px 8px 0 rgba(99,102,241,0.08)",
                  }}
                >
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center shadow">
                      <Camera className="h-8 w-8 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-base text-indigo-500 font-medium">
                        Drag & drop foto di sini, atau{" "}
                        <span className="text-indigo-600 underline cursor-pointer">
                          pilih file
                        </span>
                      </p>
                      <p className="text-xs text-indigo-400 mt-1">
                        Format: JPG, PNG, WebP (Max 5MB)
                      </p>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative group">
                    <img
                      src={uploadedPersonImage.preview}
                      alt="Uploaded person"
                      className="w-full h-64 object-cover rounded-xl border-2 border-indigo-200 shadow-lg group-hover:brightness-90 transition"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 shadow"
                      onClick={removeUploadedImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-indigo-500 font-medium">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {uploadedPersonImage.name}
                  </div>
                </div>
              )}
              {uploading && (
                <div className="flex flex-col items-center gap-2 mb-2 w-full">
                  <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
                  <span className="text-indigo-500 font-medium">
                    Mengupload foto orang...
                  </span>
                  <div className="w-full bg-indigo-100 rounded-lg h-3 mt-2 overflow-hidden">
                    <div
                      className="bg-indigo-400 h-full rounded-lg transition-all"
                      style={{
                        width: `${uploadProgress}%`,
                        transition: "width 0.2s",
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-indigo-400 font-semibold">
                    {uploadProgress}%
                  </span>
                </div>
              )}
              {uploadError && (
                <div className="text-red-500 text-sm mt-2 font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {uploadError}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-8">
          {/* Generate Button */}
          <Card className="shadow-lg border-2 border-indigo-100 bg-white/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <Sparkles className="h-5 w-5" />
                Generate Try-On
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleGenerate}
                disabled={
                  !selectedClothingItem ||
                  !uploadedPersonImageUrl ||
                  uploading ||
                  generating
                }
                className="w-full bg-gradient-to-r from-indigo-400 to-pink-400 text-white font-bold shadow-lg hover:from-indigo-500 hover:to-pink-500 transition"
                size="lg"
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
              {generateError && (
                <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <p className="text-sm text-red-500 font-semibold">
                    {generateError}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          {generatedResult && (
            <Card className="shadow-xl border-2 border-indigo-100 bg-white/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Hasil Try-On
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-xl border-2 border-indigo-200 shadow-lg">
                  <img
                    src={generatedResult.resultUrl}
                    alt="Try-on result"
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleDownloadResult}
                    className="flex-1 bg-gradient-to-r from-green-400 to-indigo-400 text-white font-bold shadow hover:from-green-500 hover:to-indigo-500"
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(generatedResult.resultUrl, "_blank")
                    }
                    variant="outline"
                    className="bg-white/80 hover:bg-indigo-50 shadow"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-indigo-400">
                  <p>
                    <span className="font-semibold">Event ID:</span>{" "}
                    {generatedResult.eventId}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {generatedResult.status}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}