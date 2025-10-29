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
// (Tuỳ chọn) Lưu truyện vào “storage”
export const saveStory = async (storyData) => {
  try {
    const response = await api.post("/stories/save", storyData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lưu truyện:", error);
    throw error;
  }
};

// (Tuỳ chọn) Lấy danh sách truyện đã lưu
export const getSavedStories = async () => {
  try {
    const response = await api.get("/stories");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách truyện:", error);
    throw error;
  }
};