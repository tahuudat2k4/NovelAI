const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');

// Generate a new story
router.post('/', storyController.generateStory);

// Save a story
router.post('/save', storyController.saveStory);

// Get all saved stories
router.get('/', storyController.getSavedStories);

// Delete a story
router.delete('/:id', storyController.deleteStory);

module.exports = router;
