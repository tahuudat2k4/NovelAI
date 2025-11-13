import React, { useState } from 'react';
import { Headphones, Music } from 'lucide-react';
import { generateAudioFromStory } from '@/services/mediaServices';

const voices = [
  { name: 'Rachel', description: 'American accent, natural and pleasant tone', voiceID:'21m00Tcm4TlvDq8ikWAM' },
  { name: 'Domi', description: 'Energetic and youthful voice', voiceID:"AZnzlk1XvdvUeBnXmlld" },
  { name: 'Bella', description: 'Warm, expressive, and emotional tone',voiceID:"EXAVITQu4vr4xnSDxMaL" },
  { name: 'Antoni', description: 'Clear, mid-range male voice' , voiceID:"ErXwobaYiN019PkySvjV" },
  { name: 'Elli', description: 'Soft and gentle tone', voiceID:"MF3mGyEYCl7XYWbV9V6O" },
];

const GenAudio = ({ story, setSelectedOption }) => {
  const [selectedVoice, setSelectedVoice] = useState(voices[0].voiceID);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleButtonClick = async () => {
    if (!story || story.trim() === "") {
      alert("Please generate a story first!");
      return;
    }
    setLoading(true);
    setAudioUrl(null);
    // Logic to generate audio from story
    try {
      const data = await generateAudioFromStory(story, selectedVoice);
      console.log("Audio API response:", data);
      console.log("AudioURL prefix:", data.audioUrl.slice(0, 30));
      //  API trả về 
      setAudioUrl( data.audioUrl.startsWith("data:audio/")
    ? data.audioUrl
    : `data:audio/mpeg;base64,${data.audioUrl}`);
    } catch (err) {
      console.error(err);
      alert("Failed to generate audio.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mr-20 text-white w-full min-h-153  p-5  space-y-2">
      <div className='flex justify-between items-center  p-5 px-13 '>
        <div className='flex flex-row  items-center '>
          <Headphones className="inline-block w-6 h-6 mr-2 text-red-400" />
          <h2 className="text-2xl font-bold ">Generate Audio</h2>
        </div>

        <button
          onClick={ () => setSelectedOption(null) }
          className="cursor-pointer bg-purple-700 px-3 py-2 rounded-md text-white hover:bg-purple-800"
        >
          ← Back to input
        </button>
      </div>
      <div className=" p-4 px-13  h-116">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Select voice</h3>
          <select
            value={ selectedVoice }
            onChange={ (e) => setSelectedVoice(e.target.value) }
            className="cursor-pointer w-full px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option key="default" value="" disabled>Select the voice</option>
            { voices.map(v => (
              <option key={v.voiceID} value={v.voiceID}>
                { v.name } ({ v.description })
              </option>
            )) }
          </select>
          <p className="text-white-500/80 text-xs italic mt-2">Turn ideas into audio experiences.</p>
        </div>
        {/* Generate Story First Button */ }
        <div className='flex justify-center'>
          <button className={ `w-1/3 mt-3 mb-5 px-2 py-2 bg-gradient-to-r from-purple-600 to-pink-600 
            hover:from-purple-700 hover:to-pink-700 cursor-pointer text-white font-semibold rounded-lg 
            transition-colors flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}` }
            disabled={ loading || !story }
            onClick={ handleButtonClick }>
            <Music size={ 20 } />
            { loading ? "Generating..." : "Generate Audio from Story" }
          </button>
        </div>

        { !audioUrl ? (
          // Chưa có audio: show placeholder / default output
          <div className="flex flex-col items-center justify-center py-16 px-8 
          bg-gradient-to-b from-gray-900/50 to-transparent rounded-lg border border-purple-800/20">
            <Music size={ 64 } className="text-slate-600 mb-4" />
            <p className="text-slate-400 text-center font-medium">Your audio will appear here.</p>
            <p className="text-slate-500 text-center text-sm mt-1">Generate audio from your story above.</p>
          </div>
        ) : (
          // Có audio: show audio player
           <div className="flex flex-col items-center justify-center py-16 px-8 
          bg-gradient-to-b from-gray-900/50 to-transparent rounded-lg border border-purple-800/20">
          <audio key={audioUrl} controls src={audioUrl} className='w-1/3 mt-4' />
        </div>
        ) }
      </div>
    </div>
  )
}

export default GenAudio;
