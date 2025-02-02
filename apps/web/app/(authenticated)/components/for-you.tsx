'use client';
import { PostCard } from '@/components/post-card';

export function ForYou() {
  // const { data, status, hasNextPage, isFetching, fetchNextPage } =
  //   useInfinitePosts();
  // const posts = data?.pages.flatMap((page) => page.body.posts) || [];

  // if (status === 'pending') {
  //   return <p>Loading....</p>;
  // }
  // if (status === 'error') {
  //   return <p>Ops! Something went wrong</p>;
  // }

  return (
    // <InfiniteScroll
    // onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    // >
    <PostCard />
    // </InfiniteScroll>
  );
}
