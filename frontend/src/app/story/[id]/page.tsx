'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import { StoryResponse, SummaryResult } from '@/types';
import { timeAgo, getDomain } from '@/lib/utils';
import Header from '@/components/Header';
import CommentTree from '@/components/CommentTree';
import SummaryDisplay from '@/components/SummaryDisplay';

interface Props {
  params: Promise<{ id: string }>;
}

export default function StoryPage({ params }: Props) {
  const { id } = use(params);
  const [data, setData] = useState<StoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<StoryResponse>(`/api/hn/story/${id}`)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSummarize = async () => {
    setSummaryLoading(true);
    setSummaryError(null);
    try {
      const result = await api.post<SummaryResult>('/api/summarize', { storyId: parseInt(id) });
      setSummary(result);
    } catch (err) {
      setSummaryError(err instanceof Error ? err.message : 'failed to summarize');
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-4"
        >
          <ArrowLeft size={14} />
          back
        </Link>

        {loading && (
          <div className="animate-pulse space-y-4 mt-4">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-5 bg-gray-200 rounded w-1/2" />
            <div className="flex gap-3 mt-2">
              <div className="h-3 bg-gray-200 rounded w-10" />
              <div className="h-3 bg-gray-200 rounded w-20" />
              <div className="h-3 bg-gray-200 rounded w-14" />
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-24" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              ))}
            </div>
          </div>
        )}
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
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-gray-700">
                  Comments ({data.comments.length})
                </h2>
                {data.comments.length > 0 && !summary && (
                  <button
                    onClick={handleSummarize}
                    disabled={summaryLoading}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-orange-200 text-orange-600 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles size={13} />
                    {summaryLoading ? 'summarizing...' : 'summarize'}
                  </button>
                )}
              </div>

              {summaryError && <p className="text-red-400 text-xs mb-3">{summaryError}</p>}

              {summary && (
                <SummaryDisplay
                  keyPoints={summary.keyPoints}
                  sentiment={summary.sentiment}
                  summary={summary.summary}
                  onClose={() => setSummary(null)}
                />
              )}

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
