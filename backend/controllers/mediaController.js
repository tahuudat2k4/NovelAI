const imageService = require('../services/imageGenerationService');
const audioService = require('../services/audioGenerationService');
const videoService = require('../services/videoGenerationService');
const path = require('path');
/**
 * Generate image from text prompt
 */
const generateImage = async (req, res, next) => {
  try {
    const { prompt} = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: {
          message: 'Prompt is required',
          status: 400
        }
      });
    }

    const images = await imageService.generateImage(prompt);

    res.status(200).json({
      success: true,
      images: images,
      count: images.length
    });
  } catch (error) {
    console.error('Generate Image Error:', error);
    next(error);
  }
};

/**
 * Generate image from story content
 */
const generateImageFromStory = async (req, res, next) => {
  try {
    const { storyContent } = req.body;

    if (!storyContent) {
      return res.status(400).json({
        error: {
          message: 'Story content is required',
          status: 400
        }
      });
    }

    const images = await imageService.generateImageFromStory(storyContent);

    res.status(200).json({
      success: true,
      images: images,
      message: 'Image generated from story successfully'
    });
  } catch (error) {
    console.error('Generate Image from Story Error:', error);
    next(error);
  }
};
/**
 * Generate audio from story content
 */
const generateAudioFromStory = async (req, res, next) => {
  try {
    const { storyContent , voice} = req.body;

    if (!storyContent) {
      return res.status(400).json({
        error: {
          message: 'Story content is required',
          status: 400
        }
      });
    }

    const result = await audioService.generateAudioFromStory(storyContent, voice);

    res.status(200).json({
      success: true,
      audioUrl: result.audioUrl,
      provider: result.provider,
      format: result.format,
      duration: result.duration,
      characterCount: result.characterCount,
      message: 'Audio narration generated successfully'
    });
  } catch (error) {
    console.error('Generate Audio from Story Error:', error);
    next(error);
  }
};
/**
 * Generate video from story content
 */
const generateVideoFromFormData = async (req, res, next) => {
  try {
     // multer sẽ lưu file trong req.files
    const { image, audio } = req.files;
    const { subtitles } = req.body; // Lấy subtitle text từ body

    if (!image || !audio) {
      return res.status(400).json({
        error: {
          message: 'Both image and audio files are required',
          status: 400
        }
      });
    }

    // gọi service để gen video, truyền buffer hoặc đường dẫn tạm
    const result = await videoService.generateVideo({
      image: image[0], // multer trả về array
      audio: audio[0],
      subtitles: subtitles || null // Truyền subtitle nếu có
    });
    // result.videoPath = đường dẫn file cục bộ trên server
    const videoFileName = path.basename(result.videoPath); // lấy tên file
    res.status(200).json({
      success: true,
      videoUrl: `http://localhost:8080/temp/${videoFileName}`, // trả về URL truy cập file
      message: subtitles 
        ? 'Video with subtitles generation started. This may take a few minutes.'
        : 'Video generation started. This may take a few minutes.'
    });
  } catch (error) {
    console.error('Generate Video from Story Error:', error);
    next(error);
  }
};

module.exports = {
  generateImage,
  generateImageFromStory,
  generateAudioFromStory,
  generateVideoFromFormData
};