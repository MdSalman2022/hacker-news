import { Request, Response, NextFunction } from 'express';
import { getStoryWithComments } from '../services/hn.service';
import { aiProvider } from '../services/ai';

function flattenComments(comments: any[]): string[] {
  const texts: string[] = [];
  for (const comment of comments) {
    if (comment.text) texts.push(comment.text);
    if (comment.children) texts.push(...flattenComments(comment.children));
  }
  return texts;
}

export const summarizeStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { storyId } = req.body;

    if (!storyId) {
      res.status(400).json({ error: 'missing storyId' });
      return;
    }

    const story = await getStoryWithComments(storyId);
    if (!story || !story.comments || story.comments.length === 0) {
      res.status(400).json({ error: 'no comments found for this story' });
      return;
    }

    const commentTexts = flattenComments(story.comments);
    if (commentTexts.length === 0) {
      res.status(400).json({ error: 'no comment text to summarize' });
      return;
    }

    const result = await aiProvider.summarize({
      storyTitle: story.story.title,
      comments: commentTexts,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};
