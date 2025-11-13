import React from 'react'

const ImageOutput = ({image, isLoading}) => {
  return (
        <div className="h-full flex flex-col space-y-4 px-13">
            {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center border border-pink-400/30">
            <span className="text-pink-400 text-xl">🖼️</span>
          </div>
          <h2 className="text-xl font-bold text-white">Generated Image</h2>
        </div>
      </div>
        {/* Image Display Area */}
        <div className="flex-1 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 rounded-xl overflow-hidden flex items-center justify-center min-h-96">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full animate-spin border-t-purple-500"></div>
            </div>
            <p className="text-gray-400">Creating your masterpiece...</p>
          </div>
        ) : image ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img src={image || "../assets/placeholder.svg"} alt="Generated image" fill className="object-cover" priority />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-8">
            <div className="text-4xl">✨</div>
            <div className="text-center">
              <p className="text-gray-300 font-medium mb-2">No image generated yet</p>
              <p className="text-sm text-gray-500">
                Fill in the story parameters and custom prompt on the left, then click "Generate Image" to create your
                visual.
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Info Panel */}
      {image && (
        <div className="flex gap-2 pt-2">
            <button className="cursor-pointer flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm py-2">Download</button>
            <button className="cursor-pointer flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm py-2">Regenarate</button>
          </div>
      )}
        </div>
  )
}

export default ImageOutput
