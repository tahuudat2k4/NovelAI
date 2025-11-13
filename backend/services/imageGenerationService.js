
const generateImage = async (prompt) => {
  // try { if use Google Imagen API
  //   const genAI = new GoogleGenAI({
  //     apiKey: process.env.GOOGLE_GENAI_API_KEY,
  //   });
  //   const response = await genAI.models.generateImages({
  //     model: 'imagen-4.0-generate-001', 
  //     prompt: prompt,
  //     config: {
  //       numberOfImages: numberOfImages,
  //       aspectRatio: '1:1', // Square images
        
  //     }
  //   });

  //   // Extract image data from response
  //   const images = response.images || [];

  //   if (images.length === 0) {
  //     throw new Error('No images generated');
  //   }

  //   return images;
  // } catch (error) {
  //   console.error('Image Generation Error:', error);

  //   // Fallback: If Imagen is not available, provide helpful error
  //   if (error.message?.includes('not found') || error.message?.includes('not available')) {
  //     throw new Error('Image generation is currently unavailable. Please check your API access or try again later.');
  //   }

  //   throw new Error(`Failed to generate image: ${error.message}`);
  // }
  try {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=576&model=flux`;
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Pollinations API error: ${response.statusText}`);
    }
    // Chuyển dữ liệu ảnh sang base64 để gửi cho frontend
    const buffer = Buffer.from(await response.arrayBuffer());
    const base64Image = buffer.toString('base64');

    return [
      {
        image_base64: base64Image,
        contentType: response.headers.get('content-type') || 'image/jpeg',
      },
    ];
  } catch (error) {
    console.error('Image Generation Error:', error);
    throw new Error(`Failed to generate image: ${error.message}`);
  }
};

const generateImageFromStory = async (storyContent) => {
  try {
    // Create a prompt that summarizes the story for image generation
    const imagePrompt = `Create a beautiful, artistic illustration that captures the essence of this story. 
    Focus on the main scene, characters, and atmosphere. Style: digital art, detailed, vibrant colors.
    Story summary: ${storyContent.substring(0, 500)}...`;
    return await generateImage(imagePrompt);
  } catch (error) {
    console.error('Story Image Generation Error:', error);
    throw error;
  }
};

module.exports = {
  generateImage,
  generateImageFromStory
};