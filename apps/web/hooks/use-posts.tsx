'use client';
import { kyInstance } from '@/lib/ky';
import {
  type InfiniteData,
  type QueryFilters,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type { TApiResponse, TPost } from '@tawasul/types';
import type { ZPosts } from '@tawasul/validation';

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ['post-feed', 'for-you'],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          'post',
          pageParam ? { searchParams: { page: pageParam.toString() } } : {}
        )
        .json<TApiResponse<TPost[]>>(),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) =>
      lastPage.nextPage ? Number(lastPage.nextPage) : null,
  });
}

export function useCreatePost({ userId }: { userId?: string } = {}) {
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
        InfiniteData<TApiResponse<TPost[]>, number | null>
      > = {
        queryKey: ['post-feed', 'for-you'],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<
        InfiniteData<TApiResponse<TPost[]>, number | null>
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

export function useDeletePost({ userId }: { userId?: string } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationKey: ['post-feed'],
    mutationFn: async ({ postId }: { postId: string }) => {
      return kyInstance.delete(`post/${postId}`).json<TPost>();
    },
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters<
        InfiniteData<TApiResponse<TPost[]>, number | null>
      > = { queryKey: ['post-feed'] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<
        InfiniteData<TApiResponse<TPost[]>, number | null>
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
