'use client';
import { useBookmarToggle, usePostLikeToggle, useRepostToggle } from '@/hooks/use-posts';
import type { Session } from '@/lib/types';
import type { TPost } from '@tawasul/types';
import { Button } from '@tawasul/ui/components/button';
import { cn } from '@tawasul/ui/lib/utils';
import { Bookmark, Heart, MessageCircle, Repeat2 } from 'lucide-react';
import { useTransition } from 'react';

interface IPostMenu {
  post: TPost;
  currentUser: Session['user'];
}
export function PostAction({ post, currentUser }: IPostMenu) {
  const [_, startTransition] = useTransition();

  const { optimisticLike, likeHandler } = usePostLikeToggle({ post: post, userId: currentUser.id });
  const { optimisticRepost, repostHandler } = useRepostToggle({ post: post, userId: currentUser.id });
  const { optimisticBoomark, bookmarkHandler } = useBookmarToggle({ post: post, userId: currentUser.id });


  return (
    <div className="flex w-full items-center justify-between pr-20">
      <Button
        variant="outline"
        size={'icon'}
        className="relative m-0 h-6 w-8 bg-transparent p-0"
        type="button"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="-top-2 -right-3 absolute z-10 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-accent text-[10px]">
          {post._count.comment}
        </span>
      </Button>
      <Button
        variant="outline"
        size={'icon'}
        className="relative m-0 h-6 w-8 bg-transparent p-0"
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          startTransition(() => repostHandler())
        }}
      >
        <Repeat2
          className={cn(
            'h-4 w-4',
            optimisticRepost.isReposted ? ' text-primary' : ''
          )}
        />
        <span className="-top-2 -right-3 absolute z-10 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-accent text-[10px]">
          {optimisticRepost.repostCount}
        </span>
      </Button>
      <Button
        variant="outline"
        size={'icon'}
        className="relative m-0 h-6 w-8 bg-transparent p-0"
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          startTransition(() => likeHandler())
        }}
      >
        <Heart
          className={cn(
            'h-4 w-4',
            optimisticLike.isLiked ? 'fill-red-500 text-red-500' : ''
          )}
        />
        <span className="-top-2 -right-3 absolute z-10 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-accent text-[10px]">
          {optimisticLike.likeCount}
        </span>
      </Button>
      <Button
        variant="outline"
        size={'icon'}
        className="relative m-0 h-6 w-8 bg-transparent p-0"
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          startTransition(() => bookmarkHandler())
        }}
      >
        <Bookmark className={cn(
          'h-4 w-4',
          optimisticBoomark.isBookmarked ? ' fill-yellow-400 text-yellow-400' : ''
        )} />
        <span className="-top-2 -right-3 absolute z-10 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-accent text-[10px]">
          {optimisticBoomark.bookmarkCount}
        </span>
      </Button>
    </div>
  );
}
