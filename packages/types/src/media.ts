export type TMedia = {
  id: string;
  url: string;
  name: string;
  type: 'IMAGE' | 'VIDEO';
  createdAt: Date;
  postId: string;
};
