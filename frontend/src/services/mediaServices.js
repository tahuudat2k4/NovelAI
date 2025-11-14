import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const generateImage = async (prompt) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/media/image`, {
      prompt,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error.response?.data || error;
  }
};

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
export const generateAudioFromStory = async (storyContent , voice) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/media/audio/from-story`, {
      storyContent, 
      voice
    });
    return response.data;
  } catch (error) {
    console.error('Error generating audio from story:', error);
    throw error.response?.data || error;
  }
};
export const generateVideo = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/media/video`, formData, {
       headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error('Error generating video:', error);
    throw error.response?.data || error;
  }
};


export default {
  generateImage,
  generateImageFromStory,
  generateAudioFromStory,
  generateVideo,
};
