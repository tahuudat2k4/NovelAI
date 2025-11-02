import React from 'react'
import { Clapperboard } from 'lucide-react';

const GenVideo = ({story, setSelectedOption}) => {
  return (
     <div className="mr-20 text-white w-full min-h-153 border border-purple-500/20 rounded-md p-5 space-y-6">
      <div className='flex justify-between items-center border border-purple-500/20 p-5 px-13 rounded-md'>
        <div className='flex flex-row  items-center '>
          <Clapperboard className="inline-block w-6 h-6 mr-2 text-blue-400" />
          <h2 className="text-2xl font-bold ">Generate Video</h2>
        </div>

        <button
          onClick={ () => setSelectedOption(null) }
          className="cursor-pointer bg-purple-700 px-3 py-2 rounded-md text-white hover:bg-purple-800"
        >
          ← Back to input
        </button>
      </div>
      <div className="border border-purple-500/20 p-4 px-13 rounded-md h-116">
        content coming soon...
      </div>
    </div>
  )
}

export default GenVideo;
