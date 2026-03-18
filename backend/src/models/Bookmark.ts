import { Schema, model, Document } from 'mongoose';

export interface IBookmark extends Document {
  hnId: number;
  title: string;
  url: string | null;
  author: string;
  points: number;
  commentCount: number;
  hnTime: number;
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmark>(
  {
    hnId: { type: Number, required: true, unique: true, index: true },
    title: { type: String, required: true },
    url: { type: String, default: null, nullable: true },
    author: { type: String, required: true },
    points: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    hnTime: { type: Number, required: true },
  },
  { timestamps: true }
);

BookmarkSchema.index({ title: 'text', author: 'text' });

export default model<IBookmark>('Bookmark', BookmarkSchema);
