const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

// Image generation routes
router.post('/image', mediaController.generateImage);
router.post('/image/from-story', mediaController.generateImageFromStory);

// Audio generation routes
router.post('/audio', mediaController.generateAudio);
router.post('/audio/from-story', mediaController.generateAudioFromStory);

// Video generation routes
router.post('/video', mediaController.generateVideo);
router.post('/video/from-story', mediaController.generateVideoFromStory);
router.get('/video/status/:id', mediaController.checkVideoStatus);

module.exports = router;
