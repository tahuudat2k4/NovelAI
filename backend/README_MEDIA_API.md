# Media Generation API Documentation

## Overview
This API provides endpoints for generating images, audio, and video content from text descriptions and stories using various AI services.

## API Endpoints

### Base URL
```
http://localhost:8080/api/v1/media
```

---

## Image Generation

### 1. Generate Image from Prompt
**Endpoint:** `POST /media/image`

**Request Body:**
```json
{
  "prompt": "A beautiful sunset over mountains",
  "numberOfImages": 1
}
```

**Response:**
```json
{
  "success": true,
  "images": ["base64_encoded_image_data"],
  "count": 1
}
```

### 2. Generate Image from Story
**Endpoint:** `POST /media/image/from-story`

**Request Body:**
```json
{
  "storyContent": "Your story text here..."
}
```

**Response:**
```json
{
  "success": true,
  "images": ["base64_encoded_image_data"],
  "message": "Image generated from story successfully"
}
```

---

## Audio Generation

### 3. Generate Audio from Text
**Endpoint:** `POST /media/audio`

**Request Body:**
```json
{
  "text": "Text to convert to speech",
  "language": "vi-VN"
}
```

**Response:**
```json
{
  "success": true,
  "audio": "base64_encoded_audio_data",
  "provider": "google",
  "format": "mp3",
  "duration": 30,
  "characterCount": 450
}
```

### 4. Generate Audio from Story
**Endpoint:** `POST /media/audio/from-story`

**Request Body:**
```json
{
  "storyContent": "Your story text here...",
  "language": "vi-VN"
}
```

**Response:**
```json
{
  "success": true,
  "audio": "base64_encoded_audio_data",
  "provider": "google",
  "format": "mp3",
  "duration": 120,
  "characterCount": 1800,
  "message": "Audio narration generated successfully"
}
```

---

## Video Generation

### 5. Generate Video from Prompt
**Endpoint:** `POST /media/video`

**Request Body:**
```json
{
  "prompt": "A cinematic scene of a forest",
  "imageUrl": "optional_base_image_url"
}
```

**Response:**
```json
{
  "success": true,
  "video": {
    "id": "prediction_id_123",
    "status": "processing",
    "provider": "replicate"
  },
  "message": "Video generation started. Use the ID to check status."
}
```

### 6. Generate Video from Story
**Endpoint:** `POST /media/video/from-story`

**Request Body:**
```json
{
  "storyContent": "Your story text here...",
  "imageUrl": "optional_base_image_url"
}
```

**Response:**
```json
{
  "success": true,
  "video": {
    "id": "prediction_id_456",
    "status": "processing",
    "provider": "replicate"
  },
  "message": "Video generation started. This may take a few minutes."
}
```

### 7. Check Video Status
**Endpoint:** `GET /media/video/status/:id`

**Response:**
```json
{
  "success": true,
  "status": "succeeded",
  "output": "https://video-url.com/video.mp4",
  "error": null
}
```

---

## API Keys Setup

### Required Environment Variables

Create a `.env` file in the backend directory with the following keys:

```env
# Gemini API (for story and image generation)
GEMINI_API_KEY=your_gemini_api_key_here

# Audio Generation (choose one or both)
GOOGLE_TTS_API_KEY=your_google_tts_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Video Generation (choose one)
REPLICATE_API_KEY=your_replicate_api_key_here
STABILITY_API_KEY=your_stability_api_key_here

# Database
MONGODB_URI=your_mongodb_connection_string

# Server
PORT=8080
```

---

## Free API Services

### 1. **Image Generation - Gemini Imagen**
- **Service:** Google Gemini API with Imagen model
- **Free Tier:** Available with Gemini API key
- **Get API Key:** https://makersuite.google.com/app/apikey
- **Model:** `imagen-3.0-generate-001`

### 2. **Audio Generation - Google Cloud Text-to-Speech**
- **Service:** Google Cloud TTS
- **Free Tier:** 1 million characters per month
- **Get API Key:** https://console.cloud.google.com/apis/credentials
- **Supported Languages:** Vietnamese (vi-VN), English (en-US), and more
- **Setup:**
  1. Create a Google Cloud project
  2. Enable Text-to-Speech API
  3. Create API credentials
  4. Copy API key to `.env`

### 3. **Audio Generation - ElevenLabs (Alternative)**
- **Service:** ElevenLabs TTS
- **Free Tier:** 10,000 characters per month
- **Get API Key:** https://elevenlabs.io/
- **Note:** Better for English, limited Vietnamese support

### 4. **Video Generation - Replicate**
- **Service:** Replicate API
- **Free Tier:** Free credits for new accounts
- **Get API Key:** https://replicate.com/account/api-tokens
- **Model:** Stable Video Diffusion
- **Setup:**
  1. Sign up at replicate.com
  2. Get API token from account settings
  3. Add to `.env` file

### 5. **Video Generation - Stability AI (Alternative)**
- **Service:** Stability AI
- **Free Tier:** Limited free access
- **Get API Key:** https://platform.stability.ai/
- **Note:** May require payment for video generation

---

## Installation

### Backend Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file with your API keys (see above)

3. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create `.env` file:
```env
VITE_API_URL=http://localhost:8080/api/v1
```

3. Start the development server:
```bash
npm run dev
```

---

## Testing the API

### Using cURL

**Test Image Generation:**
```bash
curl -X POST http://localhost:8080/api/v1/media/image/from-story \
  -H "Content-Type: application/json" \
  -d '{"storyContent": "A brave knight on a quest"}'
```

**Test Audio Generation:**
```bash
curl -X POST http://localhost:8080/api/v1/media/audio/from-story \
  -H "Content-Type: application/json" \
  -d '{"storyContent": "Ngày xửa ngày xưa...", "language": "vi-VN"}'
```

**Test Video Generation:**
```bash
curl -X POST http://localhost:8080/api/v1/media/video/from-story \
  -H "Content-Type: application/json" \
  -d '{"storyContent": "A magical forest scene"}'
```

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```

Common error codes:
- `400` - Bad Request (missing required fields)
- `401` - Unauthorized (invalid API key)
- `500` - Internal Server Error (API service error)

---

## Usage Limits

### Free Tier Limits:
- **Gemini API:** Rate limits apply
- **Google TTS:** 1M characters/month
- **ElevenLabs:** 10K characters/month
- **Replicate:** Free credits (limited)
- **Stability AI:** Limited free access

### Recommendations:
1. Implement rate limiting on your endpoints
2. Cache generated content when possible
3. Truncate long texts for audio generation
4. Monitor API usage to stay within free tiers

---

## Troubleshooting

### Image Generation Issues:
- Verify Gemini API key is correct
- Check if Imagen model is available in your region
- Ensure prompt is not empty

### Audio Generation Issues:
- Verify TTS API key is configured
- Check character count limits
- Ensure language code is supported

### Video Generation Issues:
- Video generation takes 2-5 minutes
- Check video status using the status endpoint
- Verify API credits are available

---

## Support

For issues or questions:
1. Check API key configuration
2. Review error messages in console
3. Verify API service status
4. Check free tier limits

---

## Future Enhancements

Planned features:
- [ ] Image style customization
- [ ] Multiple voice options for audio
- [ ] Video length customization
- [ ] Batch processing
- [ ] Media storage and management
- [ ] Progress tracking for long operations
