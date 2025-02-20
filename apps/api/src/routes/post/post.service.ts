import { STATUS } from '@/lib/constant';
import { env } from '@/lib/env';
import { HttpException } from '@/lib/exception';
import { postDetailsKeyById } from '@/lib/kv';
import { deleteFile, uploadFile } from '@/lib/s3';
import type { Prisma } from '@prisma/client';
import { db } from '@tawasul/db';
import { redis } from '@tawasul/redis';
import type { CreatePost, PostParamsInput } from './post.validation';

export function postsWithMediaUrls(
  posts: Prisma.PostGetPayload<{ include: { user: true; media: true } }>[]
) {
  return posts.map((p) => {
    if (p.media && p.media.length > 0) {
      p.media.map((m) => {
        m.url = `${env.CLOUD_FRONT_URL}/${m.name}`;
      });
    }

    return p;
  });
}
export async function findManyPosts({
  skip,
  take,
  userId,
}: { take: number; skip: number; userId?: string }) {
  const posts = await db.post.findMany({
    include: {
      user: true,
      media: true,
      comment: true,
    },
    where: {
      ...(userId ? { userId } : {}),
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: take,
    skip: skip,
  });

  const postsWithMedia = postsWithMediaUrls(posts);

  return postsWithMedia;
}

export function getPostsModel() {
  return db.post;
}

export async function getPostsCount() {
  return await db.post.count();
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
    include: {
      user: true,
      media: true,
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

  if (post?.media && post.media.length > 0) {
    for (const media of post.media) {
      media.url = `${env.CLOUD_FRONT_URL}/${media.name}`;
    }
  }

  return post;
}

export async function findPostById(input: PostParamsInput['params']) {
  const cachedValue = await redis.get(postDetailsKeyById(input.id));
  if (cachedValue) {
    return cachedValue;
  }

  const post = await db.post.findFirst({
    where: {
      id: input.id,
    },
    include: {
      media: true,
      user: true,
    },
  });

  if (!post) {
    throw new HttpException({
      message: 'Post not found',
      statusCode: STATUS.NOT_FOUND,
    });
  }

  if (post.media && post?.media.length > 0) {
    for (const media of post.media) {
      media.url = `${env.CLOUD_FRONT_URL}/${media.name}`;
    }
  }

  await redis.set(postDetailsKeyById(input.id), JSON.stringify(post));

  return post;
}

export async function deletePost(
  input: PostParamsInput['params'] & { userId: string }
) {
  const post = await db.post.findFirst({
    where: {
      id: input.id,
    },
    include: {
      media: true,
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

  if (post.media && post?.media.length > 0) {
    await Promise.all(post.media.map((m) => deleteFile(m.name)));
  }

  await redis.del(postDetailsKeyById(post.id));

  return await db.post.delete({
    where: {
      id: input.id,
    },
  });
}
