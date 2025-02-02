'use client';
import { api } from '@/lib/api';
import type { CreatePostInput } from '@/lib/validation';
import { useMutation } from '@tanstack/react-query';

const PAGE_SIZE = 10;
export function useInfinitePosts() {
  // return useInfiniteQuery({
  //   queryKey: ['posts'],
  //   // queryData: ({ pageParam }) => ({
  //   //   query: {
  //   //     skip: pageParam.skip,
  //   //     take: pageParam.take,
  //   //   },
  //   // }),
  //   initialPageParam: { skip: 0, take: PAGE_SIZE },
  //   getNextPageParam: (lastPage, allPages) => {
  //     return lastPage.body.posts.length >= PAGE_SIZE
  //       ? { take: PAGE_SIZE, skip: allPages.length * PAGE_SIZE }
  //       : undefined;
  //   },
  // });
}

export function useCreatePost() {
  return useMutation({
    mutationKey: ['posts'],
    mutationFn: async ({ input }: { input: CreatePostInput }) => {
      return await api.post('test', { body: JSON.stringify(input) }).json();
      // try {
      //   const res = await fetch('http://localhost:1337/api/test', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json', // Ensure the request is recognized as JSON
      //     },
      //     credentials: 'include',
      //     body: JSON.stringify(input),
      //   });
      //   const data = await res.json();

      //   return data;
      // } catch (error) {
      //   throw new Error('Something went wrong');
      // }
    },
  });
}
