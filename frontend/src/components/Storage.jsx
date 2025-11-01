import React, { useEffect, useState } from 'react'
import { Heart, Trash } from "lucide-react"; // icon
import { Card } from "@/components/ui/card"; // card component
import { getSavedStories, deleteStoryById } from '@/services/storyServices';

const Storage = () => {
    const [stories, setStories] = useState([]);
    useEffect(() => {
        const fetchSavedStories = async () => {
            try {
                const data = await getSavedStories();
                setStories(data.stories || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách truyện đã lưu:", error);
            } };
        fetchSavedStories();
    }, []);
    // Xoá truyện đã lưu
    const handleDelete = async (id) => {
    if (!window.confirm("Cậu chắc muốn xoá truyện này chứ? 😢")) return;
    try {
      await deleteStoryById(id);
      setStories((prev) => prev.filter((story) => story.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa truyện:", error);
      alert("Xóa truyện thất bại rồi 😭");
    }
  };
    return (
        <div className="pl-8 pr-8">
      <h1 className="text-2xl font-bold mb-6 text-white">📚 Truyện đã tạo :</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card
            key={story.id}
            className="bg-slate-900/50 border border-purple-500/20 p-4 rounded-2xl hover:scale-[1.02] transition"
          >
            <h3 className="text-lg font-semibold text-purple-300">
              {story.title}
            </h3>
            <p className="text-sm text-gray-400">
              {story.genre} • {story.length}
            </p>
            <p className="text-gray-300 mt-2 line-clamp-3">{story.content}</p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-500">{story.date}</span>
              <div className="flex gap-2">
                <Heart className="w-5 h-5 cursor-pointer hover:text-pink-400 transition" />
                <Trash onClick={() => handleDelete(story.id)}
                 className="w-5 h-5 cursor-pointer hover:text-red-400 transition" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
    )
}

export default Storage;
