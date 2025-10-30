const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate story using Gemini AI
const generateStory = async ({ genre, length, setting, characters, description }) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build the prompt
    const prompt = buildPrompt({ genre, length, setting, characters, description });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const story = response.text();

    return story;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate story. Please check your API key and try again.');
  }
};

// Build prompt for Gemini AI
const buildPrompt = ({ genre, length, setting, characters, description }) => {
  let prompt = `Bạn là một nhà văn chuyên nghiệp. Hãy viết một câu chuyện với các yêu cầu sau:\n\n`;
  
  prompt += `- Thể loại: ${genre}\n`;
  prompt += `- Độ dài: khoảng ${length} từ\n`;
  
  if (setting) {
    prompt += `- Bối cảnh: ${setting}\n`;
  }
  
  if (characters) {
    prompt += `- Nhân vật: ${characters}\n`;
  }
  
  prompt += `- Mô tả: ${description}\n\n`;
  
  prompt += `Hãy viết câu chuyện một cách sinh động, hấp dẫn và đầy cảm xúc. Câu chuyện cần có:\n`;
  prompt += `1. Phần mở đầu thu hút\n`;
  prompt += `2. Phần thân bài phát triển mạch truyện\n`;
  prompt += `3. Phần kết thúc ấn tượng\n\n`;
  prompt += `Viết bằng tiếng Việt, sử dụng ngôn ngữ văn học phù hợp với thể loại ${genre}.`;

  return prompt;
};

module.exports = {
  generateStory
};
