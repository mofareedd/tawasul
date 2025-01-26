'use client';
import { tsr } from '@tawasul/query';

const PAGE_SIZE = 10;
export function useInfinitePosts() {
  return tsr.posts.getAll.useInfiniteQuery({
    queryKey: ['posts'],
    queryData: ({ pageParam }) => ({
      query: {
        skip: pageParam.skip,
        take: pageParam.take,
      },
    }),
    initialPageParam: { skip: 0, take: PAGE_SIZE },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.body.posts.length >= PAGE_SIZE
        ? { take: PAGE_SIZE, skip: allPages.length * PAGE_SIZE }
        : undefined;
    },
  });
}
