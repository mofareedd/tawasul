import { getSession } from '@/lib/auth';
import { contract, initServer } from '@tawasul/contract';
import { createPost, deletePost, getPostById, getUserPosts } from './service';

const s = initServer();

export const postRouter = s.router(contract.posts, {
  getAll: {
    handler: async ({ headers, query }) => {
      const { take, skip } = query;
      const session = await getSession(headers);
      const posts = await getUserPosts({
        userId: session?.user.id ?? '',
        skip,
        take,
      });

      return { body: { posts: posts }, status: 200 };
    },
  },

  create: {
    handler: async ({ body }) => {
      const newPost = await createPost({
        input: {
          ...body,
          userId: 'f8ec572b-d293-4ba7-80bc-4ddbbc82d032',
        },
      });
      return {
        status: 201,
        body: newPost,
      };
    },
  },
  getById: {
    handler: async ({ params }) => {
      const { id } = params;
      const post = await getPostById({ postId: id });

      if (!post) {
        return {
          status: 404,
          body: {
            message: 'Post not found',
            status: 404,
          },
        };
      }

      return { status: 200, body: post };
    },
  },

  remove: {
    handler: async ({ params }) => {
      const { id } = params;
      await deletePost({ postId: id, userId: '' });

      return { status: 200, body: { message: 'Post deleted' } };
    },
  },
});
