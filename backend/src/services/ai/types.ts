export interface SummarizeInput {
  storyTitle: string;
  comments: string[]; // flat list of cleaned comment texts
}

export interface SummarizeOutput {
  keyPoints: string[];
  sentiment: 'positive' | 'negative' | 'mixed' | 'neutral';
  summary: string;
}

export interface AiProvider {
  summarize(input: SummarizeInput): Promise<SummarizeOutput>;
}
