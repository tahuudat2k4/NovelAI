const geminiService = require('../services/geminiService').default;
const storageService = require('../services/storageService');

// Generate a new story using Gemini AI
const generateStory = async (req, res, next) => {
  try {
    const { genre, length, setting, characters, description } = req.body;
    
    // Validate required fields
    if (!genre || !length || !description) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields: genre, length, and description are required',
          status: 400
        }
      });
    }

    // Generate story using Gemini AI
    const story = await geminiService.generateStory({
      genre,
      length,
      setting,
      characters,
      description
    });

    res.status(200).json({
      success: true,
      story: story
    });
  } catch (error) {
    console.error('Error generating story:', error);
    next(error);
  }
};

// Save a story to storage
const saveStory = async (req, res, next) => {
  try {
    const { title, genre, length, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields: title and content are required',
          status: 400
        }
      });
    }

    const savedStory = storageService.saveStory({
      title,
      genre,
      length,
      content,
      date: new Date().toISOString().split('T')[0]
    });

    res.status(201).json({
      success: true,
      story: savedStory
    });
  } catch (error) {
    console.error('Error saving story:', error);
    next(error);
  }
};

// Get all saved stories
const getSavedStories = async (req, res, next) => {
  try {
    let stories = await storageService.getAllStories();
    // nếu không phải array thì convert
    if(!Array.isArray(stories)){
      stories = Object.values(stories || {});
    }
    res.status(200).json({
      success: true,
      stories: stories
    });
  } catch (error) {
    console.error('Error fetching stories:', error);
    next(error);
  }
};

// Delete a story
const deleteStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await storageService.deleteStory(id);

    if (!deleted) {
      return res.status(404).json({
        error: {
          message: 'Story not found',
          status: 404
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Story deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting story:', error);
    next(error);
  }
};

module.exports = {
  generateStory,
  saveStory,
  getSavedStories,
  deleteStory
};
