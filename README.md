# 📚 NovelAI - AI-Powered Story Generation Platform

NovelAI is a comprehensive full-stack web application that leverages artificial intelligence to generate creative stories, multi-chapter novels, images, audio narration, and videos. The platform combines multiple AI services to provide users with a complete storytelling experience, from quick single stories to elaborate novels with blueprint-based narrative control.
# UI
<img width="2849" height="1445" alt="image" src="https://github.com/user-attachments/assets/efbbfcc0-b385-4be8-b838-3575e428d32e" />
<img width="2027" height="1026" alt="image" src="https://github.com/user-attachments/assets/0cbba507-b09e-4210-9fda-46b9b9f361df" />
<img width="2027" height="1011" alt="image" src="https://github.com/user-attachments/assets/376de0b3-4474-4c6e-b515-6fa49be01535" />
<img width="2012" height="1016" alt="image" src="https://github.com/user-attachments/assets/d7c8b01e-9a47-4e46-a56b-fbd247c37bf1" />
<img width="2026" height="1016" alt="image" src="https://github.com/user-attachments/assets/678507b9-0dbc-4d4a-89ce-4676c415f119" />
<img width="2020" height="1017" alt="image" src="https://github.com/user-attachments/assets/9c3e8432-2f49-40de-9c60-06485b99050f" />
<img width="2026" height="1009" alt="image" src="https://github.com/user-attachments/assets/a506ad03-cb3b-4ed0-aea2-54e2286280d2" />
<img width="2018" height="1013" alt="image" src="https://github.com/user-attachments/assets/e0a52e1a-be0a-4a18-a881-2faeeda7ca9c" />
## ✨ Key Features

- **🤖 AI Story Generation**: Generate unique stories using Google Gemini AI with customizable parameters (genre, length, setting, characters)
- **📚 Novel Generation**: Create complete multi-chapter novels with AI-powered blueprint system, chapter-by-chapter generation, and interactive story direction choices
- **🎨 Image Generation**: Create stunning visual illustrations from story content using Pollinations AI
- **🎙️ Audio Narration**: Convert stories to speech with multiple voice options using ElevenLabs API
- **🎬 Video Creation**: Combine generated images and audio into videos with animated subtitles using FFmpeg
- **💾 Story & Novel Management**: Save, retrieve, and delete generated stories and novels with MongoDB storage
- **📄 PDF Export**: Export stories to PDF format for offline reading
- **📱 Responsive Design**: Modern, mobile-friendly UI built with React and TailwindCSS
- **🌐 RESTful API**: Well-structured backend API for easy integration

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern UI library
- **Vite 7.1.7** - Fast build tool and dev server
- **TailwindCSS 4.1.16** - Utility-first CSS framework
- **Shadcn UI** - Reusable component library
- **React Router DOM 7.9.4** - Client-side routing
- **Axios 1.13.1** - HTTP client for API requests
- **Lucide React 0.548.0** - Icon library
- **jsPDF 3.0.3 & html2canvas 1.4.1** - PDF generation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web framework
- **MongoDB (Mongoose 8.19.2)** - NoSQL database
- **Google GenAI 1.28.0** - AI story and novel generation using Gemini 2.0 Flash model
- **ElevenLabs 2.23.0** - Text-to-speech conversion
- **Pollinations AI** - Image generation
- **FFmpeg (fluent-ffmpeg 2.1.3 & ffmpeg-static 5.2.0)** - Video processing and subtitle integration
- **Multer 2.0.2** - File upload handling
- **Axios 1.13.1** - HTTP client for external API calls

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** - Database (local installation or MongoDB Atlas account)
- **FFmpeg** - Video processing (automatically included via ffmpeg-static)

### API Keys Required

You will need to obtain API keys from the following services:

1. **Google Gemini API Key** - [Get API Key](https://makersuite.google.com/app/apikey)
2. **MongoDB URI** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
3. **ElevenLabs API Key** - [ElevenLabs](https://elevenlabs.io/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tahuudat2k4/NovelAI.git
cd NovelAI
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the contents from .env.example or create new file
touch .env
```

**Configure the `.env` file with your API keys:**

```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=your_mongodb_connection_string_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
PORT=8080
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install
```

## 🏃 Running the Application

### Start Backend Server

```bash
# From backend directory
cd backend
npm start

# For development with auto-reload
npm run dev
```

The backend server will start on `http://localhost:8080`

### Start Frontend Development Server

```bash
# From frontend directory
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
  - Home page: http://localhost:5173/
  - Story generation: http://localhost:5173/try
  - Novel generation: http://localhost:5173/novel
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/health

## 📁 Project Structure

```
NovelAI/
├── backend/                      # Backend API server
│   ├── config/                   # Configuration files
│   │   └── database.js          # MongoDB connection setup
│   ├── controllers/              # Request handlers
│   │   ├── mediaController.js   # Media generation endpoints
│   │   ├── novelController.js   # Novel CRUD and chapter generation
│   │   └── storyController.js   # Story CRUD operations
│   ├── models/                   # Database models
│   │   ├── Novel.js             # Novel schema with chapters and blueprint
│   │   └── Story.js             # Story schema definition
│   ├── routes/                   # API routes
│   │   ├── mediaRoutes.js       # Media generation routes
│   │   ├── novelRoutes.js       # Novel management routes
│   │   └── storyRoutes.js       # Story management routes
│   ├── services/                 # Business logic layer
│   │   ├── audioGenerationService.js  # ElevenLabs integration
│   │   ├── geminiService.js           # Google Gemini AI integration for stories
│   │   ├── imageGenerationService.js  # Image generation logic
│   │   ├── novelService.js            # Novel blueprint and chapter generation
│   │   ├── storageService.js          # In-memory storage service
│   │   └── videoGenerationService.js  # FFmpeg video creation
│   ├── .env.example              # Environment variables template
│   ├── .gitignore                # Git ignore rules
│   ├── package.json              # Backend dependencies
│   ├── server.js                 # Main server entry point
│   └── README.md                 # Backend documentation
│
├── frontend/                     # React frontend application
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── assets/              # Images, fonts, etc.
│   │   ├── components/          # Reusable components
│   │   │   ├── ui/             # Shadcn UI components
│   │   │   ├── Content.jsx     # Landing page content
│   │   │   ├── ExportStoryPDF.jsx  # PDF export functionality
│   │   │   ├── Footer.jsx      # Footer component
│   │   │   ├── GenAudio.jsx    # Audio generation UI
│   │   │   ├── GenImage.jsx    # Image generation UI
│   │   │   ├── GenVideo.jsx    # Video generation UI
│   │   │   ├── Header.jsx      # Navigation header
│   │   │   ├── ImageOutput.jsx # Image display component
│   │   │   ├── InputForm.jsx   # Story input form
│   │   │   ├── NovelInputForm.jsx  # Novel creation form
│   │   │   ├── NovelList.jsx   # List of saved novels
│   │   │   ├── NovelView.jsx   # Novel reading and chapter navigation
│   │   │   └── Storage.jsx     # Saved stories management
│   │   ├── lib/                 # Utility functions
│   │   ├── pages/               # Page components
│   │   │   ├── LandingPage.jsx # Home page
│   │   │   ├── NovelPage.jsx   # Novel generation and reading page
│   │   │   └── TryPage.jsx     # Story generation page
│   │   ├── services/            # API service layer
│   │   │   ├── mediaServices.js # Media API calls
│   │   │   ├── novelServices.js # Novel API calls
│   │   │   └── storyServices.js # Story API calls
│   │   ├── App.jsx              # Main app component with routing
│   │   ├── index.css            # Global styles
│   │   └── main.jsx             # Application entry point
│   ├── .gitignore
│   ├── components.json          # Shadcn UI configuration
│   ├── eslint.config.js         # ESLint configuration
│   ├── index.html               # HTML template
│   ├── jsconfig.json            # JavaScript configuration
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   └── README.md                # Frontend documentation
│
└── README.md                     # This file - Main project documentation
```

## 🔌 API Endpoints

### Story Management

#### Generate Story
```http
POST /api/v1/stories
Content-Type: application/json

{
  "genre": "Fantasy",
  "length": "700",
  "setting": "An ancient forest",
  "characters": "A brave young woman",
  "description": "A journey to find hidden treasure"
}
```

#### Save Story
```http
POST /api/v1/stories/save
Content-Type: application/json

{
  "title": "Moonlight in the Deep Forest",
  "genre": "Fantasy",
  "length": "700 words",
  "content": "Story content..."
}
```

#### Get All Stories
```http
GET /api/v1/stories
```

#### Delete Story
```http
DELETE /api/v1/stories/:id
```

### Novel Management

#### Create Novel with Blueprint
```http
POST /api/v1/novels
Content-Type: application/json

{
  "title": "The Enchanted Chronicles",
  "genre": "Fantasy",
  "totalChapters": 10,
  "wordsPerChapter": 1000,
  "setting": "A magical realm with ancient forests and mystical creatures",
  "characters": "A young wizard named Elara and her companion, a talking fox",
  "description": "A quest to restore balance to the magical realm"
}
```

#### Generate Next Chapter
```http
POST /api/v1/novels/:id/chapters
Content-Type: application/json

{
  "selectedDirection": "action"  // Optional: "action", "drama", "psychological", or "mystery"
}
```

#### Get Novel by ID
```http
GET /api/v1/novels/:id
```

#### Get All Novels
```http
GET /api/v1/novels
```

#### Delete Novel
```http
DELETE /api/v1/novels/:id
```

#### Get Chapter Suggestions
```http
GET /api/v1/novels/:id/suggestions
```

### Media Generation

#### Generate Image from Prompt
```http
POST /api/v1/media/image
Content-Type: application/json

{
  "prompt": "A mystical forest at night with moonlight"
}
```

#### Generate Image from Story
```http
POST /api/v1/media/image/from-story
Content-Type: application/json

{
  "storyContent": "Your complete story text..."
}
```

#### Generate Audio from Story
```http
POST /api/v1/media/audio/from-story
Content-Type: application/json

{
  "storyText": "Your story text...",
  "voice": "pNInz6obpgDQGcFmaJgB"
}
```

#### Generate Video
```http
POST /api/v1/media/video
Content-Type: multipart/form-data

image: [image file]
audio: [audio file]
text: "Subtitle text"
```

### Health Check
```http
GET /health
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Google Gemini AI API Key
GEMINI_API_KEY=your_api_key_here

# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/NovelAI

# ElevenLabs API Key for Text-to-Speech
ELEVENLABS_API_KEY=your_elevenlabs_key_here

# Server Port
PORT=8080
```

### Available Voice IDs (ElevenLabs)

The application supports multiple voice options for audio generation. You can use different voice IDs in the audio generation request.

## 🎯 Usage Guide

### Creating a Single Story

1. Navigate to the "Try" page
2. Fill in the story parameters:
   - **Genre**: Select or enter your preferred genre (Fantasy, Sci-Fi, Romance, etc.)
   - **Length**: Specify word count (recommended: 500-1000 words)
   - **Setting**: Describe the story's environment
   - **Characters**: Describe main characters
   - **Description**: Provide story plot or theme
3. Click "Generate Story" and wait for AI to create your story

### Creating a Multi-Chapter Novel

1. Navigate to the "Novel" page
2. Fill in the novel parameters:
   - **Title**: Your novel's title
   - **Genre**: Choose the genre for your novel
   - **Total Chapters**: Number of chapters (e.g., 10, 20)
   - **Words per Chapter**: Approximate length of each chapter (recommended: 800-2000 words)
   - **Setting**: Describe the world and environment
   - **Characters**: Describe main characters and their roles
   - **Description**: Provide overall plot and themes
3. Click "Generate Blueprint" to create the story structure
4. Review the blueprint showing:
   - World building and rules
   - Character profiles
   - Story arc (3-act structure)
   - Chapter outlines
5. Generate chapters one by one:
   - Click "Generate Next Chapter" to create each chapter
   - Review AI-suggested directions for the story (action, drama, psychological, mystery)
   - Select a direction to influence the next chapter's tone
   - Read generated chapters and continue the story
6. Save your novel to view and read later

### Generating Media

1. **Generate Image**: After story generation, click "Generate Image" to create a visual representation
2. **Generate Audio**: Click "Generate Audio" and select a voice to hear your story narrated
3. **Create Video**: Use the "Generate Video" feature to combine image and audio with animated subtitles

### Managing Stories and Novels

- **Save Story/Novel**: Click the save button to store your content in the database
- **View Saved Content**: Access the storage section to view all saved stories and novels
- **Delete Content**: Remove unwanted stories or novels from your collection
- **Export to PDF**: Download any story as a PDF file
- **Chapter Navigation**: In novels, navigate between chapters using the chapter selector

## 🏗️ Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

The build output will be in the `frontend/dist` directory.

### Backend Production

For production deployment, consider:

1. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start backend/server.js --name novelai-backend
```

2. Set up a reverse proxy (Nginx/Apache)
3. Use HTTPS with SSL certificates
4. Configure proper CORS settings
5. Set up environment-specific configurations
6. Implement rate limiting and security best practices

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm run lint
```

## 📝 Development Guidelines

### Code Style
- Follow ESLint rules for JavaScript/React
- Use meaningful variable and function names
- Comment complex logic
- Keep components small and focused

### Git Workflow
1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👥 Authors

- **tdprocode** - Initial work and maintenance

## 🙏 Acknowledgments

- Google Gemini AI for story generation capabilities
- ElevenLabs for high-quality text-to-speech
- Pollinations AI for image generation
- FFmpeg for video processing
- All open-source libraries and contributors

## 📞 Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Contact the maintainer

## 🔐 Security Notes

- Never commit API keys or sensitive credentials to version control
- Use environment variables for all sensitive configuration
- Keep your dependencies up to date
- Follow security best practices for production deployment
- The `.env` file should be added to `.gitignore`

## 📊 System Requirements

### Minimum Requirements
- 2GB RAM
- 1GB free disk space
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Stable internet connection for API calls

### Recommended Requirements
- 4GB+ RAM
- 5GB+ free disk space (for video generation)
- Fast internet connection
- Latest browser version

## 🚀 Future Enhancements

- [x] Multi-chapter novel generation with blueprint system
- [x] Interactive story direction selection
- [x] Chapter-by-chapter narrative control
- [ ] User authentication and authorization
- [ ] Multiple language support
- [ ] Advanced story editing tools
- [ ] Story collaboration features
- [ ] Social sharing capabilities
- [ ] Mobile application (React Native)
- [ ] More AI model options (GPT-4, Claude, etc.)
- [ ] Custom voice training
- [ ] Advanced video editing features
- [ ] Story analytics and insights
- [ ] Export novels as ePub/MOBI formats

## 📚 Additional Resources

- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [ElevenLabs API Documentation](https://elevenlabs.io/docs)
- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)

---

**Made with ❤️ by tdprocode**
**10/10 ATI ze ze !!! **
*Happy Story Creating! 📖✨*
