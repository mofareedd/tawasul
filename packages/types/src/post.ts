import type { TComment } from './comment';
import type { TMedia } from './media';
import type { TUser } from './user';

export type TPost = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: TUser;
  media: TMedia[];
  comment: TComment[];
  like: string[];
  bookmark: string[];
  repost: string[];
  _count: PostCount;
};

export interface PostCount {
  comment: number;
  like: number;
  bookmark: number;
  repost: number;
}

export type LikeInfo = {
  likes: number;
  isLikedByUser: boolean;
};
