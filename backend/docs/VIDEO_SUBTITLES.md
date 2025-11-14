# Video Generation with Vietnamese Subtitles (Vietsub)

## Overview
The video generation service now supports adding Vietnamese subtitles (phụ đề tiếng Việt) to generated videos. Subtitles are burned (hardcoded) into the video output.

## Features
- Vietnamese character support (UTF-8 encoding)
- Automatic subtitle duration matching with audio length
- Professional subtitle styling:
  - Font: Arial, 24pt
  - Color: White text with black outline
  - Position: Bottom center with proper margin
  - High visibility with shadow effect

## API Usage

### Endpoint
```
POST /api/media/video
```

### Request Format
Send a `multipart/form-data` request with the following fields:

**Required Fields:**
- `image` (file): Image file (PNG, JPG, etc.)
- `audio` (file): Audio file (MP3, WAV, etc.)

**Optional Fields:**
- `subtitles` (text): Subtitle text in Vietnamese or any language

### Example using cURL

#### Without Subtitles
```bash
curl -X POST http://localhost:8080/api/media/video \
  -F "image=@/path/to/image.png" \
  -F "audio=@/path/to/audio.mp3"
```

#### With Vietnamese Subtitles
```bash
curl -X POST http://localhost:8080/api/media/video \
  -F "image=@/path/to/image.png" \
  -F "audio=@/path/to/audio.mp3" \
  -F "subtitles=Xin chào, đây là phụ đề tiếng Việt của video"
```

### Example using JavaScript/Fetch

```javascript
const formData = new FormData();
formData.append('image', imageFile); // File object
formData.append('audio', audioFile); // File object
formData.append('subtitles', 'Câu chuyện về một hành trình thú vị'); // Optional

const response = await fetch('http://localhost:8080/api/media/video', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Video URL:', result.videoUrl);
```

### Response Format

```json
{
  "success": true,
  "videoUrl": "http://localhost:8080/temp/video_1234567890.mp4",
  "message": "Video with subtitles generation started. This may take a few minutes."
}
```

## Technical Details

### Subtitle Format
- Uses SRT (SubRip) format internally
- Single subtitle entry spanning the entire video duration
- Automatically synced with audio length

### Subtitle Styling
The subtitles use the following FFmpeg force_style parameters:
- `FontName=Arial` - Clean, readable font
- `FontSize=24` - Large enough for visibility
- `PrimaryColour=&HFFFFFF` - White text
- `OutlineColour=&H000000` - Black outline
- `BorderStyle=1` - Outline border
- `Outline=2` - 2px outline thickness
- `Shadow=1` - Drop shadow for depth
- `MarginV=20` - 20px bottom margin

### Video Processing
1. Image and audio files are saved temporarily
2. If subtitles provided, an SRT file is generated
3. Audio duration is detected using ffprobe
4. FFmpeg combines image + audio + subtitles:
   - Video codec: H.264 (libx264)
   - Audio codec: AAC at 192k bitrate
   - Pixel format: YUV 4:2:0 (yuv420p) for compatibility
   - Subtitles are burned into the video stream
5. Temporary files (including SRT) are cleaned up

## Limitations
- Subtitles are "burned in" (hardcoded), not as separate tracks
- Currently supports single subtitle entry for the entire video
- Subtitle text should be reasonably short to fit on screen

## Future Enhancements
Potential improvements for future versions:
- Support for multiple subtitle entries with timestamps
- Support for SRT file upload
- Configurable subtitle styling (font, size, color, position)
- Subtitle tracks instead of burned-in subtitles
- Support for multiple languages

## Troubleshooting

### Subtitles not appearing
- Ensure the subtitle text is not empty
- Check that FFmpeg has access to the Arial font (or system fonts)
- Verify the subtitle text doesn't contain invalid characters

### Font rendering issues
- The system uses Arial by default
- If Arial is unavailable, FFmpeg will fall back to system default fonts
- For custom fonts, update the `FontName` parameter in `videoGenerationService.js`

### Encoding issues with Vietnamese characters
- The service uses UTF-8 encoding by default
- Ensure your HTTP client sends the request with UTF-8 encoding
- Vietnamese characters (á, à, ả, ã, ạ, ă, ắ, ằ, ẳ, ẵ, ặ, â, ấ, ầ, ẩ, ẫ, ậ, đ, etc.) are fully supported

## Examples of Vietnamese Text

```
"Xin chào các bạn, đây là video của tôi"
"Câu chuyện về một chú mèo dũng cảm"
"Hành trình khám phá thế giới mới"
"Những điều kỳ diệu đang chờ đợi"
```
