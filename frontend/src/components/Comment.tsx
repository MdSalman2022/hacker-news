'use client';

import { useState } from 'react';
import { Comment as CommentType } from '@/types';
import { timeAgo } from '@/lib/utils';
import CommentTree from './CommentTree';

interface Props {
  comment: CommentType;
  depth?: number;
}

const depthColors = [
  'border-orange-300',
  'border-blue-300',
  'border-green-300',
  'border-purple-300',
  'border-pink-300',
];

export default function Comment({ comment, depth = 0 }: Props) {
  console.log('rendering comment by', comment.by, 'at depth', depth);
  const [collapsed, setCollapsed] = useState(false);
  const borderColor = depthColors[depth % depthColors.length];
  const hasReplies = comment.children.length > 0;

  return (
    <div className={`${depth > 0 ? `ml-4 pl-3 border-l-2 ${borderColor}` : ''} mt-4`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-gray-800">{comment.by}</span>
        <span className="text-xs text-gray-400">{timeAgo(comment.time)}</span>
        {hasReplies && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xs text-gray-400 hover:text-orange-500 ml-auto"
          >
            {collapsed ? `[+] ${comment.children.length} repl${comment.children.length === 1 ? 'y' : 'ies'}` : '[–]'}
          </button>
        )}
      </div>

      {!collapsed && (
        <>
          <div
            className="text-sm text-gray-700 leading-relaxed comment-body"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
          {hasReplies && (
            <CommentTree comments={comment.children} depth={depth + 1} />
          )}
        </>
      )}
    </div>
  );
}
