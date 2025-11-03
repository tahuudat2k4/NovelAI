import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Gửi dữ liệu input lên server để tạo câu chuyện mới
export const createStory = async (storyData) => {
  try {
    const response = await api.post('/stories', storyData); 
    return response.data;
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
};
// Lưu truyện vào “storage”
export const saveStory = async (storyData) => {
  try {
    const response = await api.post("/stories/save", storyData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lưu truyện:", error);
    throw error;
  }
};

// Lấy danh sách truyện đã lưu
export const getSavedStories = async () => {
  try {
    const response = await api.get("/stories");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách truyện:", error);
    throw error;
  }
};
// Xoá truyện đã lưu theo ID
export const deleteStoryById = async (id) => {
  try {
    const response = await api.delete(`/stories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa truyện:", error);
    throw error;
  }
};
// Lấy chi tiết truyện theo ID
export const getStoryById = async (id) => {
  try {
    const response = await api.get(`/stories/${id}`);  
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết truyện:", error);
    throw error;
  }
};
// Gửi dữ liệu lên server để gen ảnh minh hoạ
export const createImage = async (imageData) => {
  try {
    const response = await api.post('/images', imageData); 
    return response.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};