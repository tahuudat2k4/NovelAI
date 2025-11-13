import React, {useState} from 'react'
import { Clapperboard,Upload, Video, Music  } from 'lucide-react';
import {generateVideo} from '../services/mediaServices';

const GenVideo = ({story, setSelectedOption}) => {
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const handleGenerate = async () => {
    if (!image || !audio) {
      alert("Please upload both image and audio!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("audio", audio);

      const response = await generateVideo(formData);

      setVideoUrl(response.videoUrl);
    } catch (err) {
      console.error(err);
      alert("Failed to generate video.");
    } finally {
      setLoading(false);
    }
  };
  return (
     <div className="mr-20 text-white w-full min-h-153 p-5 space-y-2">
      <div className='flex justify-between items-center p-2 px-13 '>
        <div className='flex flex-row  items-center '>
          <Clapperboard className="inline-block w-6 h-6 mr-2 text-green-400" />
          <h2 className="text-2xl font-bold ">Generate Video</h2>
        </div>

        <button
          onClick={ () => setSelectedOption(null) }
          className="cursor-pointer bg-purple-700 px-3 py-2 rounded-md text-white hover:bg-purple-800"
        >
          ← Back to input
        </button>
      </div>
      <div className=" p-4 px-13  h-full">
      <h3 className="text-lg font-semibold mb-3 text-purple-300">Upload Assets</h3>
      <div className='flex justify-around'> 
         {/* Upload Image */}
        <div className="flex flex-row items-center justify-center border-2 border-dashed w-1/2
        border-purple-600/40 rounded-xl p-6 hover:border-purple-400 transition-all duration-200 mr-3">
          <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-purple-400" />
            <span className="text-sm text-gray-300 mr-2">
              {image ? image.name : "Click to upload an image"}
            </span>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="mt-3 w-48 rounded-md border border-purple-600/30"
            />
          )}
        </div>
      {/* Upload Audio */}
        <div className="flex flex-col items-center justify-center border-2 w-1/2
        border-dashed border-purple-600/40 rounded-xl p-6 hover:border-purple-400 transition-all duration-200">
          <label htmlFor="audio-upload" className="cursor-pointer flex flex-col items-center gap-2">
            <Music className="w-8 h-8 text-purple-400" />
            <span className="text-sm text-gray-300">
              {audio ? audio.name : "Click to upload an audio file"}
            </span>
          </label>
          <input
            id="audio-upload"
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
            className="hidden"
          />
          {audio && (
            <audio controls className="mt-3 w-64">
              <source src={URL.createObjectURL(audio)} type="audio/mpeg" />
            </audio>
          )}
        </div>
      </div>
     
       {/* Generate Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`cursor-pointer px-6 py-3 rounded-lg font-semibold 
              bg-gradient-to-r from-purple-600 to-pink-600  hover:text-gray-300 hover:opacity-90 transition-all duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "📽️ Generating..." : "🎬 Generate Video"}
          </button>
        </div>
      </div>
    {/* Video Preview (Placeholder or Actual) */}
      <div className="mt-8 flex flex-col items-center  ">
        <h3 className="text-lg font-semibold mb-3 text-purple-300">Preview</h3>
        {!videoUrl ? (
          <div className="w-7/8 h-72 flex flex-col items-center justify-center border border-purple-600/40 rounded-xl bg-purple-900/10 text-gray-400">
            <Video className="w-10 h-10 mb-2 text-purple-300" />
            <p>Your generated video will appear here</p>
          </div>
        ) : (
          <>
            <video
              controls
              src={videoUrl}
              className="w-240 h-130 p-2 rounded-xl border border-purple-700 shadow-lg shadow-purple-900/40"
            />
            <a
              href={videoUrl}
              download="generated-video.mp4"
              className="mt-4 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-md text-white transition-colors duration-200"
            >
              Download Video
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default GenVideo;
