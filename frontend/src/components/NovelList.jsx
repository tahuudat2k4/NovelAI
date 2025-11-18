import React, { useState, useEffect } from 'react';
import { getAllNovels, deleteNovel, getNovelById } from '../services/novelServices';
import { BookOpen, Trash2, Eye } from 'lucide-react';

const NovelList = ({ onViewNovel }) => {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNovels();
  }, []);

  const fetchNovels = async () => {
    try {
      const result = await getAllNovels();
      if (result.success) {
        setNovels(result.novels || []);
      }
    } catch (err) {
      console.error("Error fetching novels:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (novelId) => {
    if (!window.confirm('Are you sure you want to delete this novel?')) {
      return;
    }

    try {
      await deleteNovel(novelId);
      setNovels(novels.filter(n => n._id !== novelId));
      alert('✅ Novel deleted successfully!');
    } catch (err) {
      console.error("Error deleting novel:", err);
      alert('⚠️ Error deleting novel. Please try again!');
    }
  };

  const handleView = async (novelId) => {
    try {
      const result = await getNovelById(novelId);
      if (result.success && onViewNovel) {
        onViewNovel(result.novel);
      }
    } catch (err) {
      console.error("Error loading novel:", err);
      alert('⚠️ Error loading novel. Please try again!');
    }
  };

  const getProgressColor = (current, total) => {
    const percentage = (current / total) * 100;
    if (percentage === 100) return 'text-green-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-blue-400';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex items-center gap-2 text-purple-400">
          <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading novels...</span>
        </div>
      </div>
    );
  }

  if (novels.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <p className="text-gray-400 text-lg">No novels yet. Create your first novel!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-400 mb-6">Your Novels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {novels.map((novel) => (
          <div
            key={novel._id}
            className="bg-slate-900/50 rounded-lg border border-purple-500/20 p-5 hover:border-purple-500/40 transition-all"
          >
            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
              {novel.title}
            </h3>

            {/* Metadata */}
            <div className="space-y-1 mb-4 text-sm">
              <p className="text-gray-400">
                <span className="text-purple-300">Genre:</span> {novel.genre}
              </p>
              <p className={getProgressColor(novel.currentChapter, novel.totalChapters)}>
                <span className="text-gray-400">Progress:</span> {novel.currentChapter}/{novel.totalChapters} chapters
              </p>
              {novel.isCompleted && (
                <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  ✓ Completed
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                style={{ width: `${(novel.currentChapter / novel.totalChapters) * 100}%` }}
              ></div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleView(novel._id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors text-sm"
              >
                <Eye className="w-4 h-4" />
                {novel.isCompleted ? 'Read' : 'Continue'}
              </button>
              <button
                onClick={() => handleDelete(novel._id)}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                title="Delete novel"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Date */}
            <p className="text-xs text-gray-500 mt-3">
              Created: {new Date(novel.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NovelList;
