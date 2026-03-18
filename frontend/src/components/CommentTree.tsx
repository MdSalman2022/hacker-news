import { Comment as CommentType } from '@/types';
import Comment from './Comment';

interface Props {
  comments: CommentType[];
  depth?: number;
}

export default function CommentTree({ comments, depth = 0 }: Props) {
  if (!comments.length) return null;

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} depth={depth} />
      ))}
    </div>
  );
}
