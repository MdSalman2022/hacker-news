export interface Story {
  id: number;
  title: string;
  url: string | null;
  by: string;
  score: number;
  descendants: number;
  time: number;
  type: string;
}

export interface Comment {
  id: number;
  by: string;
  text: string;
  time: number;
  children: Comment[];
}

export interface StoriesResponse {
  stories: Story[];
  total: number;
  totalPages: number;
  page: number;
}

export interface StoryResponse {
  story: Story;
  comments: Comment[];
}

export interface SummaryResult {
  keyPoints: string[];
  sentiment: 'positive' | 'negative' | 'mixed' | 'neutral';
  summary: string;
}

export interface Bookmark extends Story {
  _id: string;
  hnId: number;
  points: number;
  commentCount: number;
  hnTime: number;
  createdAt: string;
}
