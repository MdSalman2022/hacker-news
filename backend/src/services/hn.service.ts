import { HnStory, HnComment } from '../types';

const HN_BASE = 'https://hacker-news.firebaseio.com/v0';

const feedMap: Record<string, string> = {
  top: 'topstories',
  new: 'newstories',
  best: 'beststories',
};

async function fetchItem(id: number): Promise<any> {
  const res = await fetch(`${HN_BASE}/item/${id}.json`);
  if (!res.ok) return null;
  return res.json();
}

async function fetchStoryIds(type: string): Promise<number[]> {
  const feed = feedMap[type] || 'topstories';
  const res = await fetch(`${HN_BASE}/${feed}.json`);
  if (!res.ok) return [];
  return res.json() as Promise<number[]>;
}

// fetch comments recursively, limit depth to avoid huge payloads
async function fetchComments(ids: number[], depth = 0): Promise<HnComment[]> {
  if (depth >= 2 || !ids?.length) return [];

  // cap comments per level to avoid too many requests
  const limited = ids.slice(0, depth === 0 ? 50 : 20);
  const items = await Promise.all(limited.map(fetchItem));
  const comments: HnComment[] = [];

  for (const item of items) {
    if (!item || item.deleted || item.dead || !item.by) continue;

    const children = item.kids?.length
      ? await fetchComments(item.kids, depth + 1)
      : [];

    comments.push({
      id: item.id,
      by: item.by,
      text: item.text || '',
      time: item.time,
      children,
    });
  }

  return comments;
}

export async function getStoriesByPage(type: string, page: number, limit: number) {
  const allIds = await fetchStoryIds(type);
  const total = allIds.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const pageIds = allIds.slice(start, start + limit);

  const items = await Promise.all(pageIds.map(fetchItem));

  const stories: HnStory[] = items
    .filter(Boolean)
    .map((s) => ({
      id: s.id,
      title: s.title,
      url: s.url || null,
      by: s.by,
      score: s.score || 0,
      descendants: s.descendants || 0,
      time: s.time,
      type: s.type,
    }));

  return { stories, total, totalPages, page };
}

export async function getStoryWithComments(id: number) {
  const item = await fetchItem(id);
  if (!item) return null;

  const story: HnStory = {
    id: item.id,
    title: item.title,
    url: item.url || null,
    by: item.by,
    score: item.score || 0,
    descendants: item.descendants || 0,
    time: item.time,
    type: item.type,
  };

  const comments = item.kids?.length ? await fetchComments(item.kids) : [];

  return { story, comments };
}
