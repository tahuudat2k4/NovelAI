# NovelAI Backend

Backend API for NovelAI story generation application using Express.js and Google Gemini AI.

## Features

- 📝 Generate AI-powered stories using Google Gemini AI
- 💾 Save and manage generated stories
- 🔄 RESTful API endpoints
- 🚀 Express.js server
- 🔐 Environment variable configuration

## Prerequisites

- Node.js (v14 or higher)
- Google Gemini API Key

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Update `.env` file with your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=8080
   ```

## Running the Server

```bash
npm start
```

The server will start on `http://localhost:8080`

## API Endpoints

### 1. Generate Story
**POST** `/api/v1/stories`

Generate a new story using AI.

**Request Body:**
```json
{
  "genre": "Kỳ ảo",
  "length": "700",
  "setting": "Một khu rừng cổ xưa",
  "characters": "Một cô gái trẻ dũng cảm",
  "description": "Câu chuyện về hành trình tìm kiếm kho báu"
}
```

**Response:**
```json
{
  "success": true,
  "story": "Generated story text..."
}
```

### 2. Save Story
**POST** `/api/v1/stories/save`

Save a generated story to storage.

**Request Body:**
```json
{
  "title": "Ánh trăng trong rừng sâu",
  "genre": "Kỳ ảo",
  "length": "700 từ",
  "content": "Story content..."
}
```

**Response:**
```json
{
  "success": true,
  "story": {
    "id": 1,
    "title": "Ánh trăng trong rừng sâu",
    "genre": "Kỳ ảo",
    "length": "700 từ",
    "content": "Story content...",
    "date": "2025-10-30",
    "createdAt": "2025-10-30T12:00:00.000Z"
  }
}
```

### 3. Get All Saved Stories
**GET** `/api/v1/stories`

Retrieve all saved stories.

**Response:**
```json
{
  "success": true,
  "stories": [
    {
      "id": 1,
      "title": "Story title",
      "genre": "Genre",
      "length": "700 từ",
      "content": "Story content...",
      "date": "2025-10-30",
      "createdAt": "2025-10-30T12:00:00.000Z"
    }
  ]
}
```

### 4. Delete Story
**DELETE** `/api/v1/stories/:id`

Delete a saved story by ID.

**Response:**
```json
{
  "success": true,
  "message": "Story deleted successfully"
}
```

### 5. Health Check
**GET** `/health`

Check if the server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Project Structure

```
backend/
├── server.js                 # Main server entry point
├── routes/
│   └── storyRoutes.js       # API route definitions
├── controllers/
│   └── storyController.js   # Request handlers
├── services/
│   ├── geminiService.js     # Gemini AI integration
│   └── storageService.js    # In-memory storage service
├── .env                      # Environment variables
├── package.json
└── README.md
```

## Technologies Used

- **Express.js** - Web framework
- **Google Generative AI** - AI story generation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Notes

- The current implementation uses in-memory storage for saved stories. For production, consider using a database (MongoDB, PostgreSQL, etc.)
- Make sure to keep your Gemini API key secure and never commit it to version control
- The API is configured to accept requests from the frontend running on `http://localhost:5173` (Vite default port)

## Error Handling

The API includes comprehensive error handling:
- 400: Bad Request (missing required fields)
- 404: Not Found (resource doesn't exist)
- 500: Internal Server Error (server-side errors)

All errors return a JSON response with the following structure:
```json
{
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```
