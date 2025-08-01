# cURL Examples untuk Virtual Try-On API

## 1. Get Clothing List

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

## 2. Get Specific Clothing Image

```bash
curl -X GET http://localhost:3000/api/assets/clothing/PRODUK_20240511095852%20(1).webp \
  --output clothing_image.webp
```

## 3. Generate Virtual Try-On (Basic)

```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "image1": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
    "image2": "http://localhost:3000/api/assets/clothing/PRODUK_20240511095852%20(1).webp"
  }' \
  --output result.jpg
```

## 4. Generate dengan File JSON

### Step 1: Buat file payload
```bash
cat > payload.json << 'EOF'
{
  "image1": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
  "image2": "http://localhost:3000/api/assets/clothing/PRODUK_20240511095852%20(1).webp"
}
EOF
```

### Step 2: Kirim request
```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d @payload.json \
  --output result.jpg
```

## 5. Convert Image to Base64

```bash
# Convert image to base64
base64 -i your_image.jpg > image_base64.txt

# Create payload with your image
cat > payload.json << EOF
{
  "image1": "data:image/jpeg;base64,$(cat image_base64.txt)",
  "image2": "http://localhost:3000/api/assets/clothing/PRODUK_20240511095852%20(1).webp"
}
EOF

# Send request
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d @payload.json \
  --output result.jpg
```

## 6. Testing Error Cases

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

### Invalid Image Format
```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "image1": "invalid_data",
    "image2": "http://localhost:3000/api/assets/clothing/test.jpg"
  }'
```

## 7. Complete Testing Script

```bash
#!/bin/bash

echo "=== Testing Virtual Try-On API ==="

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
    \"image1\": \"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=\",
    \"image2\": \"http://localhost:3000/api/assets/clothing/$FIRST_ITEM\"
  }" \
  --output test_result.jpg

echo "Test completed. Check test_result.jpg"
```

## 8. Advanced Testing dengan Multiple Images

```bash
#!/bin/bash

# Get all clothing items
CLOTHING_LIST=$(curl -s http://localhost:3000/api/assets/clothing | jq -r '.assets[].filename')

# Test with each clothing item
for item in $CLOTHING_LIST; do
    echo "Testing with: $item"
    
    curl -X POST http://localhost:3000/generate \
      -H "Content-Type: application/json" \
      -d "{
        \"image1\": \"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=\",
        \"image2\": \"http://localhost:3000/api/assets/clothing/$item\"
      }" \
      --output "result_${item%.*}.jpg"
    
    echo "Generated: result_${item%.*}.jpg"
done
```

## 9. Performance Testing

```bash
# Test response time
time curl -X GET http://localhost:3000/api/assets/clothing

# Test generate with timing
time curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d @payload.json \
  --output result.jpg
```

## 10. Debug Mode

```bash
# Verbose output
curl -v -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d @payload.json

# Show headers only
curl -I http://localhost:3000/api/assets/clothing/PRODUK_20240511095852%20(1).webp
``` 