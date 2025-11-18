import React, { useState } from 'react';
import { createNovel } from '../services/novelServices';

const NovelInputForm = ({ onNovelCreated }) => {
  const GENRES = ["Horror", "Romance", "Fiction", "Comedy", "Mystery", "Historical", "Science Fiction", "Fantasy"];

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    totalChapters: '',
    wordsPerChapter: '',
    setting: '',
    characters: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const novelData = {
        title: formData.title || formData.description.substring(0, 50) + '...',
        genre: formData.genre,
        totalChapters: parseInt(formData.totalChapters),
        wordsPerChapter: parseInt(formData.wordsPerChapter),
        setting: formData.setting,
        characters: formData.characters,
        description: formData.description
      };

      const result = await createNovel(novelData);
      
      if (result.success && onNovelCreated) {
        onNovelCreated(result.novel);
      }
    } catch (err) {
      console.error("Error creating novel:", err);
      alert("⚠️ Error creating novel blueprint. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-7 p-9 bg-slate-900/50 rounded-lg shadow-md border border-purple-500/20">
      <h2 className="text-2xl font-bold text-purple-400 mb-6">📚 Create a New Novel</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="title">Novel Title (Optional)</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="E.g: The Chronicles of Dawn"
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          {/* Genre */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-white mb-2" htmlFor="genre">Genre *</label>
            <select
              id="genre"
              name="genre"
              required
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Choose genre</option>
              {GENRES.map((genre, index) => (
                <option key={index} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* Total Chapters */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-white mb-2" htmlFor="totalChapters">Number of Chapters *</label>
            <input
              type="number"
              id="totalChapters"
              name="totalChapters"
              required
              min="1"
              max="100"
              value={formData.totalChapters}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="E.g: 10"
            />
          </div>

          {/* Words per Chapter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-white mb-2" htmlFor="wordsPerChapter">Words per Chapter *</label>
            <input
              type="number"
              id="wordsPerChapter"
              name="wordsPerChapter"
              required
              min="100"
              max="5000"
              value={formData.wordsPerChapter}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="E.g: 1000"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          {/* Setting */}
          <div className="flex-1">
            <label className="block text-white mb-2" htmlFor="setting">Setting *</label>
            <input
              type="text"
              id="setting"
              name="setting"
              required
              value={formData.setting}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="E.g: A medieval kingdom at the brink of war"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          {/* Characters */}
          <div className="flex-1">
            <label className="block text-white mb-2" htmlFor="characters">Main Characters *</label>
            <input
              type="text"
              id="characters"
              name="characters"
              required
              value={formData.characters}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="E.g: A brave knight, a cunning mage, a wise queen"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="description">Story Description *</label>
          <textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
            placeholder="Describe the overall plot and theme of your novel..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Story Blueprint...
            </div>
          ) : "Create Novel Blueprint"}
        </button>
      </form>
    </div>
  );
};

export default NovelInputForm;
