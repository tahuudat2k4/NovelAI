import React, { useState, useEffect } from 'react';
import { Image } from 'lucide-react';
import ImageOutput from './ImageOutput';
import { generateImage, generateImageFromStory } from '../services/mediaServices';

const GenImage = ({ story, setSelectedOption, setting, characters }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Nếu props thay đổi thì cập nhật lại
  useEffect(() => {
    setLocalSetting(setting || "");
    setLocalCharacters(characters || "");
  }, [setting, characters]);
  // State cục bộ để quản lý các trường input
  const [localSetting, setLocalSetting] = useState(setting || ""); // Tạo state cục bộ, gán giá trị ban đầu từ props
  const [localCharacters, setLocalCharacters] = useState(characters || "");
  const [mode, setMode] = useState('story'); // 'story' or 'prompt'
  const [customPrompt, setCustomPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const canGenerate = mode === "custom"
    ? customPrompt.trim().length > 0
    : localSetting.trim().length > 0 && localCharacters.trim().length > 0;
  const finalPrompt =
    mode === "story"
      ? `Tạo hình ảnh minh họa với: bối cảnh: ${localSetting}, nhân vật: ${localCharacters}, chi tiết thêm: ${customPrompt}`
      : customPrompt;
  // ---- 1️⃣ Sinh ảnh từ truyện ----
  const handleGenerateFromStory = async () => {
    if (!story) {
      alert("Chưa có truyện để tạo ảnh!");
      return;
    }

    setIsLoading(true);
    try {
      const data = await generateImageFromStory(finalPrompt);
      const imageUrl = Array.isArray(data.images)
        ? data.images[0]
        : data.image || data.url;
      setGeneratedImage(imageUrl);
    } catch (err) {
      console.error("Error generating image from story:", err);
      alert("Không thể tạo ảnh từ truyện.");
    } finally {
      setIsLoading(false);
    }
  };
  // ---- 2️⃣ Sinh ảnh từ prompt tùy chỉnh ----
  const handleGenerateFromPrompt = async () => {
    setIsLoading(true);
    try {

      const data = await generateImage(finalPrompt);
      const imageUrl = Array.isArray(data.images)
        ? data.images[0]
        : data.image || data.url;
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      alert("Không thể tạo ảnh từ lệnh của bạn.");
    } finally {
    setIsLoading(false);
  }
  };
  const handleGenerate = async () => {
    if (mode === "story") {
      await handleGenerateFromStory();
    } else {
      await handleGenerateFromPrompt();
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Back Button */ }
      <div className='flex justify-between items-center px-13 '>
        <div className='flex flex-row  items-center '>
          <Image className="inline-block w-6 h-6 mr-2 text-blue-400" />
          <h2 className="text-2xl font-bold text-white ">Generate Image</h2>
        </div>

        <button
          onClick={ () => setSelectedOption(null) }
          className="cursor-pointer bg-purple-700 px-3 py-2 rounded-md text-white hover:bg-purple-800"
        >
          ← Back to input
        </button>
      </div>
      {/* Image Generation Controls */ }
      <div className="p-4 px-13 h-full">
        {/* Mode Selection Buttons */ }
        <div className='w-full flex gap-2 bg-slate-800/30 rounded-md'>
          <button onClick={ () => setMode("story") } className={ `cursor-pointer flex-1 px-4 py-2 rounded-md font-medium transition ${mode === "story"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            : "text-gray-400 hover:text-gray-300"
            }` }>From Story</button>
          <button onClick={ () => setMode("custom") } className={ `cursor-pointer flex-1 px-4 py-2 rounded-md font-medium transition ${mode === "custom"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            : "text-gray-400 hover:text-gray-300"
            }` }>Custom Prompt</button>
        </div>
        {/* Story Parameters Card */ }
        { mode === "story" && (
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl py-4 px-6 space-y-4 mt-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Story Parameters</h3>
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded">From Your Story</span>
            </div>

            {/* Background */ }
            <div className="space-y-2 mb-1">
              <label className="text-sm font-medium text-gray-300 ">Background</label>
              <input
                type="text"
                placeholder={ setting || "e.g., A bustling medieval marketplace, A futuristic cityscape at night" }
                value={ localSetting }
                onChange={ (e) => setLocalSetting(e.target.value) }
                className="mt-1 w-full px-4 py-2 bg-slate-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
              />
            </div>

            {/* Characters */ }
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Characters</label>
              <input
                type="text"
                placeholder={ characters || "e.g., A brave blacksmith, A mysterious sorceress" }
                value={ localCharacters }
                onChange={ (e) => setLocalCharacters(e.target.value) }
                className="mt-1 w-full px-4 py-2 bg-slate-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
              />
            </div>
          </div>
        ) }

        {/* Custom Prompt Card */ }
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 space-y-4 flex-1 flex flex-col mt-3">
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
            { mode === "story" ? "Additional Details" : "Describe Your Image" }
          </h3>
          <p className="text-xs text-gray-400">
            { mode === "story"
              ? "Add extra details to enhance the image generation"
              : "Be descriptive with style, mood, lighting, and other details." }
          </p>

          <textarea
            placeholder={
              mode === "story"
                ? "e.g., 'Add magical sparkles, epic lighting, highly detailed, 8k quality'"
                : "Describe your image... (e.g., 'A majestic castle on a misty mountain, oil painting style, golden hour lighting, highly detailed, 8k')"
            }
            value={ customPrompt }
            onChange={ (e) => setCustomPrompt(e.target.value) }
            className="flex-1 w-full px-4 py-3 bg-slate-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition resize-none"
          />

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>💡</span>
            <span>
              { mode === "story"
                ? "Combine story parameters with your details for better results"
                : "Use descriptive words to get better AI-generated images" }
            </span>
          </div>
        </div>

        {/* Generate Button */ }
        <button
          onClick={ handleGenerate }
          disabled={ isLoading || !canGenerate }
          className="mt-6 w-1/5 py-2 ml-auto mr-auto bg-gradient-to-r 
        from-purple-600 to-pink-600 hover:from-purple-700 
        hover:to-pink-700 text-white font-semibold rounded-lg transition 
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex 
        items-center justify-center"
        >
          { isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              Generating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>✨</span>
              Generate Image
            </span>
          ) }
        </button>
      </div>
      {/* Generated Image Display */ }
      <ImageOutput isLoading={ isLoading } image={ generatedImage } />
    </div>
  )
}

export default GenImage;
