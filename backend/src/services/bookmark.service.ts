import Bookmark, { IBookmark } from '../models/Bookmark';

interface BookmarkData {
  hnId: number;
  title: string;
  url: string | null;
  author: string;
  points: number;
  commentCount: number;
  hnTime: number;
}

export async function getBookmarks(search: string, page: number, limit: number) {
  const query = search ? { $text: { $search: search } } : {};

  const [bookmarks, total] = await Promise.all([
    Bookmark.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Bookmark.countDocuments(query),
  ]);

  return { bookmarks, total, totalPages: Math.ceil(total / limit), page };
}

export async function getBookmarkedIds() {
  const bookmarks = await Bookmark.find({}, { hnId: 1 }).lean();
  return bookmarks.map((b) => b.hnId);
}

export async function addBookmark(data: BookmarkData) {
  // upsert so bookmarking twice doesn't error
  await Bookmark.updateOne({ hnId: data.hnId }, { $set: data }, { upsert: true });
  const bookmark = await Bookmark.findOne({ hnId: data.hnId }).lean();
  return bookmark;
}

export async function removeBookmark(hnId: number) {
  const result = await Bookmark.deleteOne({ hnId });
  return result.deletedCount > 0;
}
