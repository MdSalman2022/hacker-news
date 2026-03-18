'use client';

import { BookmarkProvider } from '@/context/BookmarkContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <BookmarkProvider>{children}</BookmarkProvider>;
}
