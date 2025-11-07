const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini AI
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "AIzaSyAujjWa-t8-984WG7PgMrFYkoegzUwFgzA",
});

const generateImage = async (prompt, numberOfImages = 1) => {
  try {
    
    const response = await genAI.models.generateImages({
      model: 'imagen-4.0-generate-001', 
      contents: prompt,
      config: {
        numberOfImages: numberOfImages,
        aspectRatio: '1:1', // Square images
        
      }
    });

    // Extract image data from response
    const images = response.images || [];

    if (images.length === 0) {
      throw new Error('No images generated');
    }

    return images;
  } catch (error) {
    console.error('Image Generation Error:', error);

    // Fallback: If Imagen is not available, provide helpful error
    if (error.message?.includes('not found') || error.message?.includes('not available')) {
      throw new Error('Image generation is currently unavailable. Please check your API access or try again later.');
    }

    throw new Error(`Failed to generate image: ${error.message}`);
  }
};

const generateImageFromStory = async (storyContent) => {
  try {
    // Create a prompt that summarizes the story for image generation
    const imagePrompt = `Create a beautiful, artistic illustration that captures the essence of this story. 
    Focus on the main scene, characters, and atmosphere. Style: digital art, detailed, vibrant colors.
    
    Story summary: ${storyContent.substring(0, 500)}...`;

    return await generateImage(imagePrompt, 1);
  } catch (error) {
    console.error('Story Image Generation Error:', error);
    throw error;
  }
};

module.exports = {
  generateImage,
  generateImageFromStory
};