const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);
// Hàm tạo file SRT từ text và duration
const createSRTFile = (text, duration, outputPath) => {
  const words = text.split(' ');
  const wordsPerSubtitle = 10; // 10 từ mỗi lần
  const subtitles = [];
  
  // Chia text thành các đoạn
  for (let i = 0; i < words.length; i += wordsPerSubtitle) {
    subtitles.push(words.slice(i, i + wordsPerSubtitle).join(' '));
  }
  
  const displayDuration = 4.5; // Hiển thị mỗi subtitle 4 giây
  
  let srtContent = '';
  let currentTime = 0;
  
  for (let i = 0; i < subtitles.length; i++) {
    const startTime = currentTime;
    const endTime = currentTime + displayDuration;
    
    // Format thời gian: 00:00:01,000
    const formatTime = (sec) => {
      const h = Math.floor(sec / 3600).toString().padStart(2, '0');
      const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
      const s = Math.floor(sec % 60).toString().padStart(2, '0');
      const ms = Math.floor((sec % 1) * 1000).toString().padStart(3, '0');
      return `${h}:${m}:${s},${ms}`;
    };
    
    srtContent += `${i + 1}\n`;
    srtContent += `${formatTime(startTime)} --> ${formatTime(endTime)}\n`;
    srtContent += `${subtitles[i]}\n\n`;
    
    currentTime = endTime; // Chuyển sang subtitle tiếp theo ngay sau khi hết 4s
  }
  
  fs.writeFileSync(outputPath, srtContent, 'utf8');
  return outputPath;
};
const generateVideo = async ({ image, audio, text }) => {
  try {
    // Tạo thư mục tạm
    const tempDir = path.join(__dirname, '../temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    // Lưu file tạm
    const imagePath = path.join(tempDir, `image_${Date.now()}.png`);
    const audioPath = path.join(tempDir, `audio_${Date.now()}.mp3`);
    const videoPath = path.join(tempDir, `video_${Date.now()}.mp4`);
    const srtPath = path.join(tempDir, `subtitle_${Date.now()}.srt`);

    fs.writeFileSync(imagePath, image.buffer);
    fs.writeFileSync(audioPath, audio.buffer);

     // Lấy duration của audio
    const audioDuration = await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(audioPath, (err, metadata) => {
        if (err) reject(err);
        else resolve(metadata.format.duration);
      });
    });
    // Tạo file SRT với timestamps
    if (text) {
      createSRTFile(text, audioDuration, srtPath);
    }

    // Dùng ffmpeg ghép ảnh + audio thành video
    await new Promise((resolve, reject) => {
      const command = ffmpeg()
        .addInput(imagePath)
        .loop() // lặp ảnh trong suốt thời gian audio
        .addInput(audioPath)
        // Thêm filter subtitle nếu có text
       // Thêm subtitle filter nếu có text
      if (text) {
        // Đường dẫn tuyệt đối và escape cho Windows
        const absoluteSrtPath = path.resolve(srtPath);
        // Thay \ thành / và escape dấu : và \
        const escapedPath = absoluteSrtPath.replace(/\\/g, '/').replace(/:/g, '\\:');
        
        command.videoFilters([
          `subtitles='${escapedPath}':force_style='FontName=Arial,FontSize=24,PrimaryColour=&HFFFFFF&,OutlineColour=&H000000&,Outline=2,Shadow=1,MarginV=30,Alignment=2'`
        ]);
      }
      command
        .outputOptions([
          '-c:v libx264',
          '-tune stillimage',
          '-c:a aac',
          '-b:a 192k',
          '-pix_fmt yuv420p',
          '-shortest' // dừng video khi audio kết thúc
        ])
        .save(videoPath)
         .on('end', () => {
          // Xóa file SRT tạm
          if (fs.existsSync(srtPath)) fs.unlinkSync(srtPath);
          resolve();
        })
        .on('error', reject);
    });

    console.log('✅ Video created:', videoPath);

    return {
      videoPath,        // đường dẫn cục bộ
      videoUrl: `/temp/${path.basename(videoPath)}` // URL dùng frontend 
    };
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
}



module.exports = {
  generateVideo,
};