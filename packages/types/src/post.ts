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
};
