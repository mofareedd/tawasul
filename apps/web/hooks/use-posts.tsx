'use client';
import { kyInstance } from '@/lib/ky';
import type { LikeState } from '@/lib/types';
import {
  type InfiniteData,
  type QueryFilters,
  type QueryKey,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type { TApiPaginationResponse, TPost } from '@tawasul/types';
import type { ZComments, ZPosts } from '@tawasul/validation';
import { useOptimistic, useState, } from 'react';

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ['post-feed', 'for-you'],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          'post',
          pageParam ? { searchParams: { page: pageParam.toString() } } : {}
        )
        .json<TApiPaginationResponse<TPost[]>>(),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) =>
      lastPage.nextPage ? Number(lastPage.nextPage) : null,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['posts'],
    mutationFn: async ({ input }: { input: ZPosts }) => {
      const formData = new FormData();
      formData.append('content', input.content);
      if (input.media && input.media.length > 0) {
        input.media.forEach((file) => {
          formData.append('media', file);
        });
      }
      return await kyInstance.post('post', { body: formData }).json<TPost>();
    },
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters<
        InfiniteData<TApiPaginationResponse<TPost[]>, number | null>
      > = {
        queryKey: ['post-feed', 'for-you'],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<
        InfiniteData<TApiPaginationResponse<TPost[]>, number | null>
      >(queryFilter, (oldData) => {
        const firstPage = oldData?.pages[0];
        if (firstPage) {
          return {
            pageParams: oldData.pageParams,
            pages: [
              {
                ...firstPage,
                data: [newPost, ...firstPage.data],
                nextPage: firstPage.nextPage,
              },
              ...oldData.pages.slice(1),
            ],
          };
        }
      });

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationKey: ['post-feed'],
    mutationFn: async ({ postId }: { postId: string }) => {
      return kyInstance.delete(`post/${postId}`).json<TPost>();
    },
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters<
        InfiniteData<TApiPaginationResponse<TPost[]>, number | null>
      > = { queryKey: ['post-feed'] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<
        InfiniteData<TApiPaginationResponse<TPost[]>, number | null>
      >(queryFilter, (oldData) => {
        if (!oldData) return;

        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: page.data.filter((p) => p.id !== deletedPost.id),
          })),
        };
      });
    },
  });
}

export function useCreateComment({ postId }: { postId: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ZComments) => {
      return await kyInstance.post('comment', { json: input }).json();
    },
    onSuccess: async () => {
      const queryKey: QueryKey = ['comments', postId];
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
}

export function useDeleteComment({ postId }: { postId: string }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await kyInstance.delete(`comment/${postId}`).json();
    },
    onSuccess: async () => {
      const queryKey: QueryKey = ['comments', postId];
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
}




interface PostActionToggle {
  post: TPost
  userId: string
}
export function usePostLikeToggle({ post, userId }: PostActionToggle) {
  const [likeState, setLikeState] = useState<LikeState>({
    likeCount: post._count.like,
    isLiked: userId ? post.like.includes(userId) : false,
  });
  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, _value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );
  const mutate = useMutation({
    mutationFn: async () => {

      return kyInstance.get(`post/${post.id}/like`).json();
    },
  });

  function likeHandler() {
    switchOptimisticLike("")
    try {
      mutate.mutate()
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (_e) {

    }
  }

  return { optimisticLike, switchOptimisticLike, likeMutate: mutate, likeHandler }
}


export function useRepostToggle({ post, userId }: PostActionToggle) {
  const [repostState, setRepostState] = useState<{
    repostCount: number;
    isReposted: boolean;
  }>({
    repostCount: post._count.repost,
    isReposted: userId ? post.repost.includes(userId) : false,
  });
  const [optimisticRepost, switchOptimisticRepost] = useOptimistic(
    repostState,
    (state, _value) => {
      return {
        repostCount: state.isReposted ? state.repostCount - 1 : state.repostCount + 1,
        isReposted: !state.isReposted,
      };
    }
  );
  const mutate = useMutation({
    mutationFn: async () => {

      return kyInstance.get(`post/${post.id}/repost`).json();
    },
  });

  function repostHandler() {
    switchOptimisticRepost("")
    try {
      mutate.mutate()
      setRepostState((state) => ({
        repostCount: state.isReposted ? state.repostCount - 1 : state.repostCount + 1,
        isReposted: !state.isReposted,
      }));
    } catch (_e) {

    }
  }

  return { optimisticRepost, switchOptimisticRepost, repostMutate: mutate, repostHandler }
}

export function useBookmarToggle({ post, userId }: PostActionToggle) {
  const [bookmarState, setBookmarkState] = useState<{
    bookmarkCount: number;
    isBookmarked: boolean;
  }>({
    bookmarkCount: post._count.bookmark,
    isBookmarked: userId ? post.bookmark.includes(userId) : false,
  });
  const [optimisticBoomark, switchOptimisticBoomark] = useOptimistic(
    bookmarState,
    (state, _value) => {
      return {
        bookmarkCount: state.isBookmarked ? state.bookmarkCount - 1 : state.bookmarkCount + 1,
        isBookmarked: !state.isBookmarked,
      };
    }
  );
  const mutate = useMutation({
    mutationFn: async () => {

      return kyInstance.get(`post/${post.id}/bookmark`).json();
    },
  });

  function bookmarkHandler() {
    switchOptimisticBoomark("")
    try {
      mutate.mutate()
      setBookmarkState((state) => ({
        bookmarkCount: state.isBookmarked ? state.bookmarkCount - 1 : state.bookmarkCount + 1,
        isBookmarked: !state.isBookmarked,
      }));
    } catch (_e) {

    }
  }

  return { optimisticBoomark, switchOptimisticBoomark, repostMutate: mutate, bookmarkHandler }
}