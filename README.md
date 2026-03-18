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
- **Backend:** Express 5 + TypeScript
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

### UI/UX Improvements

- Comment tree with collapsible threads
- HTML support in comments (better formatting)
- Nested indentation for easy reading
- Skeleton loaders for all data fetching
- Smooth transitions and responsive design
