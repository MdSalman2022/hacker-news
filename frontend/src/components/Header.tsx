'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-orange-500">
      <div className="max-w-3xl mx-auto px-4 py-2 flex items-center gap-6">
        <Link href="/" className="font-bold text-white text-base">
          HN Reader
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link
            href="/"
            className={`${pathname === '/' ? 'text-white font-medium' : 'text-orange-100 hover:text-white'}`}
          >
            Feed
          </Link>
          <Link
            href="/bookmarks"
            className={`${pathname === '/bookmarks' ? 'text-white font-medium' : 'text-orange-100 hover:text-white'}`}
          >
            Bookmarks
          </Link>
        </nav>
      </div>
    </header>
  );
}
