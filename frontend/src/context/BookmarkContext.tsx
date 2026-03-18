'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { Story } from '@/types';

interface BookmarkContextType {
  bookmarkedIds: Set<number>;
  addBookmark: (story: Story) => Promise<void>;
  removeBookmark: (hnId: number) => Promise<void>;
  isBookmarked: (hnId: number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    api
      .get<{ bookmarks: { hnId: number }[] }>('/api/bookmarks?limit=1000')
      .then((data) => {
        setBookmarkedIds(new Set(data.bookmarks.map((b) => b.hnId)));
      })
      .catch((err) => {
        console.error('failed to load bookmarks:', err);
      });
  }, []);

  const addBookmark = useCallback(async (story: Story) => {
    setBookmarkedIds((prev) => new Set([...prev, story.id]));
    try {
      await api.post('/api/bookmarks', {
        hnId: story.id,
        title: story.title,
        url: story.url,
        author: story.by,
        points: story.score,
        commentCount: story.descendants,
        hnTime: story.time,
      });
    } catch (err) {
      console.error('failed to bookmark:', err);
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        next.delete(story.id);
        return next;
      });
    }
  }, []);

  const removeBookmark = useCallback(async (hnId: number) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      next.delete(hnId);
      return next;
    });
    try {
      await api.delete(`/api/bookmarks/${hnId}`);
    } catch {
      setBookmarkedIds((prev) => new Set([...prev, hnId]));
    }
  }, []);

  const isBookmarked = useCallback((hnId: number) => bookmarkedIds.has(hnId), [bookmarkedIds]);

  return (
    <BookmarkContext.Provider value={{ bookmarkedIds, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error('useBookmarks must be used inside BookmarkProvider');
  return ctx;
}
