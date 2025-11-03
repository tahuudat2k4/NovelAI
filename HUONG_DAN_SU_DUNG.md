# Hướng Dẫn Sử Dụng Tính Năng Tạo Media

## 🎯 Tổng Quan

Dự án đã được cấu trúc lại để hỗ trợ tạo **ảnh, audio và video** từ truyện sử dụng các API AI miễn phí.

---

## 📋 Các API Miễn Phí Đã Tích Hợp

### 1. **Tạo Ảnh** 📸
- **API**: Gemini Imagen (Google)
- **Miễn phí**: Có (với giới hạn rate)
- **Lấy API key**: https://makersuite.google.com/app/apikey
- **Trạng thái**: ✅ Đã cấu hình sẵn

### 2. **Tạo Audio** 🎵

#### Option 1: Google Cloud Text-to-Speech (Khuyên dùng cho tiếng Việt)
- **Miễn phí**: 1 triệu ký tự/tháng
- **Lấy API key**: https://console.cloud.google.com/apis/credentials
- **Cách lấy key**:
  1. Tạo project trên Google Cloud Console
  2. Bật API "Cloud Text-to-Speech"
  3. Tạo credentials (API key)
  4. Copy key vào file `.env`

#### Option 2: ElevenLabs (Tốt cho tiếng Anh)
- **Miễn phí**: 10,000 ký tự/tháng
- **Lấy API key**: https://elevenlabs.io/
- **Cách lấy key**:
  1. Đăng ký tài khoản
  2. Vào Settings → API Keys
  3. Copy key vào file `.env`

### 3. **Tạo Video** 🎬

#### Option 1: Replicate (Khuyên dùng)
- **Miễn phí**: Credits miễn phí cho tài khoản mới
- **Lấy API key**: https://replicate.com/account/api-tokens
- **Cách lấy key**:
  1. Đăng ký tài khoản tại replicate.com
  2. Vào Account → API Tokens
  3. Copy token vào file `.env`

#### Option 2: Stability AI
- **Miễn phí**: Giới hạn
- **Lấy API key**: https://platform.stability.ai/
- **Lưu ý**: Có thể cần thanh toán cho video generation

---

## ⚙️ Cấu Hình

### Bước 1: Cấu hình Backend

1. Mở file `/backend/.env`
2. Thêm các API key bạn đã lấy:

```env
# Gemini API (đã có sẵn)
GEMINI_API_KEY=AIzaSyDmxx7Pd2gGDB7tbXt7EA-OWdcvPvcAeBM

# Audio - Google TTS (khuyên dùng cho tiếng Việt)
GOOGLE_TTS_API_KEY=your_google_tts_key_here

# Audio - ElevenLabs (tùy chọn, tốt cho tiếng Anh)
ELEVENLABS_API_KEY=your_elevenlabs_key_here

# Video - Replicate (khuyên dùng)
REPLICATE_API_KEY=your_replicate_key_here

# Video - Stability AI (tùy chọn)
STABILITY_API_KEY=your_stability_key_here
```

3. Cài đặt dependencies (đã cài sẵn):
```bash
cd backend
npm install
```

4. Khởi động server:
```bash
npm run dev
```

### Bước 2: Cấu hình Frontend

1. Cài đặt dependencies (đã cài sẵn):
```bash
cd frontend
npm install
```

2. Khởi động frontend:
```bash
npm run dev
```

---

## 🎮 Cách Sử Dụng

### 1. Tạo Truyện
1. Điền form: thể loại, độ dài, bối cảnh, nhân vật, mô tả
2. Click **"Generate Story"**
3. Đợi truyện được tạo

### 2. Tạo Ảnh từ Truyện
1. Sau khi có truyện, click **"📸 Tạo ảnh từ truyện"**
2. Đợi 5-10 giây
3. Ảnh sẽ hiển thị bên dưới

### 3. Tạo Audio từ Truyện
1. Click **"🎵 Tạo audio từ truyện"**
2. Đợi 10-20 giây (tùy độ dài truyện)
3. Audio player sẽ xuất hiện, click play để nghe

### 4. Tạo Video từ Truyện
1. Click **"🎬 Tạo video từ truyện"**
2. Đợi 2-5 phút (video generation rất chậm)
3. Sẽ hiển thị ID và status của video
4. Có thể check status sau bằng API

---

## 🔍 Kiểm Tra API

### Test Tạo Ảnh
```bash
curl -X POST http://localhost:8080/api/v1/media/image/from-story \
  -H "Content-Type: application/json" \
  -d '{"storyContent": "Một hiệp sĩ dũng cảm trong rừng thần tiên"}'
```

### Test Tạo Audio
```bash
curl -X POST http://localhost:8080/api/v1/media/audio/from-story \
  -H "Content-Type: application/json" \
  -d '{"storyContent": "Ngày xửa ngày xưa có một vị vua...", "language": "vi-VN"}'
```

### Test Tạo Video
```bash
curl -X POST http://localhost:8080/api/v1/media/video/from-story \
  -H "Content-Type: application/json" \
  -d '{"storyContent": "Một cảnh rừng thần tiên đầy màu sắc"}'
```

---

## 📊 Giới Hạn Miễn Phí

| Dịch vụ | Giới hạn miễn phí | Ghi chú |
|---------|-------------------|---------|
| Gemini Imagen | Rate limited | Tạo ảnh |
| Google TTS | 1 triệu ký tự/tháng | Tốt cho tiếng Việt |
| ElevenLabs | 10,000 ký tự/tháng | Tốt cho tiếng Anh |
| Replicate | Free credits | Tạo video |
| Stability AI | Giới hạn | Video (thay thế) |

---

## ⚠️ Lưu Ý Quan Trọng

### Tạo Ảnh
- ✅ Nhanh nhất (5-10 giây)
- ✅ Dễ test nhất
- ⚠️ Có thể không khả dụng ở một số khu vực
- 💡 Nếu lỗi "not available", thử VPN hoặc đổi API key

### Tạo Audio
- ✅ Khá nhanh (10-20 giây)
- ✅ Google TTS tốt cho tiếng Việt
- ⚠️ Truyện dài sẽ bị cắt ngắn (max 5000 ký tự)
- 💡 Theo dõi số ký tự đã dùng để không vượt giới hạn

### Tạo Video
- ⏱️ RẤT CHẬM (2-5 phút)
- ⚠️ Xử lý bất đồng bộ
- ⚠️ Credits miễn phí có giới hạn
- 💡 Dùng tiết kiệm, chỉ test khi cần

---

## 🐛 Xử Lý Lỗi

### Lỗi "API key not configured"
**Nguyên nhân**: Chưa cấu hình API key  
**Giải pháp**:
1. Kiểm tra file `.env` có API key chưa
2. Restart server sau khi thêm key
3. Đảm bảo không có dấu ngoặc kép quanh key

### Lỗi "Failed to generate"
**Nguyên nhân**: API key không hợp lệ hoặc hết quota  
**Giải pháp**:
1. Kiểm tra API key còn hoạt động không
2. Kiểm tra đã vượt giới hạn miễn phí chưa
3. Xem log chi tiết trong console
4. Thử API key khác

### Ảnh không hiển thị
**Nguyên nhân**: Gemini Imagen không khả dụng  
**Giải pháp**:
1. Kiểm tra region có hỗ trợ không
2. Thử với prompt đơn giản hơn
3. Kiểm tra API key có quyền tạo ảnh không

### Audio không phát
**Nguyên nhân**: Lỗi decode base64 hoặc format  
**Giải pháp**:
1. Kiểm tra console browser có lỗi không
2. Thử browser khác
3. Kiểm tra audio format (phải là MP3)

### Video quá lâu
**Nguyên nhân**: Video generation chậm là bình thường  
**Giải pháp**:
1. Đợi 2-5 phút
2. Dùng API check status để xem tiến độ
3. Kiểm tra còn credits không

---

## 💡 Mẹo Sử Dụng

1. **Bắt đầu với Tạo Ảnh** - Nhanh và dễ test nhất
2. **Test Audio với văn bản ngắn** - Tiết kiệm quota
3. **Kiên nhẫn với Video** - Mất vài phút là bình thường
4. **Theo dõi usage** - Đừng vượt giới hạn miễn phí
5. **Thêm API key từng cái** - Test từng service một

---

## 📁 Cấu Trúc File Mới

### Backend
```
backend/
├── controllers/
│   └── mediaController.js ✨ MỚI
├── services/
│   ├── imageGenerationService.js ✨ MỚI
│   ├── audioGenerationService.js ✨ MỚI
│   └── videoGenerationService.js ✨ MỚI
├── routes/
│   └── mediaRoutes.js ✨ MỚI
└── server.js (đã cập nhật)
```

### Frontend
```
frontend/src/
├── services/
│   └── mediaServices.js ✨ MỚI
└── components/
    └── InputForm.jsx (đã cập nhật)
```

---

## 🎯 Các Nút Mới Trong UI

Sau khi tạo truyện, bạn sẽ thấy các nút:

1. **💾 Lưu truyện** - Lưu truyện vào database
2. **📸 Tạo ảnh từ truyện** - Tạo ảnh minh họa
3. **🎵 Tạo audio từ truyện** - Tạo audio đọc truyện
4. **🎬 Tạo video từ truyện** - Tạo video từ truyện
5. **📄 Xuất PDF** - Xuất truyện ra PDF
6. **🔁 Tạo lại truyện** - Tạo lại truyện mới

---

## 📚 Tài Liệu

- **API Documentation**: `/backend/README_MEDIA_API.md` (tiếng Anh)
- **Implementation Summary**: `/IMPLEMENTATION_SUMMARY.md` (tiếng Anh)
- **Hướng dẫn này**: `/HUONG_DAN_SU_DUNG.md` (tiếng Việt)

---

## ✅ Checklist Trước Khi Dùng

- [ ] Đã cài đặt dependencies (backend + frontend)
- [ ] Đã lấy ít nhất 1 API key (Google TTS hoặc Replicate)
- [ ] Đã thêm API key vào file `.env`
- [ ] Đã restart server sau khi thêm key
- [ ] Backend đang chạy ở port 8080
- [ ] Frontend đang chạy ở port 5173 (hoặc port Vite mặc định)

---

## 🎉 Kết Quả Mong Đợi

Sau khi hoàn thành setup:
- ✅ Tạo truyện bình thường
- ✅ Click nút tạo ảnh → Ảnh hiển thị sau 5-10s
- ✅ Click nút tạo audio → Audio player xuất hiện, có thể phát
- ✅ Click nút tạo video → Hiển thị ID và status

---

## 🆘 Cần Trợ Giúp?

1. Đọc file `README_MEDIA_API.md` để biết chi tiết API
2. Kiểm tra console (browser + server) để xem lỗi
3. Verify API keys đã đúng format
4. Kiểm tra status của các API service

---

**Ngày cập nhật**: 3 tháng 11, 2025  
**Trạng thái**: ✅ Hoàn thành và sẵn sàng sử dụng  
**Build**: ✅ Đã kiểm tra, không có lỗi
