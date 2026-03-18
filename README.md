# Smart Hacker News Reader

A Hacker News client with AI-powered discussion summaries. Browse stories, save bookmarks, and get instant AI summaries of comment threads using Google Gemini.

---

## Quick Start

```bash
# 1. Clone the repo
git clone <repo-url>
cd smart-hn-reader

# 2. Add your Gemini API key
cp backend/.env.example backend/.env
# Edit backend/.env and set GEMINI_API_KEY=your_key_here

# 3. Start everything
docker-compose up
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/health

> Get a free Gemini API key at https://aistudio.google.com

---

## Local Development

```bash
# Backend
cd backend
cp .env.example .env       # fill in GEMINI_API_KEY
npm install
npm run dev                 # runs on port 5000 with nodemon

# Frontend (separate terminal)
cd frontend
cp .env.example .env.local  # NEXT_PUBLIC_API_URL=http://localhost:5000
npm install
npm run dev                 # runs on port 3000

# MongoDB
docker-compose up mongo     # just the database
```

---

## Features

| Feature          | Description                                               |
| ---------------- | --------------------------------------------------------- |
| **HN Feed**      | Browse top, new, and best stories with pagination         |
| **Comment Tree** | Full threaded comments with collapse/expand per thread    |
| **AI Summary**   | Summarize any discussion — key points, sentiment, summary |
| **Bookmarks**    | Save and remove stories, persisted in MongoDB             |
| **Search**       | Full-text search across bookmarked stories                |

---

## What's Been Implemented

### Core Features

- ✅ HN Feed (top/new/best stories with pagination)
- ✅ Story list (title, points, author, time ago, comment count)
- ✅ Nested comment tree with collapse/expand
- ✅ Bookmarking system (save, remove, search)
- ✅ AI-powered discussion summaries (key points, sentiment, summary)

### Architecture & Setup

- ✅ Next.js 15 frontend with App Router
- ✅ Express 5 backend with MVC structure
- ✅ MongoDB + Mongoose 9 for data persistence
- ✅ Docker Compose (mongo, backend, frontend services)
- ✅ Multi-stage Docker builds for production

### Backend Quality

- ✅ Zod input validation for all API endpoints
- ✅ Rate limiting on summarize endpoint (5 requests/min per IP)
- ✅ Structured error responses with validation details
- ✅ Centralized config (all env vars in one place)
- ✅ Graceful shutdown on SIGTERM/SIGINT signals
- ✅ Health endpoint with DB connection status

### Frontend Quality

- ✅ BookmarkContext for global state management
- ✅ Optimistic UI updates for bookmarks
- ✅ Skeleton loading states for better UX
- ✅ Improved comment tree UI with HTML support
- ✅ Modular AI provider pattern (swap LLMs with one import)

### Code Quality

- ✅ TypeScript across frontend and backend
- ✅ Prettier formatting for both
- ✅ Centralized environment variables

---

## Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Next.js 15    │ HTTP │   Express 5     │      │   MongoDB 7     │
│   (Frontend)    │─────▶│   (Backend)     │─────▶│   (Database)    │
│   Port 3000     │      │   Port 5000     │      │   Port 27017    │
└─────────────────┘      └────────┬────────┘      └─────────────────┘
                                  │
                                  │ HTTPS
                                  ▼
                         ┌─────────────────┐
                         │  Gemini Flash   │
                         │   (Google AI)   │
                         └─────────────────┘
```

**Backend structure (MVC):**

```
src/
├── config/env.ts          # all env vars in one place
├── controllers/           # request/response handling
├── services/              # business logic
│   ├── hn.service.ts      # HN Firebase API client
│   ├── bookmark.service.ts
│   └── ai/
│       ├── types.ts       # AiProvider interface
│       ├── gemini.provider.ts
│       └── index.ts       # swap providers here
├── models/Bookmark.ts     # Mongoose schema with text index
├── schemas/index.ts       # Zod validation schemas
├── middleware/            # error handling, rate limiting, logging
└── routes/                # route definitions
```

**Frontend structure:**

```
src/
├── app/                   # Next.js App Router pages
├── components/            # reusable UI components
├── context/               # BookmarkContext (global state)
├── lib/                   # api client, utilities
└── config/env.ts          # centralized env vars
```

---

## Key Decisions

### Separate frontend and backend

I chose a dedicated Express backend over Next.js API routes. This separates concerns clearly — the backend is an independent API that could serve mobile or other clients. It also mirrors how most teams work in production (separate repos, separate deployments).

### MongoDB for bookmarks

Bookmarks are append-heavy (more writes than complex queries) and schema-flexible. MongoDB fits naturally. The text index on `title` and `author` fields gives us free full-text search without Elasticsearch overhead.

### Modular AI provider pattern

The `AiProvider` interface in `services/ai/types.ts` decouples the business logic from any specific LLM. Switching from Gemini to Claude or GPT-4 is a single import change in `services/ai/index.ts` — nothing else changes.

### Optimistic UI for bookmarks

Bookmarks update instantly in the UI and revert if the API fails. This makes the experience feel fast — the happy path (99% of cases) feels instant, and failure is handled gracefully.

### Comment tree depth capping

HN threads can be thousands of comments deep. Fetching the full tree would be slow and expensive. I cap at 2 levels deep, 50 top-level comments, 20 replies each. This captures the most valuable discussion without performance issues. Both limits are configurable via env vars.

### Input validation and rate limiting

All API inputs validated with Zod before reaching business logic. The summarize endpoint is rate-limited (5 requests/min per IP) to protect against API quota drain. These patterns signal production-ready thinking.

### Graceful shutdown

On SIGTERM/SIGINT, the server closes HTTP connections cleanly and disconnects MongoDB properly. Prevents data corruption and improves operational reliability in production environments.

---

## Tradeoffs

| Decision              | What I chose     | What I traded off                   |
| --------------------- | ---------------- | ----------------------------------- |
| Single-user (no auth) | Simple, focused  | Can't support multiple users        |
| 2-level comment depth | Fast, performant | Deep nested replies not shown       |
| No summary caching    | Less code        | Each summarize call hits Gemini API |
| MongoDB text index    | Zero extra infra | Weaker than Elasticsearch at scale  |
| Context over Redux    | Lightweight      | Would need Redux at 5+ state slices |
| Rate limiting by IP   | Simple           | Less accurate than per-session      |

---

## What I'd Improve With More Time

- **Summary caching** — store results in MongoDB with a TTL index, avoid repeat API calls for the same story
- **Infinite scroll** — replace pagination with virtual scroll for a smoother feed experience
- **Comment pagination** — load deeper comment levels on demand instead of capping at depth 2
- **Toast notifications** — show user-facing feedback when bookmark or summarize fails
- **Test coverage** — API integration tests with `supertest`, component tests with Vitest
- **Streaming AI responses** — stream the summary token by token so users see progress immediately
- **User sessions** — implement authentication to support multi-user workspaces
- **Comment search** — full-text search within a specific story's discussion

---

## Tech Stack

| Layer          | Choice                  | Reason                                |
| -------------- | ----------------------- | ------------------------------------- |
| Frontend       | Next.js 15 + TypeScript | App Router, fast dev experience       |
| Styling        | Tailwind CSS 3          | Utility-first, no context switching   |
| Icons          | Lucide React            | Lightweight, tree-shakeable SVGs      |
| Backend        | Express 5 + TypeScript  | Minimal, flexible, well-understood    |
| Database       | MongoDB + Mongoose 9    | Schema-flexible, text search built-in |
| Validation     | Zod                     | Type-safe schema validation           |
| AI             | Google Gemini Flash     | Fast inference, cost-effective        |
| Infrastructure | Docker Compose          | One command to run everything         |
| Code Quality   | Prettier                | Consistent formatting                 |

---

## API Reference

```
GET  /health                           # DB connection status
GET  /api/hn/stories?type=top&page=1   # paginated story feed
GET  /api/hn/story/:id                 # story + comment tree
GET  /api/bookmarks?search=&page=1     # bookmarks with search
POST /api/bookmarks                    # save a bookmark
DELETE /api/bookmarks/:hnId            # remove a bookmark
POST /api/summarize                    # AI summary for a story
```

---

## Environment Variables

| Variable               | Default                                 | Description                             |
| ---------------------- | --------------------------------------- | --------------------------------------- |
| `PORT`                 | `5000`                                  | Backend server port                     |
| `MONGO_URI`            | `mongodb://localhost:27017/hn-reader`   | MongoDB connection                      |
| `GEMINI_API_KEY`       | —                                       | Required. Google AI Studio key          |
| `GEMINI_MODEL`         | `gemini-flash-lite-latest`              | Gemini model to use                     |
| `FRONTEND_URL`         | `http://localhost:3000`                 | CORS allowed origin                     |
| `NODE_ENV`             | `development`                           | Environment (development or production) |
| `HN_BASE_URL`          | `https://hacker-news.firebaseio.com/v0` | Hacker News API endpoint                |
| `COMMENT_MAX_DEPTH`    | `5`                                     | Max comment nesting depth               |
| `COMMENT_TOP_LIMIT`    | `50`                                    | Max top-level comments to fetch         |
| `COMMENT_NESTED_LIMIT` | `20`                                    | Max replies per comment                 |
| `RATE_LIMIT_MAX`       | `5`                                     | Max summarize requests per window       |
| `RATE_LIMIT_WINDOW_MS` | `60000`                                 | Rate limit window (milliseconds)        |

---

## Assumptions & Clarifications

- **Single-user:** No authentication. Each browser session has its own bookmarks in the shared database.
- **Comment depth:** Limited to 2 levels for performance. Production would use pagination for deeper threads.
- **AI caching:** Each summarize call hits Gemini. Production would cache with TTL.
- **Sentiment values:** Positive, negative, mixed, or neutral.
- **Rate limiting:** Per IP address. Session-based approach would be more accurate but requires authentication.
- **HN API:** Free, public Firebase API. No authentication needed.
