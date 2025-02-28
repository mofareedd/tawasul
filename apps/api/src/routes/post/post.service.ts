import { STATUS } from '@/lib/constant';
import { env } from '@/lib/env';
import { HttpException } from '@/lib/exception';
import { deleteFile, uploadFile } from '@/lib/s3';
import { db } from '@tawasul/db';
import type { CreatePost, PostParamsInput } from './post.validation';

type InputOptions = {
  userId: string;
};

export async function findManyPosts({
  skip,
  take,
  userId,
}: { take: number; skip: number; userId?: string }) {
  const posts = await db.post.findMany({
    include: {
      user: true,
      media: true,
      like: {
        select: {
          userId: true,
        },
      },
      bookmark: {
        select: {
          userId: true,
        },
      },
      repost: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          comment: true,
          like: true,
          bookmark: true,
          repost: true,
        },
      },
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

  return posts.map((post) => ({
    ...post,
    like: post.like.map((like) => like.userId),
    bookmark: post.bookmark.map((bookmark) => bookmark.userId),
    repost: post.repost.map((repost) => repost.userId),
  }));
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
      comment: true,
      like: true,
      bookmark: true,
      repost: true,
      _count: {
        select: {
          comment: true,
          like: true,
          bookmark: true,
          repost: true,
        },
      },
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
          url: `${env.CLOUD_FRONT_URL}/${newMedia.key}`,
        },
      });
    })
  );

  const post = await db.post.findFirst({
    where: { id: newPost.id },
    include: {
      user: true,
      media: true,
      comment: true,
      like: true,
      bookmark: true,
      repost: true,
      _count: {
        select: {
          comment: true,
          like: true,
          bookmark: true,
          repost: true,
        },
      },
    },
  });

  return post;
}

export async function findPostById(input: PostParamsInput['params']) {
  const post = await db.post.findFirst({
    where: {
      id: input.id,
    },

    include: {
      media: true,
      user: true,
      comment: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      like: {
        select: {
          userId: true,
        },
      },
      bookmark: {
        select: {
          userId: true,
        },
      },
      repost: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          comment: true,
          like: true,
          bookmark: true,
          repost: true,
        },
      },
    },
  });

  if (!post) {
    throw new HttpException({
      message: 'Post not found',
      statusCode: STATUS.NOT_FOUND,
    });
  }

  return {
    ...post,
    like: post.like.map((like) => like.userId),
    bookmark: post.bookmark.map((bookmark) => bookmark.userId),
    repost: post.repost.map((repost) => repost.userId),
  };
}

export async function deletePost(
  input: PostParamsInput['params'] & InputOptions
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

  return await db.post.delete({
    where: {
      id: input.id,
    },
  });
}

export async function likePost(
  input: PostParamsInput['params'] & InputOptions
) {
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

  const isLiked = await db.like.findFirst({
    where: {
      postId: input.id,
      userId: input.userId,
    },
  });

  if (isLiked) {
    return await db.like.delete({
      where: {
        id: isLiked.id,
      },
    });
  }

  return await db.like.create({
    data: {
      postId: post.id,
      userId: input.userId,
    },
  });
}

export async function repost(input: PostParamsInput['params'] & InputOptions) {
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

  const isReposted = await db.repost.findFirst({
    where: {
      postId: input.id,
      userId: input.userId,
    },
  });

  if (isReposted) {
    return await db.repost.delete({
      where: {
        id: isReposted.id,
      },
    });
  }

  return await db.repost.create({
    data: {
      postId: post.id,
      userId: input.userId,
    },
  });
}

export async function bookmark(
  input: PostParamsInput['params'] & InputOptions
) {
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

  const isReposted = await db.bookmark.findFirst({
    where: {
      postId: input.id,
      userId: input.userId,
    },
  });

  if (isReposted) {
    return await db.bookmark.delete({
      where: {
        id: isReposted.id,
      },
    });
  }

  return await db.bookmark.create({
    data: {
      postId: post.id,
      userId: input.userId,
    },
  });
}

export async function deleteManyPosts() {
  return await db.post.deleteMany();
}

export async function clearDB() {
  return Promise.all([await db.post.deleteMany(), await db.user.deleteMany()]);
}
