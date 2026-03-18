'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '@/context/BookmarkContext';
import { Story } from '@/types';

interface Props {
  story: Story;
}

export default function BookmarkButton({ story }: Props) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const saved = isBookmarked(story.id);

  const toggle = async () => {
    if (saved) {
      await removeBookmark(story.id);
    } else {
      await addBookmark(story);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1 text-xs ${
        saved ? 'text-orange-500' : 'text-gray-400 hover:text-orange-400'
      }`}
    >
      {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
      {saved ? 'saved' : 'save'}
    </button>
  );
}
