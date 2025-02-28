'use client';
import InfiniteScroll from '@/components/infinite-scroll';
import { PostCard } from '@/components/posts/post-card';
import { useInfinitePosts } from '@/hooks/use-posts';
import type { CurrentUserProps } from '@/lib/types';

interface IPostFeed extends CurrentUserProps {}
export function PostFeed({ currentUser }: IPostFeed) {
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
      className="flex flex-col space-y-4"
    >
      {posts.map((p) => (
        <PostCard key={p.id} currentUser={currentUser} post={p} asLink />
      ))}
    </InfiniteScroll>
  );
}
