import { Comment as CommentType } from '@/types';
import { timeAgo } from '@/lib/utils';
import CommentTree from './CommentTree';

interface Props {
  comment: CommentType;
  depth?: number;
}

export default function Comment({ comment, depth = 0 }: Props) {
  console.log('rendering comment by', comment.by, 'at depth', depth);

  return (
    <div className={`${depth > 0 ? 'ml-4 border-l-2 border-gray-100 pl-3' : ''} mt-3`}>
      <div className="text-xs text-gray-400 mb-1">
        <span className="font-medium text-gray-600">{comment.by}</span>
        <span className="ml-2">{timeAgo(comment.time)}</span>
      </div>
      {/* hn pre-sanitizes comment html so dangerouslySetInnerHTML is safe here */}
      <div
        className="text-sm text-gray-700 prose prose-sm max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{ __html: comment.text }}
      />
      {comment.children.length > 0 && (
        <CommentTree comments={comment.children} depth={depth + 1} />
      )}
    </div>
  );
}
