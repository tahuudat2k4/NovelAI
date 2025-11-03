const imageService = require('../services/imageGenerationService');
const audioService = require('../services/audioGenerationService');
const videoService = require('../services/videoGenerationService');

/**
 * Generate image from text prompt
 */
const generateImage = async (req, res, next) => {
  try {
    const { prompt, numberOfImages = 1 } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: {
          message: 'Prompt is required',
          status: 400
        }
      });
    }

    const images = await imageService.generateImage(prompt, numberOfImages);

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
 * Generate audio narration from text
 */
const generateAudio = async (req, res, next) => {
  try {
    const { text, language = 'vi-VN' } = req.body;

    if (!text) {
      return res.status(400).json({
        error: {
          message: 'Text is required',
          status: 400
        }
      });
    }

    const result = await audioService.generateAudioFromStory(text, language);

    res.status(200).json({
      success: true,
      audio: result.audioData,
      provider: result.provider,
      format: result.format,
      duration: result.duration,
      characterCount: result.characterCount
    });
  } catch (error) {
    console.error('Generate Audio Error:', error);
    next(error);
  }
};

/**
 * Generate audio from story content
 */
const generateAudioFromStory = async (req, res, next) => {
  try {
    const { storyContent, language = 'vi-VN' } = req.body;

    if (!storyContent) {
      return res.status(400).json({
        error: {
          message: 'Story content is required',
          status: 400
        }
      });
    }

    const result = await audioService.generateAudioFromStory(storyContent, language);

    res.status(200).json({
      success: true,
      audio: result.audioData,
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
 * Generate video from text prompt
 */
const generateVideo = async (req, res, next) => {
  try {
    const { prompt, imageUrl } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: {
          message: 'Prompt is required',
          status: 400
        }
      });
    }

    const result = await videoService.generateVideoFromStory(prompt, imageUrl);

    res.status(200).json({
      success: true,
      video: result,
      message: 'Video generation started. Use the ID to check status.'
    });
  } catch (error) {
    console.error('Generate Video Error:', error);
    next(error);
  }
};

/**
 * Generate video from story content
 */
const generateVideoFromStory = async (req, res, next) => {
  try {
    const { storyContent, imageUrl } = req.body;

    if (!storyContent) {
      return res.status(400).json({
        error: {
          message: 'Story content is required',
          status: 400
        }
      });
    }

    const result = await videoService.generateVideoFromStory(storyContent, imageUrl);

    res.status(200).json({
      success: true,
      video: result,
      message: 'Video generation started. This may take a few minutes.'
    });
  } catch (error) {
    console.error('Generate Video from Story Error:', error);
    next(error);
  }
};

/**
 * Check video generation status
 */
const checkVideoStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: {
          message: 'Video ID is required',
          status: 400
        }
      });
    }

    const result = await videoService.checkVideoStatus(id);

    res.status(200).json({
      success: true,
      status: result.status,
      output: result.output,
      error: result.error
    });
  } catch (error) {
    console.error('Check Video Status Error:', error);
    next(error);
  }
};

module.exports = {
  generateImage,
  generateImageFromStory,
  generateAudio,
  generateAudioFromStory,
  generateVideo,
  generateVideoFromStory,
  checkVideoStatus
};
