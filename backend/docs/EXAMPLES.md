# Vietnamese Subtitle Feature Examples

## Example 1: Basic Usage with Vietnamese Subtitles

```bash
curl -X POST http://localhost:8080/api/media/video \
  -F "image=@path/to/your/image.png" \
  -F "audio=@path/to/your/audio.mp3" \
  -F "subtitles=Xin chào các bạn, đây là video của tôi"
```

## Example 2: Without Subtitles (Original Behavior)

```bash
curl -X POST http://localhost:8080/api/media/video \
  -F "image=@path/to/your/image.png" \
  -F "audio=@path/to/your/audio.mp3"
```

## Example 3: Multi-line Subtitles

```bash
curl -X POST http://localhost:8080/api/media/video \
  -F "image=@path/to/your/image.png" \
  -F "audio=@path/to/your/audio.mp3" \
  -F "subtitles=Dòng đầu tiên
Dòng thứ hai
Dòng thứ ba"
```

## JavaScript/Frontend Example

```javascript
async function generateVideoWithSubtitles(imageFile, audioFile, subtitleText) {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('audio', audioFile);
  
  // Optional: Add Vietnamese subtitles
  if (subtitleText) {
    formData.append('subtitles', subtitleText);
  }
  
  try {
    const response = await fetch('http://localhost:8080/api/media/video', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Video URL:', result.videoUrl);
      return result.videoUrl;
    } else {
      console.error('Failed to generate video');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage examples:
// With subtitles
const videoUrl = await generateVideoWithSubtitles(
  imageFile, 
  audioFile, 
  'Câu chuyện về một hành trình thú vị'
);

// Without subtitles
const videoUrl2 = await generateVideoWithSubtitles(
  imageFile, 
  audioFile
);
```

## HTML Form Example

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Video Generator with Subtitles</title>
</head>
<body>
  <h1>Generate Video with Vietnamese Subtitles</h1>
  
  <form id="videoForm" enctype="multipart/form-data">
    <div>
      <label>Image:</label>
      <input type="file" name="image" accept="image/*" required>
    </div>
    
    <div>
      <label>Audio:</label>
      <input type="file" name="audio" accept="audio/*" required>
    </div>
    
    <div>
      <label>Vietnamese Subtitles (Optional):</label>
      <textarea name="subtitles" rows="4" cols="50" 
                placeholder="Nhập phụ đề tiếng Việt tại đây..."></textarea>
    </div>
    
    <button type="submit">Generate Video</button>
  </form>
  
  <div id="result"></div>
  
  <script>
    document.getElementById('videoForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(e.target);
      const resultDiv = document.getElementById('result');
      
      resultDiv.innerHTML = 'Generating video...';
      
      try {
        const response = await fetch('http://localhost:8080/api/media/video', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          resultDiv.innerHTML = `
            <h3>Video generated successfully!</h3>
            <video controls width="640">
              <source src="${result.videoUrl}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <p><a href="${result.videoUrl}" download>Download Video</a></p>
          `;
        } else {
          resultDiv.innerHTML = `<p style="color: red;">Failed to generate video</p>`;
        }
      } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
      }
    });
  </script>
</body>
</html>
```

## Common Vietnamese Subtitle Examples

```
"Xin chào các bạn"
"Chào mừng đến với video của tôi"
"Đây là một câu chuyện thú vị"
"Hành trình khám phá thế giới mới"
"Những điều kỳ diệu đang chờ đợi"
"Cảm ơn các bạn đã xem video"
```

## Notes

- Subtitles are burned into the video (hardcoded), not as separate tracks
- The subtitle text will appear for the entire duration of the video
- Vietnamese characters (á, à, ả, ã, ạ, ă, ắ, ằ, ẳ, ẵ, ặ, â, ấ, ầ, ẩ, ẫ, ậ, đ, etc.) are fully supported
- Subtitle styling is fixed (white text with black outline, Arial font)
- For more advanced subtitle features, see the full documentation in [VIDEO_SUBTITLES.md](../docs/VIDEO_SUBTITLES.md)
