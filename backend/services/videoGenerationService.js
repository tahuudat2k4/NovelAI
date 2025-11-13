const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);
const generateVideo = async ({ image, audio }) => {
  try {
    // Tạo thư mục tạm
    const tempDir = path.join(__dirname, '../temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    // Lưu file tạm
    const imagePath = path.join(tempDir, `image_${Date.now()}.png`);
    const audioPath = path.join(tempDir, `audio_${Date.now()}.mp3`);
    const videoPath = path.join(tempDir, `video_${Date.now()}.mp4`);

    fs.writeFileSync(imagePath, image.buffer);
    fs.writeFileSync(audioPath, audio.buffer);

    // Dùng ffmpeg ghép ảnh + audio thành video
    await new Promise((resolve, reject) => {
      ffmpeg()
        .addInput(imagePath)
        .loop() // lặp ảnh trong suốt thời gian audio
        .addInput(audioPath)
        .outputOptions([
          '-c:v libx264',
          '-tune stillimage',
          '-c:a aac',
          '-b:a 192k',
          '-pix_fmt yuv420p',
          '-shortest' // dừng video khi audio kết thúc
        ])
        .save(videoPath)
        .on('end', resolve)
        .on('error', reject);
    });

    console.log('✅ Video created:', videoPath);

    
    const videoUrl = `/videos/${path.basename(videoPath)}`;

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