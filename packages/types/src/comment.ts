import type { TUser } from './user';

export type TComment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: TUser;
  postId: string;
};
