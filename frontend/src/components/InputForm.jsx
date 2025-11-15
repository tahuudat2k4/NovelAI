import React, { useState, useEffect } from 'react';
import { createStory, saveStory } from '../services/storyServices';
import ExportStoryPDF from './ExportStoryPDF';
import { ChevronDown } from 'lucide-react';

const InputForm = ({ setSelectedOption, setStory, story, formData, setFormData }) => {
  // Nhận tham số từ URL để điền sẵn vào form để tiếp tục tạo truyện
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  const genre = params.get("genre") || "";
  const length = params.get("length") || "";
  const description = params.get("description") || "";
  const isContinue = params.get("isContinue") === "true";

  setFormData({
    genre,
    length,
    setting: "",
    characters: "",
    description: isContinue
      ? description + "\n\nContinue this story based on the previous data."
      : description,
  });
}, []);

  const GENRES = ["Horror", "Romance", "Fiction", "Comedy", "Mystery", "Historical", "Science Fiction", "Fantasy"];
  const LENGTHS = [
    { value: "500", label: "500 words" },
    { value: "700", label: "700 words" },
    { value: "1000", label: "1000 words" },
  ];

  const [loading, setLoading] = useState(false);
  // Xử lý thay đổi input 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
  // Xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStory("");
    console.log(formData);

    try {
      const result = await createStory(formData); // 👈 gọi API từ service
      setStory(result.story || result); // 👈 backend trả text hoặc object
    } catch (err) {
      console.error("Lỗi tạo truyện:", err);
      setStory("⚠️ Có lỗi xảy ra khi tạo truyện. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  }
  // xử lý tạo lại truyện
  const handleRegenerate = async () => {
    setLoading(true);
    setStory("");
    try {
      const result = await createStory(formData);
      setStory(result.story || result);
    } catch (err) {
      console.error("Lỗi khi tạo lại truyện:", err);
      setStory("⚠️ Có lỗi xảy ra khi tạo lại truyện. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };
  // Xử lý lưu truyện 
  const handleSaveStory = async () => {
    if (!story) return;
    // Logic để lưu truyện vào database
    try {
      const storyData = {
        title: formData.description.slice(0, 30) + "...", // ví dụ đặt tiêu đề tự động
        genre: formData.genre,
        length: formData.length + " từ",
        content: story,
      };
      // Goi API lưu truyện
      const result = await saveStory(storyData);
      alert("✅ Lưu truyện thành công!");
      console.log(result);
    } catch (err) {
      console.error("Lỗi khi lưu truyện:", err);
      alert("⚠️ Có lỗi xảy ra khi lưu truyện. Vui lòng thử lại!");
    }
  }
  // Trạng thái của mở rộng
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="m-7 p-9 bg-slate-900/50 rounded-lg shadow-md border border-purple-500/20">
        <form onSubmit={ handleSubmit }>
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Thể loại */ }
            <div className="w-1/6">
              <label className="block text-white mb-2" htmlFor="textInput">Genre</label>
              <select
                id="genre"
                name="genre"
                required
                value={ formData.genre }
                onChange={ handleChange }
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose genre</option>
                { GENRES.map((genre, index) => (
                  <option key={ index } value={ genre }>{ genre }</option>
                )) }
              </select>
            </div>

            {/* Độ dài */ }
            <div className="w-1/6">
              <label className="block text-white mb-2" htmlFor="length">Length</label>
              <select
                id="length"
                name="length"
                required
                value={ formData.length }
                onChange={ handleChange }
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose length</option>
                { LENGTHS.map((option, index) => (
                  <option key={ index } value={ option.value }>{ option.label }</option>
                )) }
              </select>
            </div>

            {/* Bối cảnh */ }
            <div className="flex-1">
              <label className="block text-white mb-2" htmlFor="setting">Setting</label>
              <input
                type="text"
                id="setting"
                name="setting"
                required
                value={ formData.setting }
                onChange={ handleChange }
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="E.g: An ancient city, a peaceful village..."
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            {/* Nhân vật */ }
            <div className="flex-1">
              <label className="block text-white mb-2" htmlFor="characters">Character</label>
              <input
                type="text"
                id="characters"
                name="characters"
                required
                value={ formData.characters }
                onChange={ handleChange }
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="E.g: A brave blacksmith, a mysterious girl..."
              />
            </div>
          </div>

          {/* Mô tả */ }
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              required
              value={ formData.description }
              onChange={ handleChange }
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="Describe the story you want to create in detail..."
            ></textarea>
          </div>

          {/* Nút gửi */ }
          <button
            type="submit"
            className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors duration-200"
          >
            { loading ? <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Story is being created...
            </div> : "Generate Story" }
          </button>
        </form>
      </div>
      {/* Kết quả */ }
      { story && (
        <div className="m-7 p-10 bg-gray-900 text-white rounded-md whitespace-pre-line border border-green-500/20">
          <h3 className="text-xl font-bold mb-2 text-purple-400">📖 Your story:</h3>
          <p>{ story }</p>
          <div className="flex mt-9">
            {/* Lưu truyện */ }
            <button type='submit' onClick={ handleSaveStory }
              className="flex cursor-pointer mr-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors duration-200"
            >💾 Save the story</button>
            {/* Mở rộng (tạo ảnh, tạo audio, tạo video) */ }
            <button
              onClick={ () => setOpen(!open) }
              className="cursor-pointer bg-gradient-to-r from-green-700 to-green-600 text-white px-4 py-2 rounded-lg 
      hover:from-green-800 hover:to-green-700 flex items-center gap-2 shadow-md mr-4"
            >
              🌿 More options <ChevronDown className="w-4 h-4 pt-1" />
            </button>

            { open && (
              <div className="absolute  left-97 mt-13 w-114  bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden flex flex-row">
                <button onClick={ () => {
                  setSelectedOption("image");
                  setOpen(false);
                } }
                  className="w-38 px-5 py-2 hover:bg-slate-700 cursor-pointer text-base">🖼️ Gen image </button>
                <button
                  onClick={ () => {
                    setSelectedOption("audio");
                    setOpen(false);
                  } }
                  className="w-38 px-5 py-2 hover:bg-slate-700 cursor-pointer text-base">🎧 Gen audio </button>
                <button
                  onClick={ () => {
                    setSelectedOption("video");
                    setOpen(false);
                  } }
                  className="w-38 px-5 py-2 hover:bg-slate-700 cursor-pointer text-base">🎬 Gen video</button>
              </div>
            ) }
            {/* Xuất PDF */ }
            <ExportStoryPDF story={ story } />
            <button type='submit'
              onClick={ handleRegenerate }
              className="cursor-pointer bg-gradient-to-r from-red-800 to-red-600 text-white px-4 py-2 rounded-md hover:from-red-900 hover:to-red-700 transition-colors duration-200"
            > { loading ? "Story is regenerating..." : "🔁 Regenerate story" }</button>
          </div>
        </div>
      ) }
    </>
  )
}

export default InputForm;
