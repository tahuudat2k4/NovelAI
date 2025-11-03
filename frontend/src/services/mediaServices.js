import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

/**
 * Generate image from text prompt
 * @param {string} prompt - Text description for image
 * @param {number} numberOfImages - Number of images to generate
 * @returns {Promise} API response with generated images
 */
export const generateImage = async (prompt, numberOfImages = 1) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/media/image`, {
      prompt,
      numberOfImages
    });
    return response.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error.response?.data || error;
  }
};

/**
 * Generate image from story content
 * @param {string} storyContent - Story text to visualize
 * @returns {Promise} API response with generated image
 */
export const generateImageFromStory = async (storyContent) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/media/image/from-story`, {
      storyContent
    });
    return response.data;
  } catch (error) {
    console.error('Error generating image from story:', error);
    throw error.response?.data || error;
  }
};

/**
 * Generate audio narration from text
 * @param {string} text - Text to convert to speech
 * @param {string} language - Language code (default: 'vi-VN')
 * @returns {Promise} API response with audio data
 */
export const generateAudio = async (text, language = 'vi-VN') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/media/audio`, {
      text,
      language
    });
    return response.data;
  } catch (error) {
    console.error('Error generating audio:', error);
    throw error.response?.data || error;
  }
};

/**
 * Generate audio narration from story
 * @param {string} storyContent - Story text to narrate
 * @param {string} language - Language code
 * @returns {Promise} API response with audio data
 */
export const generateAudioFromStory = async (storyContent, language = 'vi-VN') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/media/audio/from-story`, {
      storyContent,
      language
    });
    return response.data;
  } catch (error) {
    console.error('Error generating audio from story:', error);
    throw error.response?.data || error;
  }
};

/**
 * Generate video from text prompt
 * @param {string} prompt - Text description for video
 * @param {string} imageUrl - Optional base image URL
 * @returns {Promise} API response with video generation info
 */
export const generateVideo = async (prompt, imageUrl = null) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/media/video`, {
      prompt,
      imageUrl
    });
    return response.data;
  } catch (error) {
    console.error('Error generating video:', error);
    throw error.response?.data || error;
  }
};

/**
 * Generate video from story content
 * @param {string} storyContent - Story text to visualize
 * @param {string} imageUrl - Optional base image URL
 * @returns {Promise} API response with video generation info
 */
export const generateVideoFromStory = async (storyContent, imageUrl = null) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/media/video/from-story`, {
      storyContent,
      imageUrl
    });
    return response.data;
  } catch (error) {
    console.error('Error generating video from story:', error);
    throw error.response?.data || error;
  }
};

/**
 * Check video generation status
 * @param {string} videoId - Video generation ID
 * @returns {Promise} API response with video status
 */
export const checkVideoStatus = async (videoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/media/video/status/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error checking video status:', error);
    throw error.response?.data || error;
  }
};

/**
 * Convert base64 audio to playable blob URL
 * @param {string} base64Audio - Base64 encoded audio
 * @returns {string} Blob URL for audio playback
 */
export const createAudioBlobUrl = (base64Audio) => {
  try {
    const binaryString = atob(base64Audio);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'audio/mp3' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error creating audio blob:', error);
    throw error;
  }
};

export default {
  generateImage,
  generateImageFromStory,
  generateAudio,
  generateAudioFromStory,
  generateVideo,
  generateVideoFromStory,
  checkVideoStatus,
  createAudioBlobUrl
};
