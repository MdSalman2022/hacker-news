import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiProvider, SummarizeInput, SummarizeOutput } from './types';
import env from '../../config/env';

const genAI = new GoogleGenerativeAI(env.geminiApiKey);

export const geminiProvider: AiProvider = {
  summarize: async (input: SummarizeInput): Promise<SummarizeOutput> => {
    const model = genAI.getGenerativeModel({ model: env.geminiModel });

    const commentsText = input.comments.join('\n\n---\n\n');
    const prompt = `You are summarizing a Hacker News discussion.

Story: "${input.storyTitle}"

Comments:
${commentsText}

Analyze this discussion and provide:
1. Key points discussed (list of 3-5 main points)
2. Overall sentiment (one of: positive, negative, mixed, neutral)
3. A brief summary (2-3 sentences)

Respond ONLY with valid JSON in this exact format, no markdown or extra text:
{
  "keyPoints": ["point1", "point2", "point3"],
  "sentiment": "mixed",
  "summary": "A brief summary of the discussion."
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const parsed = JSON.parse(text);
    return {
      keyPoints: parsed.keyPoints || [],
      sentiment: parsed.sentiment || 'neutral',
      summary: parsed.summary || '',
    };
  },
};
