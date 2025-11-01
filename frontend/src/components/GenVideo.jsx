import React from 'react'

const GenVideo = ({story, setSelectedOption}) => {
  return (
    <div className="m-7 text-white w-full min-h-screen">
      <button
        onClick={ () => setSelectedOption(null) }
        className="cursor-pointer mt-4 bg-purple-700 px-4 py-2 rounded-md text-white hover:bg-purple-800"
      >
        ← Quay lại
      </button>
     
    </div>

  )
}

export default GenVideo;
