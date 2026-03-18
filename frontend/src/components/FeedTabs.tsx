'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const tabs = ['top', 'new', 'best'];

export default function FeedTabs() {
  const searchParams = useSearchParams();
  const active = searchParams.get('type') || 'top';

  return (
    <div className="flex gap-1 mb-4">
      {tabs.map((tab) => (
        <Link
          key={tab}
          href={`/?type=${tab}`}
          className={`px-3 py-1 rounded text-sm capitalize ${
            active === tab
              ? 'bg-orange-500 text-white'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {tab}
        </Link>
      ))}
    </div>
  );
}
