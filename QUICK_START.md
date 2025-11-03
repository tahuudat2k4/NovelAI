# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js installed (v16 or higher)
- npm or yarn
- At least one API key (see below)

---

## Step 1: Get API Keys (Choose at least one)

### For Image Generation (Already configured ✅)
- Gemini API key is already set in `.env`
- You can start testing image generation immediately!

### For Audio Generation (Choose one)

**Option A: Google Cloud TTS** (Recommended for Vietnamese)
1. Go to: https://console.cloud.google.com/apis/credentials
2. Create a new project or select existing
3. Enable "Cloud Text-to-Speech API"
4. Create credentials → API Key
5. Copy the key

**Option B: ElevenLabs** (Good for English)
1. Go to: https://elevenlabs.io/
2. Sign up for free account
3. Go to Settings → API Keys
4. Copy the key

### For Video Generation (Optional)

**Replicate** (Recommended)
1. Go to: https://replicate.com/
2. Sign up for free account
3. Go to Account → API Tokens
4. Copy the token

---

## Step 2: Configure Environment

1. Open `/backend/.env` file
2. Add your API keys:

```env
# Already configured ✅
GEMINI_API_KEY=AIzaSyDmxx7Pd2gGDB7tbXt7EA-OWdcvPvcAeBM

# Add your keys here:
GOOGLE_TTS_API_KEY=paste_your_key_here
ELEVENLABS_API_KEY=paste_your_key_here
REPLICATE_API_KEY=paste_your_key_here
```

3. Save the file

---

## Step 3: Install & Run

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```

You should see:
```
🚀 Server is running on http://localhost:8080
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

You should see:
```
VITE ready in XXX ms
Local: http://localhost:5173/
```

---

## Step 4: Test the Application

1. Open browser: http://localhost:5173/
2. Click "Get Started" or navigate to /try
3. Fill in the story form:
   - **Thể loại**: Choose a genre (e.g., "Viễn tưởng")
   - **Độ dài**: Choose length (e.g., "500 từ")
   - **Bối cảnh**: Enter setting (e.g., "Một hành tinh xa xôi")
   - **Nhân vật**: Enter characters (e.g., "Một phi hành gia dũng cảm")
   - **Mô tả**: Enter description (e.g., "Khám phá hành tinh mới")
4. Click **"Generate Story"**
5. Wait for story to generate (10-20 seconds)

---

## Step 5: Test Media Generation

### Test Image Generation (Fastest)
1. After story is generated, click **"📸 Tạo ảnh từ truyện"**
2. Wait 5-10 seconds
3. Image should appear below

### Test Audio Generation
1. Click **"🎵 Tạo audio từ truyện"**
2. Wait 10-20 seconds
3. Audio player should appear
4. Click play to listen

### Test Video Generation (Slowest)
1. Click **"🎬 Tạo video từ truyện"**
2. Wait 2-5 minutes
3. Video status will be displayed

---

## Quick Test with cURL

### Test Backend is Running
```bash
curl http://localhost:8080/health
```

Expected response:
```json
{"status":"OK","message":"Server is running"}
```

### Test Image Generation
```bash
curl -X POST http://localhost:8080/api/v1/media/image/from-story \
  -H "Content-Type: application/json" \
  -d '{"storyContent": "A brave knight in a magical forest"}'
```

### Test Audio Generation
```bash
curl -X POST http://localhost:8080/api/v1/media/audio/from-story \
  -H "Content-Type: application/json" \
  -d '{"storyContent": "Ngày xửa ngày xưa", "language": "vi-VN"}'
```

---

## Troubleshooting

### Backend won't start
```bash
# Check if port 8080 is already in use
lsof -i :8080

# Kill the process if needed
kill -9 <PID>

# Try starting again
npm run dev
```

### Frontend won't start
```bash
# Check if port 5173 is already in use
lsof -i :5173

# Kill the process if needed
kill -9 <PID>

# Try starting again
npm run dev
```

### "API key not configured" error
1. Check `.env` file has the API key
2. Make sure there are no quotes around the key
3. Restart the backend server
4. Clear browser cache

### Image generation fails
1. Verify Gemini API key is correct
2. Check if Imagen is available in your region
3. Try with a simpler prompt
4. Check console for detailed error

### Audio generation fails
1. Verify you added at least one TTS API key
2. Check API key is valid
3. Ensure you haven't exceeded free tier limits
4. Check console for detailed error

---

## What to Test First

### Priority 1: Image Generation ⭐⭐⭐
- Fastest to test
- Already has API key configured
- Good for verifying setup works

### Priority 2: Audio Generation ⭐⭐
- Requires additional API key
- Relatively fast
- Good for testing TTS integration

### Priority 3: Video Generation ⭐
- Requires additional API key
- Very slow (2-5 minutes)
- Test only after others work

---

## Expected Results

### ✅ Success Indicators
- Backend starts without errors
- Frontend loads at localhost:5173
- Story generation works
- At least one media type generates successfully
- No console errors

### ❌ Common Issues
- Port already in use → Kill the process
- API key error → Check .env configuration
- Module not found → Run npm install
- CORS error → Check backend is running

---

## Next Steps

After successful setup:

1. **Read Documentation**
   - `/backend/README_MEDIA_API.md` - API details
   - `/HUONG_DAN_SU_DUNG.md` - Vietnamese guide
   - `/ARCHITECTURE.md` - System architecture

2. **Customize**
   - Modify prompts in services
   - Add new media types
   - Customize UI components

3. **Deploy**
   - Set up production environment
   - Configure production API keys
   - Deploy to Vercel/Heroku/etc.

---

## Quick Reference

### Important URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- Health Check: http://localhost:8080/health

### Important Files
- Backend config: `/backend/.env`
- Frontend config: `/frontend/.env`
- API docs: `/backend/README_MEDIA_API.md`

### Important Commands
```bash
# Backend
cd backend
npm run dev        # Start development server
npm start          # Start production server

# Frontend
cd frontend
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## Support

If you encounter issues:
1. Check console logs (browser + terminal)
2. Verify API keys are correct
3. Ensure all dependencies are installed
4. Check API service status pages
5. Review error messages carefully

---

**Ready to start? Follow Step 1! 🚀**
