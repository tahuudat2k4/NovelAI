// In-memory storage for stories (can be replaced with database later)
let stories = [];
let nextId = 1;

// Save a story
const saveStory = (storyData) => {
  const newStory = {
    id: nextId++,
    ...storyData,
    createdAt: new Date().toISOString()
  };
  stories.push(newStory);
  return newStory;
};

// Get all stories
const getAllStories = () => {
  return stories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// Get story by ID
const getStoryById = (id) => {
  return stories.find(story => story.id === parseInt(id));
};

// Delete a story
const deleteStory = (id) => {
  const index = stories.findIndex(story => story.id === parseInt(id));
  if (index !== -1) {
    stories.splice(index, 1);
    return true;
  }
  return false;
};

// Clear all stories (for testing)
const clearAllStories = () => {
  stories = [];
  nextId = 1;
};

module.exports = {
  saveStory,
  getAllStories,
  getStoryById,
  deleteStory,
  clearAllStories
};
