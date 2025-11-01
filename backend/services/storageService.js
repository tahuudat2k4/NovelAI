const Story = require('../models/Story');

// Save a story to MongoDB
const saveStory = async (storyData) => {
  try {
    const newStory = new Story(storyData);
    const savedStory = await newStory.save();
    
    // Return story with id field for backward compatibility
    return {
      id: savedStory._id.toString(),
      title: savedStory.title,
      genre: savedStory.genre,
      length: savedStory.length,
      content: savedStory.content,
      date: savedStory.date,
      createdAt: savedStory.createdAt
    };
  } catch (error) {
    console.error('Error saving story to database:', error);
    throw new Error('Failed to save story to database');
  }
};

// Get all stories from MongoDB
const getAllStories = async () => {
  try {
    const stories = await Story.find()
      .sort({ createdAt: -1 })
      .select('_id title genre length content date createdAt')
      .lean();
    
    // Map _id to id for backward compatibility
    return stories.map(story => ({
      id: story._id.toString(),
      title: story.title,
      genre: story.genre,
      length: story.length,
      content: story.content,
      date: story.date,
      createdAt: story.createdAt
    }));
  } catch (error) {
    console.error('Error fetching stories from database:', error);
    throw new Error('Failed to fetch stories from database');
  }
};

// Get story by ID from MongoDB
const getStoryById = async (id) => {
  try {
    const story = await Story.findById(id).lean();
    
    if (!story) {
      return null;
    }
    
    // Return story with id field for backward compatibility
    return {
      id: story._id.toString(),
      title: story.title,
      genre: story.genre,
      length: story.length,
      content: story.content,
      date: story.date,
      createdAt: story.createdAt
    };
  } catch (error) {
    console.error('Error fetching story by ID:', error);
    throw new Error('Failed to fetch story from database');
  }
};

// Delete a story from MongoDB
const deleteStory = async (id) => {
  try {
    const result = await Story.findByIdAndDelete(id);
    return result !== null;
  } catch (error) {
    console.error('Error deleting story from database:', error);
    throw new Error('Failed to delete story from database');
  }
};

// Clear all stories (for testing)
const clearAllStories = async () => {
  try {
    await Story.deleteMany({});
    return true;
  } catch (error) {
    console.error('Error clearing all stories:', error);
    throw new Error('Failed to clear all stories');
  }
};

module.exports = {
  saveStory,
  getAllStories,
  getStoryById,
  deleteStory,
  clearAllStories
};
