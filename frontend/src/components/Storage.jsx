import React, { useEffect, useState } from 'react'
import { Heart, Trash } from "lucide-react"; // icon
import { Card } from "@/components/ui/card"; // card component
import { getSavedStories, deleteStoryById } from '@/services/storyServices';

const Storage = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null); // story đang được mở modal
  useEffect(() => {
    const fetchSavedStories = async () => {
      try {
        const data = await getSavedStories();
        setStories(data.stories || []);
      } catch (error) {
        console.error("Error when retrieving list of saved stories:", error);
      }
    };
    fetchSavedStories();
  }, []);
  // Xoá truyện đã lưu
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story? 😢")) return;
    try {
      await deleteStoryById(id);
      setStories((prev) => prev.filter((story) => story.id !== id));
    } catch (error) {
      console.error("Error when deleting story:", error);
      alert("Failed to delete story 😭");
    }
  };
  return (
    <div className="pl-8 pr-8">
      <h1 className="text-2xl font-bold mb-6 text-white">📚 Created stories :</h1>
      {/* Story Cards Grid */ }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        { stories.map((story) => (
          <Card
            key={ story.id }
            onClick={ () => setSelectedStory(story) } // mở modal
            className="cursor-pointer bg-slate-900/50 border border-purple-500/20 p-4 rounded-2xl hover:scale-[1.02] transition"
          >
            <h3 className="text-lg font-semibold text-purple-300">
              { story.title }
            </h3>
            <p className="text-sm text-gray-400">
              { story.genre } • { story.length }
            </p>
            <p className="text-gray-300 mt-2 line-clamp-3">{ story.content }</p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-500">{ story.date }</span>
              <div className="flex gap-2">
                <Heart className="w-5 h-5 cursor-pointer hover:text-pink-400 transition" />
                <Trash onClick={ () => handleDelete(story.id) }
                  className="w-5 h-5 cursor-pointer hover:text-red-400 transition" />
              </div>
            </div>
          </Card>
        )) }
      </div>
      {/* Modal xem truyện */ }
      { selectedStory && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-slate-900 border border-purple-500/30 rounded-2xl shadow-xl
                    w-full max-w-2xl max-h-[80vh] overflow-hidden">

            {/* Header */ }
            <div className="p-5 border-b border-purple-500/20">
              <h2 className="text-xl font-bold text-purple-300">
                { selectedStory.title }
              </h2>
            </div>

            {/* Content scrollable */ }
            <div className="p-5 overflow-y-auto max-h-[60vh] text-gray-300 whitespace-pre-wrap">
              { selectedStory.content }
            </div>

            {/* Footer buttons */ }
            <div className="p-5 flex justify-between border-t border-purple-500/20">
              <button
                className="cursor-pointer px-4 py-2 bg-red-700 rounded-lg hover:bg-red-500"
                onClick={ () => setSelectedStory(null) }
              >
                Close
              </button>

              <button
                className="cursor-pointer px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500"
                onClick={ () =>
                  window.location.href =
                  `/try?isContinue=true` +
                  `&genre=${encodeURIComponent(selectedStory.genre)}` +
                  `&length=${parseInt(selectedStory.length)}` +
                  `&description=${encodeURIComponent(selectedStory.content)}`
                }
              >
                ✨ Continue Writing
              </button>
            </div>

          </div>
        </div>
      ) }
    </div>
  )
}

export default Storage;
