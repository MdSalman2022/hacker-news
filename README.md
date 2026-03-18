# Hacker News Reader

A Hacker News client with AI-powered discussion summaries. Browse stories, save bookmarks, and get instant AI summaries of comment threads using Google Gemini.

## What's Done

- ✅ Project structure (frontend/backend separation)
- ✅ Next.js 15 with App Router
- ✅ Express 5 with MVC structure
- ✅ MongoDB + Mongoose 9 setup
- ✅ Docker Compose (mongo, backend, frontend services)
- ✅ Multi-stage Docker builds for production

## Quick Start

```bash
git clone <repo-url>
cd smart-hn-reader
cp backend/.env.example backend/.env
# Edit backend/.env and set GEMINI_API_KEY=your_key_here
docker-compose up
```
