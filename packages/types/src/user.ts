export type TUser = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  username: string;
  bio: string;
  country: string;
  birthday?: Date;
};
