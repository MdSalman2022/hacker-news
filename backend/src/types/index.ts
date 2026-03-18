// shared types used across the backend

export interface HnStory {
  id: number;
  title: string;
  url: string | null;
  by: string;
  score: number;
  descendants: number;
  time: number;
  type: string;
}

export interface HnComment {
  id: number;
  by: string;
  text: string;
  time: number;
  kids?: number[];
  deleted?: boolean;
  dead?: boolean;
  children: HnComment[];
}

export interface AiSummary {
  keyPoints: string[];
  sentiment: 'positive' | 'negative' | 'mixed' | 'neutral';
  summary: string;
}
