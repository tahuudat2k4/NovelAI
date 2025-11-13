import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY ,
});


// Generate story using Gemini AI
const generateStory = async ({ genre, length, setting, characters, description }) => {
  try {
    // Build prompt
    const prompt = buildPrompt({ genre, length, setting, characters, description });
    // Call Gemini AI to generate story
    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
     // Lấy text từ kết quả trả về
     const story = response.text?.trim()|| "Can't generate story at the moment. Try again later.";
    return story;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate story. Please check your API key and try again.');
  }
};

// Build prompt for Gemini AI
const buildPrompt = ({ genre, length, setting, characters, description }) => {
  let prompt = `You are a professional writer. Please write a story with the following requirements:\n\n`;
  
  prompt += `- Genre: ${genre}\n`;
  prompt += `- Length: about ${length} words\n`;
  
  if (setting) {
    prompt += `- Setting: ${setting}\n`;
  }
  
  if (characters) {
    prompt += `- Character: ${characters}\n`;
  }
  
  prompt += `- Description: ${description}\n\n`;
  
  prompt += `Write the story in a vivid, engaging, and emotional way. The story should have:\n`;
  prompt += `1. An engaging introduction\n`;
  prompt += `2. The body develops the storyline\n`;
  prompt += `3. An impressive ending\n\n`;
  prompt += `Write in English, using literary language appropriate to the genre. ${genre}.`;

  return prompt;
};

export default {
  generateStory
};
