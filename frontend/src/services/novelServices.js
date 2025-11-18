import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Create a new novel with blueprint
 */
export const createNovel = async (novelData) => {
  try {
    const response = await api.post('/novels', novelData);
    return response.data;
  } catch (error) {
    console.error('Error creating novel:', error);
    throw error;
  }
};

/**
 * Generate next chapter for a novel
 */
export const generateNextChapter = async (novelId, selectedDirection = null) => {
  try {
    const response = await api.post(`/novels/${novelId}/chapters`, { selectedDirection });
    return response.data;
  } catch (error) {
    console.error('Error generating chapter:', error);
    throw error;
  }
};

/**
 * Get novel by ID
 */
export const getNovelById = async (novelId) => {
  try {
    const response = await api.get(`/novels/${novelId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching novel:', error);
    throw error;
  }
};

/**
 * Get all novels
 */
export const getAllNovels = async () => {
  try {
    const response = await api.get('/novels');
    return response.data;
  } catch (error) {
    console.error('Error fetching novels:', error);
    throw error;
  }
};

/**
 * Delete a novel
 */
export const deleteNovel = async (novelId) => {
  try {
    const response = await api.delete(`/novels/${novelId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting novel:', error);
    throw error;
  }
};

/**
 * Get suggestions for next chapter
 */
export const getSuggestions = async (novelId) => {
  try {
    const response = await api.get(`/novels/${novelId}/suggestions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error;
  }
};
