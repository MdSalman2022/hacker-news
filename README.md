# Smart Hacker News Reader

A Hacker News client with AI-powered discussion summaries. Browse stories, save bookmarks, and get instant AI summaries of comment threads using Google Gemini.

## What's Done

- ✅ Project structure (frontend/backend separation)
- ✅ Next.js 15 with App Router
- ✅ Express 5 with MVC structure
- ✅ MongoDB + Mongoose 9 setup
- ✅ Docker Compose (mongo, backend, frontend services)
- ✅ Multi-stage Docker builds for production
- ✅ Prettier formatting for frontend and backend
- ✅ Docker environment configuration (per-service env files)
- ✅ HN Feed (top/new/best stories with pagination)
- ✅ Story list (title, points, author, time ago, comment count)
- ✅ Nested comment tree with collapse/expand
- ✅ Bookmark model (Mongoose schema with text index)
- ✅ Bookmark CRUD operations (save, remove, search)
- ✅ BookmarkContext for global state management
- ✅ Instant bookmark feedback (updates UI before server confirms)
- ✅ Bookmarks page with search and pagination
- ✅ Modular AI provider pattern (swap LLMs with one import)
- ✅ Google Gemini Flash integration
- ✅ Summarize Discussion button on story pages
- ✅ Display key points, sentiment, and summary
- ✅ Skeleton loading states for better UX
- ✅ Improved comment tree UI with nested indentation and HTML support
- ✅ Zod validation for all API inputs (bookmarks, summarize)
- ✅ Rate limiting on summarize endpoint (5 requests/min per IP)
- ✅ Structured error responses for validation failures
- ✅ Centralized config (all env vars in one place)
- ✅ Graceful shutdown on SIGTERM/SIGINT signals
- ✅ Clean database disconnection on process termination
- ✅ Health endpoint with DB connection status

## Quick Start

```bash
git clone <repo-url>
cd smart-hn-reader
cp backend/.env.example backend/.env
# Edit backend/.env and set GEMINI_API_KEY=your_key_here
docker-compose up
```

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

Get a free Gemini API key at https://aistudio.google.com

## Features

- ✅ Browse HN stories (top, new, best)
- ✅ Paginated story feed
- ✅ Click story to see full threaded comments
- ✅ Save/remove bookmarks
- ✅ View bookmarked stories
- ✅ Search bookmarks by title or author
- ✅ AI-powered discussion summaries (key points, sentiment, summary)

## Tech Stack

- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS + Lucide Icons
- **Backend:** Express 5 + TypeScript + Zod + Rate Limiting
- **Database:** MongoDB + Mongoose 9 (with text index for search)
- **AI:** Google Gemini Flash
- **Infrastructure:** Docker Compose
- **Code Quality:** Prettier

## Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Next.js 15    │ HTTP │   Express 5     │      │   MongoDB 7     │
│   (Frontend)    │─────▶│   (Backend)     │─────▶│   (Database)    │
│   Port 3000     │      │   Port 5000     │      │   Port 27017    │
└─────────────────┘      └─────────────────┘      └─────────────────┘
                                  │
                       ┌──────────┼──────────┐
                       │ HTTPS    │          │
                       ▼          ▼          ▼
            ┌──────────────────┐  ┌─────────────────┐
            │  Hacker News     │  │  Gemini Flash   │
            │  Firebase API    │  │   (Google AI)   │
            └──────────────────┘  └─────────────────┘
```

## Key Features Implemented

### Bookmarking System

- Save stories to MongoDB with unique hnId index
- Full-text search across title and author
- Instant bookmark feedback (updates UI before server confirms)
- Dedicated bookmarks page with pagination
- Search debouncing for performance

### AI Discussion Summaries

- Modular AI provider pattern (easily swap Gemini for Claude, GPT-4, etc.)
- Summarize any story's comment thread
- Returns: key points, overall sentiment (positive/negative/mixed/neutral), summary
- Skeleton loading states while AI processes
- Display results in clean, readable format

### Production Patterns

- **Input Validation:** Zod schemas validate all API requests (bookmarks, summarize)
- **Error Handling:** Structured 400 responses with validation error details
- **Rate Limiting:** Protect summarize endpoint (5 requests/min per IP) against abuse and API quota drain
- **Config Management:** Centralize all configuration (HN API URL, comment limits, rate limits) in env.ts
- **Graceful Shutdown:** Clean server and database disconnection on SIGTERM/SIGINT
- **Health Checks:** Endpoint reports server status and database connectivity
- **Type Safety:** Full TypeScript coverage with type-safe Zod schemas

### UI/UX Improvements

- Comment tree with collapsible threads
- HTML support in comments (better formatting)
- Nested indentation for easy reading
- Skeleton loaders for all data fetching
- Smooth transitions and responsive design

## Environment Variables

| Variable               | Default                                 | Description                             |
| ---------------------- | --------------------------------------- | --------------------------------------- |
| `PORT`                 | `5000`                                  | Backend server port                     |
| `MONGO_URI`            | `mongodb://localhost:27017/hn-reader`   | MongoDB connection string               |
| `GEMINI_API_KEY`       | —                                       | **Required.** Google AI Studio API key  |
| `GEMINI_MODEL`         | `gemini-flash-lite-latest`              | Gemini model to use                     |
| `FRONTEND_URL`         | `http://localhost:3000`                 | CORS allowed origin                     |
| `NODE_ENV`             | `development`                           | Environment (development or production) |
| `HN_BASE_URL`          | `https://hacker-news.firebaseio.com/v0` | Hacker News API endpoint                |
| `COMMENT_MAX_DEPTH`    | `5`                                     | Max comment nesting depth to fetch      |
| `COMMENT_TOP_LIMIT`    | `50`                                    | Max top-level comments per story        |
| `COMMENT_NESTED_LIMIT` | `20`                                    | Max replies per comment                 |
| `RATE_LIMIT_MAX`       | `5`                                     | Max summarize requests per window       |
| `RATE_LIMIT_WINDOW_MS` | `60000`                                 | Rate limit window (milliseconds)        |

## API Endpoints

```
GET  /health                             # Server status and DB connection
GET  /api/hn/stories?type=top&page=1     # Paginated HN stories (top/new/best)
GET  /api/hn/story/:id                   # Story with comment tree
GET  /api/bookmarks?search=&page=1       # Search bookmarks with pagination
POST /api/bookmarks                      # Save a bookmark
DELETE /api/bookmarks/:hnId              # Remove a bookmark
POST /api/summarize                      # AI summary (rate limited)
```
