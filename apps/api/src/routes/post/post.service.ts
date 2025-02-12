import { STATUS } from '@/lib/constant';
import { HttpException } from '@/lib/exception';
import { retrieveFileUrl, uploadFile } from '@/lib/s3';
import type { Prisma } from '@prisma/client';
import { db } from '@tawasul/db';
import type { CreatePost, PostParamsInput } from './post.validation';

export async function postsWithMediaUrls(
  posts: Prisma.PostGetPayload<{ include: { user: true; media: true } }>[]
) {
  return Promise.all(
    posts.map(async (p) => {
      if (p.media && p.media.length > 0) {
        await Promise.all(
          p.media.map(async (m) => {
            m.url = await retrieveFileUrl(m.name);
          })
        );
      }
      return p;
    })
  );
}
export async function findManyPosts({
  skip,
  take,
}: { take: number; skip: number }) {
  const posts = await db.post.findMany({
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

  const postsWithMedia = await postsWithMediaUrls(posts);
  return postsWithMedia;
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
  const posts = await db.post.findMany({
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

  for (const p of posts) {
    if (p.media.length > 0) {
      p.media.forEach(async (m) => {
        m.url = await retrieveFileUrl(m.name);
      });
    }
  }

  return posts;
}

export async function createPost({
  input,
}: {
  input: CreatePost['body'] & { userId: string };
}) {
  const newPost = await db.post.create({
    data: {
      content: input.content,
      userId: input.userId,
    },
  });

  if (!input.media || input?.media.length === 0) {
    return newPost;
  }

  await Promise.all(
    input.media.map(async (file) => {
      const newMedia = await uploadFile({
        file: file,
      });

      return db.media.create({
        data: {
          postId: newPost.id,
          name: newMedia.key,
          type: 'IMAGE',
          url: '',
        },
      });
    })
  );

  const post = await db.post.findFirst({
    where: { id: newPost.id },
    include: {
      user: true,
      media: true,
    },
  });

  if (!post?.media) {
    return post;
  }

  if (post.media && post.media.length > 0) {
    await Promise.all(
      post.media.map(async (m) => {
        m.url = await retrieveFileUrl(m.name);
      })
    );
  }

  return post;
}

export async function deletePost({
  input,
}: {
  input: PostParamsInput['params'] & { userId: string };
}) {
  const post = await db.post.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!post) {
    throw new HttpException({
      message: 'Post not found',
      statusCode: STATUS.NOT_FOUND,
    });
  }

  if (post.userId !== input.userId) {
    throw new HttpException({
      message: 'Unauthorized',
      statusCode: STATUS.UNAUTHORIZED,
    });
  }

  return await db.post.delete({
    where: {
      id: input.id,
    },
  });
}
