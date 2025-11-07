const axios = require('axios');

/**
 * Generate audio narration from text using Google Cloud Text-to-Speech API
 * Free tier: 1 million characters per month
 * @param {string} text - Text to convert to speech
 * @param {string} languageCode - Language code (default: 'vi-VN' for Vietnamese)
 * @returns {Promise<string>} Base64 encoded audio data
 */
const generateAudioWithGoogle = async (text, languageCode = 'vi-VN') => {
  try {
    const apiKey = process.env.GOOGLE_TTS_API_KEY;

    if (!apiKey) {
      throw new Error('Google TTS API key not configured');
    }

    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        input: { text },
        voice: {
          languageCode: languageCode,
          name: languageCode === 'vi-VN' ? 'vi-VN-Standard-A' : 'en-US-Standard-C',
          ssmlGender: 'NEUTRAL'
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 1.0,
          pitch: 0.0
        }
      }
    );

    return response.data.audioContent; // Base64 encoded audio
  } catch (error) {
    console.error('Google TTS Error:', error.response?.data || error.message);
    throw new Error(`Failed to generate audio with Google TTS: ${error.message}`);
  }
};

/**
 * Generate audio using ElevenLabs API (Free tier: 10,000 characters)
 * @param {string} text - Text to convert to speech
 * @param {string} voiceId - Voice ID (default: Rachel voice)
 * @returns {Promise<Buffer>} Audio buffer
 */
const generateAudioWithElevenLabs = async (text, voiceId = '21m00Tcm4TlvDq8ikWAM') => {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      },
      {
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );

    return Buffer.from(response.data);
  } catch (error) {
    console.error('ElevenLabs Error:', error.response?.data || error.message);
    throw new Error(`Failed to generate audio with ElevenLabs: ${error.message}`);
  }
};

/**
 * Generate audio narration from story
 * Automatically selects available TTS service
 * @param {string} storyText - Story text to narrate
 * @param {string} language - Language code
 * @returns {Promise<Object>} Audio data and metadata
 */
const generateAudioFromStory = async (storyText, language = 'vi-VN') => {
  try {
    // Limit text length for free tier
    const maxLength = 5000;
    const truncatedText = storyText.length > maxLength 
      ? storyText.substring(0, maxLength) + '...' 
      : storyText;

    let audioData;
    let provider;

    // Try Google TTS first (better for Vietnamese)
    if (process.env.GOOGLE_TTS_API_KEY) {
      audioData = await generateAudioWithGoogle(truncatedText, language);
      provider = 'google';
    } 
    // Fallback to ElevenLabs
    else if (process.env.ELEVENLABS_API_KEY) {
      audioData = await generateAudioWithElevenLabs(truncatedText);
      provider = 'elevenlabs';
    } 
    else {
      throw new Error('No TTS API key configured. Please set GOOGLE_TTS_API_KEY or ELEVENLABS_API_KEY');
    }

    return {
      audioData,
      provider,
      format: 'mp3',
      duration: Math.ceil(truncatedText.length / 15), // Approximate duration in seconds
      characterCount: truncatedText.length
    };
  } catch (error) {
    console.error('Audio Generation Error:', error);
    throw error;
  }
};

module.exports = {
  generateAudioWithGoogle,
  generateAudioWithElevenLabs,
  generateAudioFromStory
};