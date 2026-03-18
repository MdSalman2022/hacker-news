'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api';
import { StoryResponse } from '@/types';
import { timeAgo, getDomain } from '@/lib/utils';
import Header from '@/components/Header';
import CommentTree from '@/components/CommentTree';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Props {
  params: Promise<{ id: string }>;
}

export default function StoryPage({ params }: Props) {
  const { id } = use(params);
  const [data, setData] = useState<StoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<StoryResponse>(`/api/hn/story/${id}`)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-4">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-4">
          <ArrowLeft size={14} />
          back
        </Link>

        {loading && <LoadingSpinner />}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {data && (
          <>
            <div className="mb-6">
              <a
                href={data.story.url || `https://news.ycombinator.com/item?id=${data.story.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-gray-900 hover:text-orange-500 leading-snug"
              >
                {data.story.title}
              </a>
              {data.story.url && (
                <span className="text-gray-400 text-xs ml-2">({getDomain(data.story.url)})</span>
              )}
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span>{data.story.score} pts</span>
                <span>by {data.story.by}</span>
                <span>{timeAgo(data.story.time)}</span>
                <span>{data.story.descendants} comments</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-3">
                comments ({data.comments.length})
              </h2>
              {data.comments.length === 0 ? (
                <p className="text-gray-400 text-sm">no comments yet</p>
              ) : (
                <CommentTree comments={data.comments} />
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
