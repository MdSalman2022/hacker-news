import Link from 'next/link';
import { Story } from '@/types';
import { timeAgo, getDomain } from '@/lib/utils';

interface Props {
  story: Story;
  index?: number;
  actions?: React.ReactNode;
}

export default function StoryCard({ story, index, actions }: Props) {
  const domain = story.url ? getDomain(story.url) : null;

  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-2">
        {index != null && (
          <span className="text-gray-400 text-sm w-5 flex-shrink-0 text-right mt-0.5">{index}.</span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <a
              href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-orange-500 text-sm font-medium leading-snug"
            >
              {story.title}
            </a>
            {domain && (
              <span className="text-gray-400 text-xs mt-0.5 flex-shrink-0">({domain})</span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
            <span>{story.score} pts</span>
            <span>by {story.by}</span>
            <span>{timeAgo(story.time)}</span>
            <Link href={`/story/${story.id}`} className="hover:text-orange-500">
              {story.descendants} comments
            </Link>
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
}
