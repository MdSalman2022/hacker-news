'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Story } from '@/types';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import StoryList from '@/components/StoryList';
import Pagination from '@/components/Pagination';
import SkeletonCard from '@/components/SkeletonCard';
import { useBookmarks } from '@/context/BookmarkContext';

interface BookmarksResponse {
  bookmarks: {
    hnId: number;
    title: string;
    url: string | null;
    author: string;
    points: number;
    commentCount: number;
    hnTime: number;
  }[];
  total: number;
  totalPages: number;
  page: number;
}

export default function BookmarksPage() {
  const { bookmarkedIds } = useBookmarks();
  const [data, setData] = useState<BookmarksResponse | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20' });
    if (search) params.set('search', search);

    api
      .get<BookmarksResponse>(`/api/bookmarks?${params}`)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, page]);

  const handleSearch = (q: string) => {
    setSearch(q);
    setPage(1);
  };

  const stories: Story[] =
    data?.bookmarks
      .filter((b) => bookmarkedIds.has(b.hnId))
      .map((b) => ({
        id: b.hnId,
        title: b.title,
        url: b.url,
        by: b.author,
        score: b.points,
        descendants: b.commentCount,
        time: b.hnTime,
        type: 'story',
      })) || [];

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-4">
        <h1 className="text-base font-semibold text-gray-700 mb-4">Bookmarks</h1>
        <SearchBar onSearch={handleSearch} placeholder="search bookmarks..." />
        {loading ? (
          <div>{Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}</div>
        ) : (
          <>
            {stories.length === 0 && search && (
              <p className="text-gray-400 text-sm py-8 text-center">no results for &quot;{search}&quot;</p>
            )}
            {stories.length === 0 && !search && (
              <p className="text-gray-400 text-sm py-8 text-center">no bookmarks yet</p>
            )}
            {stories.length > 0 && data && (
              <>
                <StoryList stories={stories} />
                <Pagination
                  page={page}
                  totalPages={data.totalPages}
                  onNavigate={setPage}
                />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
