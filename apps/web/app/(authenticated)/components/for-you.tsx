'use client';
import InfiniteScroll from '@/components/infinite-scroll';
import { PostCard } from '@/components/post-card';
import { useInfinitePosts } from '@/hooks/use-posts';

export function ForYou() {
  const { data, status, hasNextPage, isFetching, fetchNextPage } =
    useInfinitePosts();
  const posts = data?.pages.flatMap((page) => page.body.posts) || [];

  if (status === 'pending') {
    return <p>Loading....</p>;
  }
  if (status === 'error') {
    return <p>Ops! Something went wrong</p>;
  }

  return (
    <InfiniteScroll
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <PostCard key={post.id} />
      ))}
    </InfiniteScroll>
  );
}
