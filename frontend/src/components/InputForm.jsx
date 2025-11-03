import React, { useState } from 'react';
import { createStory } from '../services/storyServices';
import { generateImageFromStory, generateAudioFromStory, generateVideoFromStory, createAudioBlobUrl } from '../services/mediaServices';
import ExportStoryPDF from './ExportStoryPDF';

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
  const [story, setStory] = useState(""); //nơi chứa truyện nhận từ backend
  const [loading, setLoading] = useState(false);
  const [mediaLoading, setMediaLoading] = useState({
    image: false,
    audio: false,
    video: false
  });
  const [generatedMedia, setGeneratedMedia] = useState({
    images: [],
    audio: null,
    audioUrl: null,
    video: null
  });
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
    setGeneratedMedia({ images: [], audio: null, audioUrl: null, video: null });
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

  // Xử lý tạo ảnh từ truyện
  const handleGenerateImage = async () => {
    if (!story) return;
    
    setMediaLoading(prev => ({ ...prev, image: true }));
    try {
      const result = await generateImageFromStory(story);
      setGeneratedMedia(prev => ({
        ...prev,
        images: result.images || []
      }));
      alert('✅ Ảnh đã được tạo thành công!');
    } catch (err) {
      console.error("Lỗi khi tạo ảnh:", err);
      alert('⚠️ Có lỗi xảy ra khi tạo ảnh. Vui lòng kiểm tra API key hoặc thử lại!');
    } finally {
      setMediaLoading(prev => ({ ...prev, image: false }));
    }
  };

  // Xử lý tạo audio từ truyện
  const handleGenerateAudio = async () => {
    if (!story) return;
    
    setMediaLoading(prev => ({ ...prev, audio: true }));
    try {
      const result = await generateAudioFromStory(story, 'vi-VN');
      const audioUrl = createAudioBlobUrl(result.audio);
      setGeneratedMedia(prev => ({
        ...prev,
        audio: result.audio,
        audioUrl: audioUrl
      }));
      alert(`✅ Audio đã được tạo thành công! (${result.characterCount} ký tự, ~${result.duration}s)`);
    } catch (err) {
      console.error("Lỗi khi tạo audio:", err);
      alert('⚠️ Có lỗi xảy ra khi tạo audio. Vui lòng kiểm tra API key hoặc thử lại!');
    } finally {
      setMediaLoading(prev => ({ ...prev, audio: false }));
    }
  };

  // Xử lý tạo video từ truyện
  const handleGenerateVideo = async () => {
    if (!story) return;
    
    setMediaLoading(prev => ({ ...prev, video: true }));
    try {
      const result = await generateVideoFromStory(story);
      setGeneratedMedia(prev => ({
        ...prev,
        video: result.video
      }));
      alert(`✅ Video đang được tạo! ID: ${result.video.id}. Quá trình này có thể mất vài phút.`);
    } catch (err) {
      console.error("Lỗi khi tạo video:", err);
      alert('⚠️ Có lỗi xảy ra khi tạo video. Vui lòng kiểm tra API key hoặc thử lại!');
    } finally {
      setMediaLoading(prev => ({ ...prev, video: false }));
    }
  };

  return (
    <>
      <div className="m-7 p-9 bg-slate-900/50 rounded-lg shadow-md border border-purple-500/20">
        <form onSubmit={ handleSubmit }>
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Thể loại */ }
            <div className="w-1/6">
              <label className="block text-white mb-2" htmlFor="textInput">Thể loại</label>
              <select
                id="genre"
                name="genre"
                required
                value={ formData.genre }
                onChange={ handleChange }
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Chọn thể loại</option>
                { GENRES.map((genre, index) => (
                  <option key={ index } value={ genre }>{ genre }</option>
                )) }
              </select>
            </div>

            {/* Độ dài */ }
            <div className="w-1/6">
              <label className="block text-white mb-2" htmlFor="length">Độ dài</label>
              <select
                id="length"
                name="length"
                required
                value={ formData.length }
                onChange={ handleChange }
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Chọn độ dài</option>
                { LENGTHS.map((option, index) => (
                  <option key={ index } value={ option.value }>{ option.label }</option>
                )) }
              </select>
            </div>

            {/* Bối cảnh */ }
            <div className="flex-1">
              <label className="block text-white mb-2" htmlFor="setting">Bối cảnh</label>
              <input
                type="text"
                id="setting"
                name="setting"
                required
                value={ formData.setting }
                onChange={ handleChange }
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ví dụ: Một thành phố cổ, một làng quê yên bình..."
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            {/* Nhân vật */ }
            <div className="flex-1">
              <label className="block text-white mb-2" htmlFor="characters">Nhân vật</label>
              <input
                type="text"
                id="characters"
                name="characters"
                required
                value={ formData.characters }
                onChange={ handleChange }
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ví dụ: Một anh chàng thợ rèn dũng cảm, một cô gái bí ẩn..."
              />
            </div>
          </div>

          {/* Mô tả */ }
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              required
              value={ formData.description }
              onChange={ handleChange }
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="Mô tả chi tiết về câu chuyện bạn muốn tạo..."
            ></textarea>
          </div>

          {/* Nút gửi */ }
          <button
            type="submit"
            className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors duration-200"
          >
            { loading ? "Đang tạo truyện..." : "Generate Story" }
          </button>
        </form>
      </div>
       {/* Kết quả */ }
        { story && (
          <div className="m-7 p-10 bg-gray-900 text-white rounded-md whitespace-pre-line border border-green-500/20">
            <h3 className="text-xl font-bold mb-2 text-purple-400">📖 Câu chuyện của bạn:</h3>
            <p>{ story }</p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-9">
              {/* Lưu truyện */ }
              <button 
                type='button'
                className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors duration-200"
              >
                💾 Lưu truyện
              </button>
              
              {/* Tạo ảnh từ truyện */ }
              <button 
                type='button'
                onClick={handleGenerateImage}
                disabled={mediaLoading.image}
                className="cursor-pointer bg-gradient-to-r from-green-800 to-green-600 text-white px-4 py-2 rounded-md hover:from-green-900 hover:to-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mediaLoading.image ? "⏳ Đang tạo ảnh..." : "📸 Tạo ảnh từ truyện"}
              </button>

              {/* Tạo audio từ truyện */ }
              <button 
                type='button'
                onClick={handleGenerateAudio}
                disabled={mediaLoading.audio}
                className="cursor-pointer bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-2 rounded-md hover:from-blue-900 hover:to-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mediaLoading.audio ? "⏳ Đang tạo audio..." : "🎵 Tạo audio từ truyện"}
              </button>

              {/* Tạo video từ truyện */ }
              <button 
                type='button'
                onClick={handleGenerateVideo}
                disabled={mediaLoading.video}
                className="cursor-pointer bg-gradient-to-r from-orange-800 to-orange-600 text-white px-4 py-2 rounded-md hover:from-orange-900 hover:to-orange-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mediaLoading.video ? "⏳ Đang tạo video..." : "🎬 Tạo video từ truyện"}
              </button>
              
              {/* Xuất PDF */ }
              <ExportStoryPDF story={story} />
              
              {/* Tạo lại truyện */}
              <button 
                type='button'
                onClick={handleRegenerate}
                disabled={loading}
                className="cursor-pointer bg-gradient-to-r from-red-800 to-red-600 text-white px-4 py-2 rounded-md hover:from-red-900 hover:to-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "⏳ Đang tạo lại..." : "🔁 Tạo lại truyện"}
              </button>
            </div>

            {/* Generated Media Display */}
            {(generatedMedia.images.length > 0 || generatedMedia.audioUrl || generatedMedia.video) && (
              <div className="mt-8 p-6 bg-slate-800 rounded-lg border border-purple-500/30">
                <h4 className="text-lg font-semibold mb-4 text-purple-300">🎨 Nội dung đã tạo:</h4>
                
                {/* Images */}
                {generatedMedia.images.length > 0 && (
                  <div className="mb-6">
                    <h5 className="text-md font-medium mb-3 text-green-400">📸 Ảnh đã tạo:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {generatedMedia.images.map((img, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={img.url || `data:image/png;base64,${img}`} 
                            alt={`Generated ${index + 1}`}
                            className="w-full rounded-lg shadow-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Audio */}
                {generatedMedia.audioUrl && (
                  <div className="mb-6">
                    <h5 className="text-md font-medium mb-3 text-blue-400">🎵 Audio đã tạo:</h5>
                    <audio 
                      controls 
                      src={generatedMedia.audioUrl}
                      className="w-full"
                    >
                      Trình duyệt của bạn không hỗ trợ phát audio.
                    </audio>
                  </div>
                )}

                {/* Video */}
                {generatedMedia.video && (
                  <div className="mb-6">
                    <h5 className="text-md font-medium mb-3 text-orange-400">🎬 Video đang được tạo:</h5>
                    <div className="bg-slate-700 p-4 rounded">
                      <p className="text-sm text-gray-300">
                        <strong>ID:</strong> {generatedMedia.video.id}
                      </p>
                      <p className="text-sm text-gray-300 mt-2">
                        <strong>Trạng thái:</strong> {generatedMedia.video.status}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Video có thể mất vài phút để hoàn thành. Vui lòng kiểm tra lại sau.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) }
    </>
  )
}

export default InputForm;
