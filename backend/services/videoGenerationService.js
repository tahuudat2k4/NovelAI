const axios = require('axios');

/**
 * Generate video using Replicate API
 * Free tier available with credits
 * @param {string} prompt - Text prompt for video generation
 * @returns {Promise<Object>} Video generation result
 */
const generateVideoWithReplicate = async (prompt) => {
  try {
    const apiKey = process.env.REPLICATE_API_KEY;
    
    if (!apiKey) {
      throw new Error('Replicate API key not configured');
    }

    // Using Stable Video Diffusion model
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: 'stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438',
        input: {
          prompt: prompt,
          num_frames: 25,
          fps: 6,
          motion_bucket_id: 127,
          cond_aug: 0.02
        }
      },
      {
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      id: response.data.id,
      status: response.data.status,
      urls: response.data.urls
    };
  } catch (error) {
    console.error('Replicate Video Error:', error.response?.data || error.message);
    throw new Error(`Failed to generate video with Replicate: ${error.message}`);
  }
};

/**
 * Check video generation status
 * @param {string} predictionId - Prediction ID from Replicate
 * @returns {Promise<Object>} Video status and URL
 */
const checkVideoStatus = async (predictionId) => {
  try {
    const apiKey = process.env.REPLICATE_API_KEY;
    
    const response = await axios.get(
      `https://api.replicate.com/v1/predictions/${predictionId}`,
      {
        headers: {
          'Authorization': `Token ${apiKey}`
        }
      }
    );

    return {
      status: response.data.status,
      output: response.data.output,
      error: response.data.error
    };
  } catch (error) {
    console.error('Check Video Status Error:', error);
    throw error;
  }
};

/**
 * Generate video using Stability AI
 * @param {string} imageUrl - Base image URL for video generation
 * @param {string} prompt - Motion prompt
 * @returns {Promise<Object>} Video generation result
 */
const generateVideoWithStability = async (imageUrl, prompt) => {
  try {
    const apiKey = process.env.STABILITY_API_KEY;
    
    if (!apiKey) {
      throw new Error('Stability AI API key not configured');
    }

    const response = await axios.post(
      'https://api.stability.ai/v2beta/image-to-video',
      {
        image: imageUrl,
        seed: 0,
        cfg_scale: 1.8,
        motion_bucket_id: 127
      },
      {
        headers: {
          'authorization': `Bearer ${apiKey}`,
          'content-type': 'application/json'
        }
      }
    );

    return {
      id: response.data.id,
      status: 'processing'
    };
  } catch (error) {
    console.error('Stability AI Video Error:', error.response?.data || error.message);
    throw new Error(`Failed to generate video with Stability AI: ${error.message}`);
  }
};

/**
 * Generate video from story content
 * Creates a short video visualization of the story
 * @param {string} storyContent - Story text
 * @param {string} imageUrl - Optional base image
 * @returns {Promise<Object>} Video generation result
 */
const generateVideoFromStory = async (storyContent, imageUrl = null) => {
  try {
    // Create a concise prompt for video generation
    const videoPrompt = `Cinematic visualization: ${storyContent.substring(0, 200)}. 
    Style: dramatic, atmospheric, smooth camera movement.`;

    let result;
    let provider;

    // Try Replicate first
    if (process.env.REPLICATE_API_KEY) {
      result = await generateVideoWithReplicate(videoPrompt);
      provider = 'replicate';
    }
    // Fallback to Stability AI if image is provided
    else if (process.env.STABILITY_API_KEY && imageUrl) {
      result = await generateVideoWithStability(imageUrl, videoPrompt);
      provider = 'stability';
    }
    else {
      throw new Error('No video generation API key configured. Please set REPLICATE_API_KEY or STABILITY_API_KEY');
    }

    return {
      ...result,
      provider,
      prompt: videoPrompt
    };
  } catch (error) {
    console.error('Video Generation Error:', error);
    throw error;
  }
};

module.exports = {
  generateVideoWithReplicate,
  generateVideoWithStability,
  checkVideoStatus,
  generateVideoFromStory
};
