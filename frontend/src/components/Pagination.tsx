'use client';

import { useRouter } from 'next/navigation';

interface Props {
  page: number;
  totalPages: number;
  buildUrl: (page: number) => string;
}

export default function Pagination({ page, totalPages, buildUrl }: Props) {
  const router = useRouter();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-6 pb-4 text-sm">
      <button
        onClick={() => router.push(buildUrl(page - 1))}
        disabled={page <= 1}
        className="px-3 py-1 rounded border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50 disabled:cursor-not-allowed"
      >
        ← prev
      </button>
      <span className="text-gray-400">
        page {page} of {totalPages}
      </span>
      <button
        onClick={() => router.push(buildUrl(page + 1))}
        disabled={page >= totalPages}
        className="px-3 py-1 rounded border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50 disabled:cursor-not-allowed"
      >
        next →
      </button>
    </div>
  );
}
