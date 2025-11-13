const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const multer = require('multer');
// multer config: lưu tạm file vào bộ nhớ
const upload = multer({ storage: multer.memoryStorage() });

// Image generation routes
router.post('/image', mediaController.generateImage);
router.post('/image/from-story', mediaController.generateImageFromStory);

// Audio generation routes
router.post('/audio/from-story', mediaController.generateAudioFromStory);

// Video generation routes
router.post('/video', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]), mediaController.generateVideoFromFormData);


module.exports = router;