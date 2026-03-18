import { z } from 'zod';

export const addBookmarkSchema = z.object({
  hnId: z.number().int().positive(),
  title: z.string().min(1).max(500),
  url: z.string().url().nullable().optional(),
  author: z.string().min(1).max(100),
  points: z.number().int().min(0).default(0),
  commentCount: z.number().int().min(0).default(0),
  hnTime: z.number().int().positive(),
});

export const summarizeSchema = z.object({
  storyId: z.number().int().positive(),
});
