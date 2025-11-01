const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  genre: {
    type: String,
    trim: true,
    maxlength: [50, 'Genre cannot exceed 50 characters']
  },
  length: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  date: {
    type: String
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Add indexes for better query performance
storySchema.index({ createdAt: -1 });
storySchema.index({ genre: 1 });

// Add a method to get story summary
storySchema.methods.getSummary = function() {
  return {
    id: this._id,
    title: this.title,
    genre: this.genre,
    length: this.length,
    date: this.date,
    createdAt: this.createdAt,
    contentPreview: this.content.substring(0, 100) + '...'
  };
};

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
