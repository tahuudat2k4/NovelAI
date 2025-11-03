# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ InputForm.jsx│  │  Content.jsx │  │  Storage.jsx │         │
│  └──────┬───────┘  └──────────────┘  └──────────────┘         │
│         │                                                        │
│         │ calls                                                  │
│         ▼                                                        │
│  ┌──────────────────────────────────────────────────┐          │
│  │           Services Layer                          │          │
│  │  ┌─────────────────┐  ┌─────────────────┐       │          │
│  │  │ storyServices   │  │ mediaServices   │       │          │
│  │  └─────────────────┘  └─────────────────┘       │          │
│  └──────────────────────────────────────────────────┘          │
└────────────────────────────┬─────────────────────────────────────┘
                             │ HTTP/REST API
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Node.js/Express)                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │                Routes Layer                       │          │
│  │  ┌─────────────────┐  ┌─────────────────┐       │          │
│  │  │  storyRoutes    │  │  mediaRoutes    │       │          │
│  │  └────────┬────────┘  └────────┬────────┘       │          │
│  └───────────┼──────────────────────┼────────────────┘          │
│              │                      │                            │
│              ▼                      ▼                            │
│  ┌──────────────────────────────────────────────────┐          │
│  │              Controllers Layer                    │          │
│  │  ┌─────────────────┐  ┌─────────────────┐       │          │
│  │  │storyController  │  │ mediaController │       │          │
│  │  └────────┬────────┘  └────────┬────────┘       │          │
│  └───────────┼──────────────────────┼────────────────┘          │
│              │                      │                            │
│              ▼                      ▼                            │
│  ┌──────────────────────────────────────────────────┐          │
│  │               Services Layer                      │          │
│  │  ┌─────────────────┐  ┌─────────────────┐       │          │
│  │  │ geminiService   │  │ storageService  │       │          │
│  │  └─────────────────┘  └─────────────────┘       │          │
│  │  ┌─────────────────┐  ┌─────────────────┐       │          │
│  │  │  imageService   │  │  audioService   │       │          │
│  │  └─────────────────┘  └─────────────────┘       │          │
│  │  ┌─────────────────┐                             │          │
│  │  │  videoService   │                             │          │
│  │  └─────────────────┘                             │          │
│  └──────────────────────────────────────────────────┘          │
└────────────────────────────┬─────────────────────────────────────┘
                             │ External API Calls
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL AI SERVICES                        │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐│
│  │  Gemini API     │  │  Google TTS     │  │  Replicate API  ││
│  │  (Story+Image)  │  │  (Audio)        │  │  (Video)        ││
│  └─────────────────┘  └─────────────────┘  └─────────────────┘│
│  ┌─────────────────┐  ┌─────────────────┐                      │
│  │  ElevenLabs     │  │  Stability AI   │                      │
│  │  (Audio Alt)    │  │  (Video Alt)    │                      │
│  └─────────────────┘  └─────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Story Generation Flow
```
User Input → InputForm → storyServices → Backend API
→ storyController → geminiService → Gemini API
→ Response → Display Story
```

### 2. Image Generation Flow
```
Story Content → Click "Tạo ảnh" → mediaServices.generateImageFromStory()
→ Backend /media/image/from-story → mediaController
→ imageGenerationService → Gemini Imagen API
→ Base64 Image → Display in UI
```

### 3. Audio Generation Flow
```
Story Content → Click "Tạo audio" → mediaServices.generateAudioFromStory()
→ Backend /media/audio/from-story → mediaController
→ audioGenerationService → Google TTS / ElevenLabs API
→ Base64 MP3 → Audio Player in UI
```

### 4. Video Generation Flow
```
Story Content → Click "Tạo video" → mediaServices.generateVideoFromStory()
→ Backend /media/video/from-story → mediaController
→ videoGenerationService → Replicate / Stability API
→ Video ID + Status → Display Status
→ (Later) Check Status → Get Video URL
```

## API Endpoints Structure

```
/api/v1/
├── stories/
│   ├── POST   /              (Generate story)
│   ├── POST   /save          (Save story)
│   ├── GET    /              (Get all stories)
│   └── DELETE /:id           (Delete story)
│
└── media/
    ├── image/
    │   ├── POST /                  (Generate image from prompt)
    │   └── POST /from-story        (Generate image from story)
    │
    ├── audio/
    │   ├── POST /                  (Generate audio from text)
    │   └── POST /from-story        (Generate audio from story)
    │
    └── video/
        ├── POST /                  (Generate video from prompt)
        ├── POST /from-story        (Generate video from story)
        └── GET  /status/:id        (Check video status)
```

## Service Layer Architecture

### Image Generation Service
```javascript
imageGenerationService
├── generateImage(prompt, count)
│   └── Calls Gemini Imagen API
│   └── Returns: Array of base64 images
│
└── generateImageFromStory(storyContent)
    └── Creates prompt from story
    └── Calls generateImage()
    └── Returns: Generated images
```

### Audio Generation Service
```javascript
audioGenerationService
├── generateAudioWithGoogle(text, language)
│   └── Calls Google Cloud TTS API
│   └── Returns: Base64 MP3 audio
│
├── generateAudioWithElevenLabs(text, voiceId)
│   └── Calls ElevenLabs API
│   └── Returns: Audio buffer
│
└── generateAudioFromStory(storyText, language)
    └── Truncates text if needed
    └── Tries Google TTS first
    └── Falls back to ElevenLabs
    └── Returns: Audio data + metadata
```

### Video Generation Service
```javascript
videoGenerationService
├── generateVideoWithReplicate(prompt)
│   └── Calls Replicate API
│   └── Returns: Prediction ID + status
│
├── generateVideoWithStability(imageUrl, prompt)
│   └── Calls Stability AI API
│   └── Returns: Generation ID
│
├── checkVideoStatus(predictionId)
│   └── Polls Replicate/Stability
│   └── Returns: Status + video URL
│
└── generateVideoFromStory(storyContent, imageUrl)
    └── Creates video prompt
    └── Tries Replicate first
    └── Falls back to Stability
    └── Returns: Video generation info
```

## Technology Stack

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.16
- **HTTP Client**: Axios 1.13.1
- **UI Components**: shadcn-ui, Radix UI
- **Routing**: React Router DOM 7.9.4

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.1.0
- **AI SDK**: @google/genai 1.28.0
- **HTTP Client**: Axios 1.7.2
- **Database**: MongoDB (Mongoose 8.19.2)
- **Environment**: dotenv 17.2.3

### External APIs
- **Gemini API**: Story + Image generation
- **Google Cloud TTS**: Audio narration (Vietnamese)
- **ElevenLabs**: Audio narration (English)
- **Replicate**: Video generation
- **Stability AI**: Video generation (alternative)

## Security Considerations

1. **API Keys**: Stored in `.env`, never committed to git
2. **CORS**: Configured in Express middleware
3. **Input Validation**: All endpoints validate required fields
4. **Error Handling**: Centralized error middleware
5. **Rate Limiting**: Should be implemented for production
6. **Content Size**: Limited to 50MB for media uploads

## Scalability Considerations

1. **Async Processing**: Video generation is async
2. **Service Fallbacks**: Multiple providers for each media type
3. **Caching**: Can be added for generated content
4. **Queue System**: Can be added for batch processing
5. **CDN**: Can be used for serving generated media

## Error Handling Strategy

```
Frontend Error → Display user-friendly message
                ↓
Backend Error → Log to console
                ↓
API Error → Catch and transform
                ↓
Return structured error response
```

## Future Architecture Improvements

1. **Add Redis**: For caching and queue management
2. **Add WebSocket**: For real-time video generation updates
3. **Add S3/Cloud Storage**: For persistent media storage
4. **Add Database Models**: For media metadata
5. **Add Authentication**: User-specific content
6. **Add Rate Limiting**: Prevent API abuse
7. **Add Monitoring**: Track API usage and errors
