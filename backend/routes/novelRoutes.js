const express = require('express');
const router = express.Router();
const novelController = require('../controllers/novelController');

// Create a new novel with blueprint
router.post('/', novelController.createNovel);

// Generate next chapter for a novel
router.post('/:id/chapters', novelController.generateNextChapter);

// Get novel by ID
router.get('/:id', novelController.getNovel);

// Get all novels
router.get('/', novelController.getAllNovels);

// Delete a novel
router.delete('/:id', novelController.deleteNovel);

// Get suggestions for next chapter
router.get('/:id/suggestions', novelController.getSuggestions);

module.exports = router;
