const mongoose = require('mongoose');

// Schema for individual chapters
const chapterSchema = new mongoose.Schema({
  chapterNumber: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    trim: true
  },
  mainEvents: [String],
  conflicts: [String],
  hook: {
    type: String,
    trim: true
  },
  state: {
    characterStates: [{
      name: String,
      position: String,
      condition: String,
      emotionalState: String
    }],
    worldState: String,
    plotProgress: String
  }
}, {
  _id: true,
  timestamps: true
});

// Schema for chapter outlines
const chapterOutlineSchema = new mongoose.Schema({
  chapterNumber: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  mainEvents: [String],
  conflicts: [String],
  hook: {
    type: String,
    trim: true
  }
});

// Schema for story blueprint
const blueprintSchema = new mongoose.Schema({
  world: {
    setting: String,
    rules: [String],
    atmosphere: String
  },
  characters: [{
    name: String,
    personality: String,
    goals: String,
    relationships: String
  }],
  storyArc: {
    act1: String,  // Setup
    act2: String,  // Confrontation
    act3: String   // Resolution
  },
  chapterOutlines: [chapterOutlineSchema]
});

// Main Novel schema
const novelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  totalChapters: {
    type: Number,
    required: true,
    min: 1
  },
  wordsPerChapter: {
    type: Number,
    required: true,
    min: 100
  },
  setting: {
    type: String,
    trim: true
  },
  characters: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  blueprint: blueprintSchema,
  chapters: [chapterSchema],
  currentChapter: {
    type: Number,
    default: 0
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  lastSuggestions: [{
    direction: String,
    description: String
  }]
}, {
  timestamps: true
});

// Add indexes for better query performance
novelSchema.index({ createdAt: -1 });
novelSchema.index({ genre: 1 });
novelSchema.index({ isCompleted: 1 });

// Add method to get novel summary
novelSchema.methods.getSummary = function() {
  return {
    id: this._id,
    title: this.title,
    genre: this.genre,
    totalChapters: this.totalChapters,
    currentChapter: this.currentChapter,
    isCompleted: this.isCompleted,
    progress: `${this.chapters.length}/${this.totalChapters} chapters`,
    createdAt: this.createdAt
  };
};

const Novel = mongoose.model('Novel', novelSchema);

module.exports = Novel;
