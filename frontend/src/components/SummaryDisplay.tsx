'use client';

import { Sparkles, X } from 'lucide-react';

interface Props {
  keyPoints: string[];
  sentiment: 'positive' | 'negative' | 'mixed' | 'neutral';
  summary: string;
  onClose: () => void;
}

const sentimentColors = {
  positive: 'bg-green-50 border-green-200',
  negative: 'bg-red-50 border-red-200',
  mixed: 'bg-yellow-50 border-yellow-200',
  neutral: 'bg-gray-50 border-gray-200',
};

const sentimentBadges = {
  positive: 'bg-green-100 text-green-700',
  negative: 'bg-red-100 text-red-700',
  mixed: 'bg-yellow-100 text-yellow-700',
  neutral: 'bg-gray-100 text-gray-700',
};

export default function SummaryDisplay({ keyPoints, sentiment, summary, onClose }: Props) {
  return (
    <div className={`border rounded p-4 mb-6 ${sentimentColors[sentiment]}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-orange-500" />
          <span className="text-sm font-medium">AI Summary</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={16} />
        </button>
      </div>

      <div className="mb-3">
        <span className={`text-xs px-2 py-1 rounded ${sentimentBadges[sentiment]}`}>
          {sentiment}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-3">{summary}</p>

      {keyPoints.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-600 mb-2">Key points:</h4>
          <ul className="text-xs text-gray-700 space-y-1 ml-3">
            {keyPoints.map((point, i) => (
              <li key={i} className="list-disc">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
