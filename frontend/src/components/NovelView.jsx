import React, { useState } from 'react';
import { generateNextChapter } from '../services/novelServices';
import { ChevronDown, ChevronUp, BookOpen, Sparkles } from 'lucide-react';

const NovelView = ({ novel: initialNovel, onBack }) => {
  const [novel, setNovel] = useState(initialNovel);
  const [loading, setLoading] = useState(false);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState(new Set());

  const toggleChapter = (chapterNumber) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterNumber)) {
      newExpanded.delete(chapterNumber);
    } else {
      newExpanded.add(chapterNumber);
    }
    setExpandedChapters(newExpanded);
  };

  const handleGenerateChapter = async () => {
    setLoading(true);
    try {
      const result = await generateNextChapter(novel.id, selectedDirection);

      if (result.success) {
        // Update novel with new chapter and suggestions
        setNovel(prevNovel => ({
          ...prevNovel,
          chapters: [...(prevNovel.chapters || []), result.chapter],
          currentChapter: result.progress.current,
          isCompleted: result.isCompleted,
          lastSuggestions: result.suggestions || []
        }));

        // Auto-expand the new chapter
        setExpandedChapters(prev => new Set([...prev, result.chapter.chapterNumber]));

        // Reset selected direction
        setSelectedDirection(null);

        // Scroll to bottom
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      console.error("Error generating chapter:", err);
      alert("⚠️ Error generating chapter. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const getDirectionIcon = (direction) => {
    switch(direction.toLowerCase()) {
      case 'action': return '⚔️';
      case 'drama': return '💔';
      case 'psychological': return '🧠';
      case 'mystery': return '🔍';
      default: return '✨';
    }
  };

  const getDirectionColor = (direction) => {
    switch(direction.toLowerCase()) {
      case 'action': return 'from-red-600 to-orange-600';
      case 'drama': return 'from-pink-600 to-rose-600';
      case 'psychological': return 'from-purple-600 to-indigo-600';
      case 'mystery': return 'from-blue-600 to-cyan-600';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <div className="m-7">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-purple-400">{novel.title || 'Untitled Novel'}</h1>
          <p className="text-gray-400 mt-2">
            {novel.genre} • {novel.chapters?.length || 0}/{novel.totalChapters} chapters • {novel.wordsPerChapter} words/chapter
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          ← Back
        </button>
      </div>

      {/* Blueprint Display */}
      {novel.blueprint && (
        <div className="mb-6 p-6 bg-slate-900/50 rounded-lg border border-purple-500/20">
          <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Story Blueprint
          </h2>

          {/* World */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-green-400 mb-2">🌍 World</h3>
            <p className="text-gray-300 mb-2"><strong>Setting:</strong> {novel.blueprint.world?.setting}</p>
            <p className="text-gray-300 mb-2"><strong>Atmosphere:</strong> {novel.blueprint.world?.atmosphere}</p>
            {novel.blueprint.world?.rules && novel.blueprint.world.rules.length > 0 && (
              <div>
                <strong className="text-gray-300">Rules:</strong>
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  {novel.blueprint.world.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Characters */}
          {novel.blueprint.characters && novel.blueprint.characters.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">👥 Characters</h3>
              {novel.blueprint.characters.map((char, idx) => (
                <div key={idx} className="mb-3 ml-4 text-gray-300">
                  <p><strong className="text-blue-300">{char.name}</strong></p>
                  <p className="text-sm text-gray-400">• Personality: {char.personality}</p>
                  <p className="text-sm text-gray-400">• Goals: {char.goals}</p>
                  {char.relationships && <p className="text-sm text-gray-400">• Relationships: {char.relationships}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Story Arc */}
          {novel.blueprint.storyArc && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">📖 Story Arc</h3>
              <div className="ml-4 space-y-2 text-gray-300">
                <p><strong className="text-yellow-300">Act 1 (Setup):</strong> {novel.blueprint.storyArc.act1}</p>
                <p><strong className="text-yellow-300">Act 2 (Confrontation):</strong> {novel.blueprint.storyArc.act2}</p>
                <p><strong className="text-yellow-300">Act 3 (Resolution):</strong> {novel.blueprint.storyArc.act3}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chapters */}
      {novel.chapters && novel.chapters.length > 0 && (
        <div className="mb-6 space-y-4">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Chapters</h2>
          {novel.chapters.map((chapter) => (
            <div key={chapter.chapterNumber} className="bg-slate-900/50 rounded-lg border border-green-500/20 overflow-hidden">
              {/* Chapter Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-slate-800/50 transition-colors flex justify-between items-center"
                onClick={() => toggleChapter(chapter.chapterNumber)}
              >
                <div>
                  <h3 className="text-xl font-bold text-green-400">
                    Chapter {chapter.chapterNumber}: {chapter.title}
                  </h3>
                  {chapter.summary && (
                    <p className="text-gray-400 text-sm mt-1">{chapter.summary}</p>
                  )}
                </div>
                {expandedChapters.has(chapter.chapterNumber) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {/* Chapter Content */}
              {expandedChapters.has(chapter.chapterNumber) && (
                <div className="p-4 border-t border-green-500/20">
                  <div className="text-gray-300 whitespace-pre-line mb-4">
                    {chapter.content}
                  </div>

                  {/* Chapter Metadata */}
                  {(chapter.mainEvents || chapter.conflicts || chapter.hook) && (
                    <div className="mt-4 pt-4 border-t border-gray-700 space-y-2 text-sm">
                      {chapter.mainEvents && chapter.mainEvents.length > 0 && (
                        <div>
                          <strong className="text-green-400">Main Events:</strong>
                          <ul className="list-disc list-inside ml-4 text-gray-400">
                            {chapter.mainEvents.map((event, idx) => (
                              <li key={idx}>{event}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {chapter.conflicts && chapter.conflicts.length > 0 && (
                        <div>
                          <strong className="text-red-400">Conflicts:</strong>
                          <ul className="list-disc list-inside ml-4 text-gray-400">
                            {chapter.conflicts.map((conflict, idx) => (
                              <li key={idx}>{conflict}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {chapter.hook && (
                        <div>
                          <strong className="text-purple-400">Hook:</strong>
                          <p className="ml-4 text-gray-400">{chapter.hook}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Generate Next Chapter Section */}
      {!novel.isCompleted && (
        <div className="p-6 bg-slate-900/50 rounded-lg border border-purple-500/20">
          <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {novel.chapters && novel.chapters.length > 0 ? 'Generate Next Chapter' : 'Start Writing'}
          </h2>

          {/* Direction Suggestions */}
          {novel.lastSuggestions && novel.lastSuggestions.length > 0 && (
            <div className="mb-6">
              <p className="text-gray-300 mb-3">Choose a direction for the next chapter:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {novel.lastSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDirection(suggestion.direction)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedDirection === suggestion.direction
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-gray-600 hover:border-purple-400/50 bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{getDirectionIcon(suggestion.direction)}</span>
                      <span className="font-semibold text-white capitalize">{suggestion.direction}</span>
                    </div>
                    <p className="text-sm text-gray-400">{suggestion.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerateChapter}
            disabled={loading}
            className={`w-full px-6 py-3 bg-gradient-to-r ${
              selectedDirection ? getDirectionColor(selectedDirection) : 'from-purple-600 to-pink-600'
            } text-white rounded-md hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Chapter {(novel.chapters?.length || 0) + 1}...
              </div>
            ) : (
              `Generate Chapter ${(novel.chapters?.length || 0) + 1}${selectedDirection ? ` (${selectedDirection})` : ''}`
            )}
          </button>

          {novel.chapters && novel.chapters.length === 0 && (
            <p className="text-gray-400 text-sm mt-3 text-center">
              Start your novel journey by generating the first chapter!
            </p>
          )}
        </div>
      )}

      {/* Completion Message */}
      {novel.isCompleted && (
        <div className="p-6 bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-lg border border-green-500/50 text-center">
          <h2 className="text-2xl font-bold text-green-400 mb-2">🎉 Novel Complete!</h2>
          <p className="text-gray-300">
            Congratulations! You've completed all {novel.totalChapters} chapters of "{novel.title}".
          </p>
        </div>
      )}
    </div>
  );
};

export default NovelView;