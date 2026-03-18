import { Story } from '@/types';
import StoryCard from './StoryCard';

interface Props {
  stories: Story[];
  startIndex?: number;
  getActions?: (story: Story) => React.ReactNode;
}

export default function StoryList({ stories, startIndex = 1, getActions }: Props) {
  if (!stories.length) {
    return <p className="text-gray-400 text-sm py-8 text-center">no stories found</p>;
  }

  console.log('rendering stories:', stories.length);

  return (
    <div>
      {stories.map((story, i) => (
        <StoryCard
          key={story.id}
          story={story}
          index={startIndex + i}
          actions={getActions?.(story)}
        />
      ))}
    </div>
  );
}
