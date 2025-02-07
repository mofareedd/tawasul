import { db } from '@/lib/db';
import type { CreatePost } from './post.validation';

export async function getLatestPosts({
  skip,
  take,
}: { take: number; skip: number }) {
  return await db.post.findMany({
    include: {
      user: true,
      media: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: take,
    skip: skip,
  });
}

export function getPostsModel() {
  return db.post;
}
export async function getPostsCount() {
  return await db.post.count();
}
export async function getUserPosts({
  skip,
  take,
  userId,
}: { take: number; skip: number; userId: string }) {
  return await db.post.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      media: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip,
    take,
  });
}

export async function createPost({
  input,
}: { input: CreatePost['body'] & { userId: string } }) {
  return await db.post.create({
    data: {
      content: input.content,
      userId: input.userId,
    },
  });
}

// export async function getPostById({ postId }: { postId: string }) {
//   return await db.post.findFirst({
//     where: {
//       id: postId,
//     },
//     include: {
//       user: true,
//       media: true,
//     },
//   });
// }

// export async function deletePost({
//   postId,
//   userId,
// }: { postId: string; userId: string }) {
//   const user = await db.user.findFirst({
//     where: {
//       id: userId,
//     },
//   });

//   if (!user) {
//     throw new TsRestResponseError(contract.posts.create, {
//       status: 404,
//       body: {
//         message: 'Unauthorized',
//         status: 404,
//       },
//     });
//   }

//   const post = await db.post.findFirst({
//     where: {
//       id: postId,
//     },
//   });

//   if (!post) {
//     throw new TsRestResponseError(contract.posts.create, {
//       status: 404,
//       body: {
//         message: 'Post not found',
//         status: 404,
//       },
//     });
//   }

//   if (post.userId !== userId) {
//     throw new TsRestResponseError(contract.posts.create, {
//       status: 404,
//       body: {
//         message: 'Unauthorized',
//         status: 404,
//       },
//     });
//   }

//   return await db.post.delete({
//     where: {
//       id: postId,
//     },
//   });
// }
