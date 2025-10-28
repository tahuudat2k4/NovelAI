import React, { useState } from 'react';

const InputForm = () => {
  const GENRES = ["Kinh dị", "Lãng mạn", "Viễn tưởng", "Hài", "Trinh thám", "Cổ trang", "Khoa học viễn tưởng", "Kỳ ảo"];
  const LENGTHS = [
  { value: "500", label: "500 từ" },
  { value: "700", label: "700 từ" },
  { value: "1000", label: "1000 từ" },
];
  const [formData, setFormData] = useState({
    genre: '',
    length: '',
    setting: '',
    characters: '',
    description: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  } 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu form ở đây
    console.log(formData);
  }

  return (
    <>
      <div className="p-6 bg-slate-800 rounded-lg shadow-md">
         <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Thể loại */}
            <div className="w-1/6">
              <label className="block text-white mb-2" htmlFor="textInput">Thể loại</label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Chọn thể loại</option>
                {GENRES.map((genre, index) => (
                  <option key={index} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Độ dài */}
            <div className="w-1/6">
              <label className="block text-white mb-2" htmlFor="length">Độ dài</label>
              <select
                id="length"
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Chọn độ dài</option>
                {LENGTHS.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Bối cảnh */}
            <div className="flex-1">
              <label className="block text-white mb-2" htmlFor="setting">Bối cảnh</label>
              <input
                type="text"
                id="setting"
                name="setting"
                value={formData.setting}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ví dụ: Một thành phố cổ, một làng quê yên bình..."
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            {/* Nhân vật */}
            <div className="flex-1">
              <label className="block text-white mb-2" htmlFor="characters">Nhân vật</label>
              <input
                type="text"
                id="characters"
                name="characters"
                value={formData.characters}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ví dụ: Một anh chàng thợ rèn dũng cảm, một cô gái bí ẩn..."
              />
            </div>
          </div>

          {/* Mô tả */}
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="description">Mô tả</label>
            <textarea
              id="description"  
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="Mô tả chi tiết về câu chuyện bạn muốn tạo..."
            ></textarea>
          </div>

          {/* Nút gửi */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors duration-200"
          >
            Generate Story
          </button>
        </form> 
      </div>
    </>
  )
}

export default InputForm;
