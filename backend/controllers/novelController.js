const Novel = require('../models/Novel');
const novelService = require('../services/novelService').default;

/**
 * Create a new novel with blueprint
 */
const createNovel = async (req, res, next) => {
  try {
    const { genre, totalChapters, wordsPerChapter, setting, characters, description, title } = req.body;

    // Validate required fields
    if (!genre || !totalChapters || !wordsPerChapter || !description) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields: genre, totalChapters, wordsPerChapter, and description are required',
          status: 400
        }
      });
    }

    // Validate numbers
    if (totalChapters < 1 || totalChapters > 100) {
      return res.status(400).json({
        error: {
          message: 'Total chapters must be between 1 and 100',
          status: 400
        }
      });
    }

    if (wordsPerChapter < 100 || wordsPerChapter > 5000) {
      return res.status(400).json({
        error: {
          message: 'Words per chapter must be between 100 and 5000',
          status: 400
        }
      });
    }

    // Generate blueprint
    const blueprint = await novelService.generateBlueprint({
      genre,
      totalChapters,
      wordsPerChapter,
      setting,
      characters,
      description
    });

    // Create novel document
    const novel = new Novel({
      title: title || description.substring(0, 50) + '...',
      genre,
      totalChapters,
      wordsPerChapter,
      setting,
      characters,
      description,
      blueprint,
      chapters: [],
      currentChapter: 0
    });

    await novel.save();

    res.status(201).json({
      success: true,
      novel: {
        id: novel._id,
        title: novel.title,
        genre: novel.genre,
        totalChapters: novel.totalChapters,
        wordsPerChapter: novel.wordsPerChapter,
        blueprint: novel.blueprint,
        currentChapter: novel.currentChapter
      }
    });
  } catch (error) {
    console.error('Error creating novel:', error);
    next(error);
  }
};

/**
 * Generate next chapter for a novel
 */
const generateNextChapter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { selectedDirection } = req.body;

    const novel = await Novel.findById(id);
    if (!novel) {
      return res.status(404).json({
        error: {
          message: 'Novel not found',
          status: 404
        }
      });
    }

    if (novel.isCompleted) {
      return res.status(400).json({
        error: {
          message: 'Novel is already completed',
          status: 400
        }
      });
    }

    const nextChapterNumber = novel.chapters.length + 1;

    if (nextChapterNumber > novel.totalChapters) {
      return res.status(400).json({
        error: {
          message: 'All chapters have been generated',
          status: 400
        }
      });
    }

    // Get previous chapter info
    const previousChapter = novel.chapters.length > 0 
      ? novel.chapters[novel.chapters.length - 1] 
      : null;
    
    const previousSummary = previousChapter ? previousChapter.summary : null;
    const previousState = previousChapter ? previousChapter.state : null;

    // Generate chapter
    const chapter = await novelService.generateChapter({
      blueprint: novel.blueprint,
      chapterNumber: nextChapterNumber,
      wordsPerChapter: novel.wordsPerChapter,
      genre: novel.genre,
      previousChapterSummary: previousSummary,
      previousState: previousState,
      selectedDirection: selectedDirection
    });

    // Extract state from chapter
    const state = await novelService.extractChapterState({
      chapterContent: chapter.content,
      blueprint: novel.blueprint
    });

    chapter.state = state;

    // Add chapter to novel
    novel.chapters.push(chapter);
    novel.currentChapter = nextChapterNumber;

    // Check if novel is completed
    if (nextChapterNumber >= novel.totalChapters) {
      novel.isCompleted = true;
      novel.lastSuggestions = [];
    } else {
      // Generate suggestions for next chapter
      const nextChapterOutline = novel.blueprint.chapterOutlines.find(
        outline => outline.chapterNumber === nextChapterNumber + 1
      );

      if (nextChapterOutline) {
        const suggestions = await novelService.generateSuggestions({
          blueprint: novel.blueprint,
          currentChapter: nextChapterNumber,
          chapterContent: chapter.content,
          nextChapterOutline
        });
        novel.lastSuggestions = suggestions;
      }
    }

    await novel.save();

    res.status(200).json({
      success: true,
      chapter: {
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        content: chapter.content,
        summary: chapter.summary,
        mainEvents: chapter.mainEvents,
        conflicts: chapter.conflicts,
        hook: chapter.hook,
        state: chapter.state
      },
      suggestions: novel.lastSuggestions,
      isCompleted: novel.isCompleted,
      progress: {
        current: novel.currentChapter,
        total: novel.totalChapters
      }
    });
  } catch (error) {
    console.error('Error generating chapter:', error);
    next(error);
  }
};

/**
 * Get novel by ID
 */
const getNovel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const novel = await Novel.findById(id);

    if (!novel) {
      return res.status(404).json({
        error: {
          message: 'Novel not found',
          status: 404
        }
      });
    }

    res.status(200).json({
      success: true,
      novel: novel
    });
  } catch (error) {
    console.error('Error fetching novel:', error);
    next(error);
  }
};

/**
 * Get all novels
 */
const getAllNovels = async (req, res, next) => {
  try {
    const novels = await Novel.find()
      .select('title genre totalChapters currentChapter isCompleted createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      novels: novels
    });
  } catch (error) {
    console.error('Error fetching novels:', error);
    next(error);
  }
};

/**
 * Delete novel
 */
const deleteNovel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const novel = await Novel.findByIdAndDelete(id);

    if (!novel) {
      return res.status(404).json({
        error: {
          message: 'Novel not found',
          status: 404
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Novel deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting novel:', error);
    next(error);
  }
};

/**
 * Get suggestions for next chapter
 */
const getSuggestions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const novel = await Novel.findById(id);

    if (!novel) {
      return res.status(404).json({
        error: {
          message: 'Novel not found',
          status: 404
        }
      });
    }

    res.status(200).json({
      success: true,
      suggestions: novel.lastSuggestions || []
    });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    next(error);
  }
};

module.exports = {
  createNovel,
  generateNextChapter,
  getNovel,
  getAllNovels,
  deleteNovel,
  getSuggestions
};
