import React from 'react'
import { Heart, Trash } from "lucide-react"; // icon
import { Card } from "@/components/ui/card"; // card component

const mockStories = [
  {
    id: 1,
    title: "Ánh trăng trong rừng sâu",
    genre: "Kỳ ảo",
    length: "700 từ",
    content:
      "Giữa khu rừng u tịch, ánh trăng soi xuống mặt hồ, phản chiếu hình bóng cô gái đang chờ đợi một điều gì đó vượt ngoài lý trí...",
    date: "2025-10-30",
  },
  {
    id: 2,
    title: "Bản nhạc cuối cùng",
    genre: "Lãng mạn",
    length: "1000 từ",
    content:
      "Tiếng đàn vang lên giữa căn phòng trống, như lời tạm biệt cuối cùng của hai kẻ đã từng cùng nhau viết nên bản tình ca dang dở...",
    date: "2025-10-29",
  },
  {
    id: 3,
    title: "Bản nhạc đầu tiên",
    genre: "Lãng mạn",
    length: "1000 từ",
    content:
      "Tiếng đàn vang lên giữa căn phòng trống, như lời tạm biệt cuối cùng của hai kẻ đã từng cùng nhau viết nên bản tình ca dang dở...",
    date: "2025-10-29",
  },
  {
    id: 4,
    title: "Bản nhạc thứ hai",
    genre: "Lãng mạn",
    length: "1000 từ",
    content:
      "Tiếng đàn vang lên giữa căn phòng trống, như lời tạm biệt cuối cùng của hai kẻ đã từng cùng nhau viết nên bản tình ca dang dở...",
    date: "2025-10-29",
  }
];

const Storage = () => {

    return (
        <div className="pl-8 pr-8">
      <h1 className="text-2xl font-bold mb-6 text-white">📚 Truyện đã tạo :</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStories.map((story) => (
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
                <Trash className="w-5 h-5 cursor-pointer hover:text-red-400 transition" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
    )
}

export default Storage;
