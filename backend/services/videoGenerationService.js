const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * Generate SRT subtitle file from text
 * @param {string} text - Subtitle text content
 * @param {string} filePath - Path to save the SRT file
 * @param {number} duration - Duration of the subtitle in seconds (optional)
 */
const generateSrtFile = (text, filePath, duration = null) => {
  // SRT format:
  // 1
  // 00:00:00,000 --> 00:00:05,000
  // Subtitle text here
  
  let endTime = '00:00:05,000'; // Default 5 seconds
  
  if (duration) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    const milliseconds = Math.floor((duration % 1) * 1000);
    endTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${String(milliseconds).padStart(3, '0')}`;
  }
  
  const srtContent = `1
00:00:00,000 --> ${endTime}
${text}
`;
  
  fs.writeFileSync(filePath, srtContent, 'utf8');
};

/**
 * Get audio duration using ffprobe
 * @param {string} audioPath - Path to audio file
 * @returns {Promise<number>} Duration in seconds
 */
const getAudioDuration = (audioPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(audioPath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata.format.duration);
      }
    });
  });
};

const generateVideo = async ({ image, audio, subtitles = null }) => {
  try {
    // Tạo thư mục tạm
    const tempDir = path.join(__dirname, '../temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    // Lưu file tạm
    const timestamp = Date.now();
    const imagePath = path.join(tempDir, `image_${timestamp}.png`);
    const audioPath = path.join(tempDir, `audio_${timestamp}.mp3`);
    const videoPath = path.join(tempDir, `video_${timestamp}.mp4`);
    const srtPath = subtitles ? path.join(tempDir, `subtitle_${timestamp}.srt`) : null;

    fs.writeFileSync(imagePath, image.buffer);
    fs.writeFileSync(audioPath, audio.buffer);

    // Nếu có subtitle, tạo file SRT
    if (subtitles && srtPath) {
      // Get audio duration to match subtitle duration
      const audioDuration = await getAudioDuration(audioPath);
      generateSrtFile(subtitles, srtPath, audioDuration);
      console.log('✅ Subtitle file created:', srtPath);
    }

    // Dùng ffmpeg ghép ảnh + audio thành video
    await new Promise((resolve, reject) => {
      const ffmpegCommand = ffmpeg()
        .addInput(imagePath)
        .loop() // lặp ảnh trong suốt thời gian audio
        .addInput(audioPath);

      // Nếu có subtitle, thêm filter để burn subtitle vào video
      if (subtitles && srtPath) {
        // Escape đường dẫn file cho Windows và Unix
        const escapedSrtPath = srtPath.replace(/\\/g, '/').replace(/:/g, '\\:');
        
        ffmpegCommand.outputOptions([
          '-c:v libx264',
          '-tune stillimage',
          '-c:a aac',
          '-b:a 192k',
          '-pix_fmt yuv420p',
          `-vf subtitles=${escapedSrtPath}:force_style='FontName=Arial,FontSize=24,PrimaryColour=&HFFFFFF,OutlineColour=&H000000,BorderStyle=1,Outline=2,Shadow=1,MarginV=20'`,
          '-shortest' // dừng video khi audio kết thúc
        ]);
      } else {
        ffmpegCommand.outputOptions([
          '-c:v libx264',
          '-tune stillimage',
          '-c:a aac',
          '-b:a 192k',
          '-pix_fmt yuv420p',
          '-shortest' // dừng video khi audio kết thúc
        ]);
      }

      ffmpegCommand
        .save(videoPath)
        .on('end', () => {
          // Clean up subtitle file after video generation
          if (srtPath && fs.existsSync(srtPath)) {
            fs.unlinkSync(srtPath);
          }
          resolve();
        })
        .on('error', (err) => {
          // Clean up subtitle file on error
          if (srtPath && fs.existsSync(srtPath)) {
            fs.unlinkSync(srtPath);
          }
          reject(err);
        });
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