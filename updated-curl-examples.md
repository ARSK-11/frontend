# Updated cURL Examples untuk Virtual Try-On API

## API yang Diperbarui

API sekarang menggunakan endpoint baru:
- **Endpoint**: `https://krsatyam7-virtual-clothing-try-on-new.hf.space/gradio_api/call/swap_clothing`
- **Struktur**: Menggunakan `data` array dengan `path` dan `meta` untuk setiap gambar

## 1. Get Clothing List (Backend Local)

```bash
curl -X GET http://localhost:3000/api/assets/clothing
```

**Response:**
```json
{
  "success": true,
  "count": 9,
  "assets": [
    {
      "filename": "PRODUK_20240511095852 (1).webp",
      "url": "/api/assets/clothing/PRODUK_20240511095852%20(1).webp",
      "size": 31744,
      "extension": ".webp"
    }
  ]
}
```

## 2. Generate Virtual Try-On (Backend Local)

```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "image1": "https://example.com/model.jpg",
    "image2": "http://localhost:3000/api/assets/clothing/PRODUK_20240511095852%20(1).webp"
  }' \
  --output result.jpg
```

## 3. Direct API Call (Tanpa Backend)

### Step 1: Get EVENT_ID
```bash
curl -X POST https://krsatyam7-virtual-clothing-try-on-new.hf.space/gradio_api/call/swap_clothing \
  -s \
  -H "Content-Type: application/json" \
  -d '{
    "data": [
      {"path":"https://example.com/model.jpg","meta":{"_type":"gradio.FileData"}},
      {"path":"https://example.com/clothing.jpg","meta":{"_type":"gradio.FileData"}}
    ]
  }' \
  | awk -F'"' '{ print $4}' \
  | read EVENT_ID
```

### Step 2: Stream Result
```bash
curl -N https://krsatyam7-virtual-clothing-try-on-new.hf.space/gradio_api/call/swap_clothing/$EVENT_ID \
  --output result.jpg
```

## 4. Complete One-Liner Script

```bash
# Get EVENT_ID and stream result in one command
EVENT_ID=$(curl -X POST https://krsatyam7-virtual-clothing-try-on-new.hf.space/gradio_api/call/swap_clothing \
  -s \
  -H "Content-Type: application/json" \
  -d '{
    "data": [
      {"path":"https://example.com/model.jpg","meta":{"_type":"gradio.FileData"}},
      {"path":"https://example.com/clothing.jpg","meta":{"_type":"gradio.FileData"}}
    ]
  }' | awk -F'"' '{ print $4}') && \
curl -N https://krsatyam7-virtual-clothing-try-on-new.hf.space/gradio_api/call/swap_clothing/$EVENT_ID \
  --output result.jpg
```

## 5. Testing dengan Backend Local

### Step 1: Buat payload dengan gambar lokal
```bash
cat > payload.json << 'EOF'
{
  "image1": "https://example.com/model.jpg",
  "image2": "http://localhost:3000/api/assets/clothing/PRODUK_20240511095852%20(1).webp"
}
EOF
```

### Step 2: Kirim request ke backend
```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d @payload.json \
  --output result.jpg
```

## 6. Testing dengan Base64 Images

### Convert image to base64
```bash
# Convert model image
base64 -i model.jpg > model_base64.txt

# Create payload
cat > payload.json << EOF
{
  "image1": "data:image/jpeg;base64,$(cat model_base64.txt)",
  "image2": "http://localhost:3000/api/assets/clothing/PRODUK_20240511095852%20(1).webp"
}
EOF

# Send request
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d @payload.json \
  --output result.jpg
```

## 7. Error Testing

### Missing Parameters
```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{"image1": "test"}'
```

**Expected Response:**
```json
{
  "error": "Missing required parameters: image1, image2"
}
```

### Invalid Image URLs
```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "image1": "https://invalid-url.com/image.jpg",
    "image2": "https://invalid-url.com/clothing.jpg"
  }'
```

## 8. Debug Mode

### Verbose Output
```bash
curl -v -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d @payload.json
```

### Show Headers
```bash
curl -I http://localhost:3000/api/assets/clothing/PRODUK_20240511095852%20(1).webp
```

## 9. Complete Testing Script

```bash
#!/bin/bash

echo "=== Testing Updated Virtual Try-On API ==="

# Test 1: Get clothing list
echo "1. Getting clothing list..."
CLOTHING_RESPONSE=$(curl -s http://localhost:3000/api/assets/clothing)
echo "Response: $CLOTHING_RESPONSE"

# Test 2: Extract first clothing item
FIRST_ITEM=$(echo "$CLOTHING_RESPONSE" | jq -r '.assets[0].filename')
echo "First item: $FIRST_ITEM"

# Test 3: Generate with sample data
echo "3. Testing generate..."
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d "{
    \"image1\": \"https://example.com/model.jpg\",
    \"image2\": \"http://localhost:3000/api/assets/clothing/$FIRST_ITEM\"
  }" \
  --output test_result.jpg

echo "Test completed. Check test_result.jpg"
```

## 10. Performance Testing

```bash
# Test response time
time curl -X GET http://localhost:3000/api/assets/clothing

# Test generate with timing
time curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d @payload.json \
  --output result.jpg
```

## 11. Direct Hugging Face API Testing

```bash
# Test direct API call
curl -X POST https://krsatyam7-virtual-clothing-try-on-new.hf.space/gradio_api/call/swap_clothing \
  -H "Content-Type: application/json" \
  -d '{
    "data": [
      {"path":"https://krsatyam7-virtual-clothing-try-on-new.hf.space/gradio_api/file=/tmp/gradio/976102235954739607dfd77a358093467aeb4fef7b704e6706e0eafa6204cea0/440050457-318b1e52-46af-4b29-9b21-6281a6687302.png","meta":{"_type":"gradio.FileData"}},
      {"path":"https://krsatyam7-virtual-clothing-try-on-new.hf.space/gradio_api/file=/tmp/gradio/4a05b75500c39f5237b7b905f99434aa535fb7ac4eff46888b755e65faca5291/440052371-e34d38d2-88cd-4ee9-a07d-57f544fcbab1.png","meta":{"_type":"gradio.FileData"}}
    ]
  }'
```

## Perbedaan dengan API Sebelumnya

1. **Endpoint**: Berubah dari `onClick` ke `swap_clothing`
2. **Struktur Data**: Menggunakan `data` array dengan `path` dan `meta`
3. **Parameter**: Tidak lagi memerlukan `flag` parameter
4. **URL**: Menggunakan domain baru `krsatyam7-virtual-clothing-try-on-new.hf.space` 