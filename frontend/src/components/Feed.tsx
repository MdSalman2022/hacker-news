'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { StoriesResponse } from '@/types';
import FeedTabs from './FeedTabs';
import StoryList from './StoryList';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';

export default function Feed() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'top';
  const page = parseInt(searchParams.get('page') || '1');

  const [data, setData] = useState<StoriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .get<StoriesResponse>(`/api/hn/stories?type=${type}&page=${page}`)
      .then((result) => {
        console.log('loaded stories:', type, page, result);
        setData(result);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [type, page]);

  return (
    <>
      <FeedTabs />
      {loading && <LoadingSpinner />}
      {error && <p className="text-red-400 text-sm py-4">{error}</p>}
      {data && (
        <>
          <StoryList stories={data.stories} startIndex={(page - 1) * 20 + 1} />
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onNavigate={(p) => router.push(`/?type=${type}&page=${p}`)}
          />
        </>
      )}
    </>
  );
}
