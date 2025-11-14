const { ElevenLabsClient, play } = require("@elevenlabs/elevenlabs-js");
const { Readable } = require("stream");
require('dotenv').config();

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY, 
});

const generateAudioFromStory = async (storyText , voice) => {
  try {
     // Giới hạn text cho free tier
    const maxLength = 1500;
    const truncatedText =
      storyText.length > maxLength ? storyText.substring(0, maxLength) + "..." : storyText;

    // Gọi ElevenLabs API
    const audio = await elevenlabs.textToSpeech.convert(voice, {
      text: truncatedText,
      model_id: "eleven_multilingual_v2",
      output_format: "mp3_44100_128",
    });

    // Đọc dữ liệu từ stream -> buffer
    const reader = audio.getReader();
    const chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const audioBuffer = Buffer.concat(chunks);
    
    
   // Convert sang Base64 để frontend dùng trực tiếp
    const audioBase64 = audioBuffer.toString("base64");
    const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;
    return {
      audioUrl,
      provider: "elevenlabs",
      format: "mp3",
      duration: Math.ceil(truncatedText.length / 15), // Ước lượng thời lượng
      characterCount: truncatedText.length,
    };
  } catch (error) {
    console.error('Audio Generation Error:', error);
    throw error;
  }
};

module.exports = {
  generateAudioFromStory
};