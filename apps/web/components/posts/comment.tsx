'use client';
import { useDeleteComment } from '@/hooks/use-posts';
import { authClient } from '@tawasul/auth/client';
import type { TComment } from '@tawasul/types';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserAvatar } from '../user/user-avatar';

interface IComment {
  comment: TComment;
}
export function Comment({ comment }: IComment) {
  const { mutateAsync, isPending } = useDeleteComment({ postId: comment.id });
  const { data } = authClient.useSession();
  const router = useRouter();
  return (
    <div className="flex space-x-4 ">
      <UserAvatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Tom_Cruise_by_Gage_Skidmore.jpg/800px-Tom_Cruise_by_Gage_Skidmore.jpg" />
      <div className="flex flex-col space-y-1 text-xs">
        <div className="flex items-center space-x-3">
          <span className="font-medium">{comment.user.name}</span>
          <span className="text-[10px] text-muted-foreground">
            {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
          </span>
        </div>

        <p>{comment.content}</p>
        <div className="flex items-center gap-8 pt-2 text-gray-500 text-xs">
          <div className="flex items-center gap-4">
            <ThumbsUp className="h-3 w-3" />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">0 Likes</span>
          </div>
          <div className="">Reply</div>
          {comment.userId === data?.user.id ? (
            <button
              type="button"
              disabled={isPending}
              className="text-destructive/80"
              onClick={() => mutateAsync().then(() => router.refresh())}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
