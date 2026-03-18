import { AiProvider, SummarizeInput, SummarizeOutput } from './types';

export const geminiProvider: AiProvider = {
  summarize: async (_input: SummarizeInput): Promise<SummarizeOutput> => {
    throw new Error('not implemented');
  },
};
