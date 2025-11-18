import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Generate a comprehensive story blueprint
 */
const generateBlueprint = async ({ genre, totalChapters, wordsPerChapter, setting, characters, description }) => {
  try {
    const prompt = `You are a professional novel architect. Create a comprehensive story blueprint for a ${genre} novel with the following requirements:

Genre: ${genre}
Total Chapters: ${totalChapters}
Words per Chapter: ${wordsPerChapter}
Setting: ${setting}
Main Characters: ${characters}
Story Description: ${description}

Create a detailed blueprint in the following JSON format:
{
  "world": {
    "setting": "Detailed description of the world",
    "rules": ["rule 1", "rule 2", "rule 3"],
    "atmosphere": "Overall mood and atmosphere"
  },
  "characters": [
    {
      "name": "Character name",
      "personality": "Personality traits",
      "goals": "Character's main goals",
      "relationships": "Relationships with other characters"
    }
  ],
  "storyArc": {
    "act1": "Setup - Introduction and inciting incident",
    "act2": "Confrontation - Rising action and conflicts",
    "act3": "Resolution - Climax and resolution"
  },
  "chapterOutlines": [
    {
      "chapterNumber": 1,
      "title": "Chapter title",
      "mainEvents": ["event 1", "event 2"],
      "conflicts": ["conflict 1"],
      "hook": "Cliffhanger or hook for next chapter"
    }
  ]
}

IMPORTANT: Return ONLY the JSON object, no additional text or markdown formatting. The chapterOutlines array must have exactly ${totalChapters} chapters.`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const blueprintText = response.text?.trim() || "";
    
    // Try to extract JSON from the response
    let blueprintJson;
    try {
      // Remove markdown code blocks if present
      const cleanedText = blueprintText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      blueprintJson = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse blueprint JSON:', parseError);
      throw new Error('Failed to generate valid blueprint structure');
    }

    return blueprintJson;
  } catch (error) {
    console.error('Gemini API Error (Blueprint):', error);
    throw new Error('Failed to generate story blueprint. Please try again.');
  }
};

/**
 * Generate a single chapter based on blueprint and previous state
 */
const generateChapter = async ({ 
  blueprint, 
  chapterNumber, 
  wordsPerChapter, 
  genre,
  previousChapterSummary = null,
  previousState = null,
  selectedDirection = null
}) => {
  try {
    const chapterOutline = blueprint.chapterOutlines.find(
      outline => outline.chapterNumber === chapterNumber
    );

    if (!chapterOutline) {
      throw new Error(`Chapter outline not found for chapter ${chapterNumber}`);
    }

    let prompt = `You are a professional novelist. Write Chapter ${chapterNumber} of a ${genre} novel.

STORY BLUEPRINT:
World Setting: ${blueprint.world.setting}
World Rules: ${blueprint.world.rules.join(', ')}
Atmosphere: ${blueprint.world.atmosphere}

Characters:
${blueprint.characters.map(c => `- ${c.name}: ${c.personality}. Goals: ${c.goals}`).join('\n')}

Story Arc:
- Act 1: ${blueprint.storyArc.act1}
- Act 2: ${blueprint.storyArc.act2}
- Act 3: ${blueprint.storyArc.act3}

CHAPTER ${chapterNumber} OUTLINE:
Title: ${chapterOutline.title}
Main Events: ${chapterOutline.mainEvents.join(', ')}
Conflicts: ${chapterOutline.conflicts.join(', ')}
Hook: ${chapterOutline.hook}
`;

    if (previousChapterSummary) {
      prompt += `\nPREVIOUS CHAPTER SUMMARY:\n${previousChapterSummary}\n`;
    }

    if (previousState) {
      prompt += `\nCURRENT STATE:\n`;
      if (previousState.characterStates && previousState.characterStates.length > 0) {
        prompt += `Characters:\n${previousState.characterStates.map(cs => 
          `- ${cs.name}: at ${cs.position}, ${cs.condition}, feeling ${cs.emotionalState}`
        ).join('\n')}\n`;
      }
      if (previousState.worldState) {
        prompt += `World State: ${previousState.worldState}\n`;
      }
      if (previousState.plotProgress) {
        prompt += `Plot Progress: ${previousState.plotProgress}\n`;
      }
    }

    if (selectedDirection) {
      prompt += `\nUSER SELECTED DIRECTION: ${selectedDirection}\n`;
      prompt += `Incorporate this direction into the chapter while following the outline.\n`;
    }

    prompt += `\nWrite a complete chapter of approximately ${wordsPerChapter} words. 
The chapter should:
1. Follow the outline's main events and conflicts
2. Maintain continuity with previous chapters
3. Be vivid, engaging, and emotionally compelling
4. End with the specified hook to lead into the next chapter
5. Use literary language appropriate for the ${genre} genre

Write ONLY the chapter content, no titles or additional formatting.`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const chapterContent = response.text?.trim() || "Chapter content unavailable.";

    // Generate chapter summary
    const summaryPrompt = `Summarize the following chapter in 2-3 sentences, focusing on key events and character developments:\n\n${chapterContent}`;
    
    const summaryResponse = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: summaryPrompt,
    });

    const summary = summaryResponse.text?.trim() || "";

    return {
      chapterNumber,
      title: chapterOutline.title,
      content: chapterContent,
      summary,
      mainEvents: chapterOutline.mainEvents,
      conflicts: chapterOutline.conflicts,
      hook: chapterOutline.hook
    };
  } catch (error) {
    console.error('Gemini API Error (Chapter):', error);
    throw new Error(`Failed to generate chapter ${chapterNumber}. Please try again.`);
  }
};

/**
 * Extract state from chapter content
 */
const extractChapterState = async ({ chapterContent, blueprint }) => {
  try {
    const prompt = `Based on the following chapter, extract the current state in JSON format:

Chapter Content:
${chapterContent}

Characters:
${blueprint.characters.map(c => c.name).join(', ')}

Return a JSON object with this structure:
{
  "characterStates": [
    {
      "name": "Character name",
      "position": "Current location",
      "condition": "Physical/mental condition",
      "emotionalState": "Current emotional state"
    }
  ],
  "worldState": "Brief description of world state at chapter end",
  "plotProgress": "Brief summary of plot progression"
}

Return ONLY the JSON object, no additional text.`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const stateText = response.text?.trim() || "{}";
    
    try {
      const cleanedText = stateText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      return JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse state JSON:', parseError);
      return {
        characterStates: [],
        worldState: "State unavailable",
        plotProgress: "Progress unavailable"
      };
    }
  } catch (error) {
    console.error('Gemini API Error (State):', error);
    return {
      characterStates: [],
      worldState: "State unavailable",
      plotProgress: "Progress unavailable"
    };
  }
};

/**
 * Generate continuation suggestions
 */
const generateSuggestions = async ({ 
  blueprint, 
  currentChapter, 
  chapterContent,
  nextChapterOutline 
}) => {
  try {
    const prompt = `You are a creative writing advisor. Based on the story so far, suggest 3-4 different directions for the next chapter.

Current Chapter Content:
${chapterContent.substring(0, 1000)}...

Next Chapter Planned Outline:
Title: ${nextChapterOutline.title}
Main Events: ${nextChapterOutline.mainEvents.join(', ')}

Suggest directions in these categories:
1. Action-focused: More physical action, adventure, conflict
2. Drama-focused: Emotional conflicts, relationships, character development
3. Psychological-focused: Internal struggles, mental challenges, character introspection
4. Mystery-focused: Revelations, secrets, plot twists

Return a JSON array with this structure:
[
  {
    "direction": "action",
    "description": "Brief description of how this direction would develop the story"
  },
  {
    "direction": "drama",
    "description": "..."
  },
  {
    "direction": "psychological",
    "description": "..."
  },
  {
    "direction": "mystery",
    "description": "..."
  }
]

Return ONLY the JSON array, no additional text.`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const suggestionsText = response.text?.trim() || "[]";
    
    try {
      const cleanedText = suggestionsText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      return JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse suggestions JSON:', parseError);
      return [
        { direction: "action", description: "Continue with action-packed sequences" },
        { direction: "drama", description: "Develop emotional depth and relationships" },
        { direction: "psychological", description: "Explore character's inner conflicts" },
        { direction: "mystery", description: "Introduce plot twists and revelations" }
      ];
    }
  } catch (error) {
    console.error('Gemini API Error (Suggestions):', error);
    return [
      { direction: "action", description: "Continue with action-packed sequences" },
      { direction: "drama", description: "Develop emotional depth and relationships" },
      { direction: "psychological", description: "Explore character's inner conflicts" },
      { direction: "mystery", description: "Introduce plot twists and revelations" }
    ];
  }
};

export default {
  generateBlueprint,
  generateChapter,
  extractChapterState,
  generateSuggestions
};
