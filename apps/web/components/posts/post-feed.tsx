'use client';
import InfiniteScroll from '@/components/infinite-scroll';
import { PostCard } from '@/components/posts/post-card';
import { useInfinitePosts } from '@/hooks/use-posts';

export function PostFeed() {
  const { data, hasNextPage, isFetching, fetchNextPage, status } =
    useInfinitePosts();
  const posts = data?.pages.flatMap((page) => page.data) || [];

  if (status === 'pending') {
    return <p>Loading....</p>;
  }
  if (status === 'error') {
    return <p>Ops! Something went wrong</p>;
  }

  return (
    <InfiniteScroll
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      className="space-y-4"
    >
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </InfiniteScroll>
  );
}
