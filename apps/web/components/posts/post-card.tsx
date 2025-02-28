'use client';

import type { CurrentUserProps } from '@/lib/types';
import type { TPost } from '@tawasul/types';
import { Card, CardContent, CardFooter } from '@tawasul/ui/components/card';
import { cn } from '@tawasul/ui/lib/utils';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';
import type { ReactNode } from 'react';
import { PostAction } from './post-action';
import { PostMenu } from './post-menu';
import { UserHoverCard } from './user-hover-card';

interface IPostCard extends CurrentUserProps {
  post: TPost;
  asLink?: boolean;
  children?: ReactNode;
}
export function PostCard({
  currentUser,
  post,
  asLink = false,
  children,
}: IPostCard) {
  const router = useRouter();
  return (
    <Card
      className={cn('overflow-hidden p-0', asLink ? 'cursor-pointer' : '')}
      onClick={() => {
        if (asLink) router.push(`/posts/${post.id}`);
      }}
    >
      <CardContent className="p-0">
        <div className="p-6">
          <div className="mb-6 flex justify-between">
            <UserHoverCard user={post.user} />
            <PostMenu post={post} />
          </div>

          <p className="whitespace-pre-line">{post.content}</p>
        </div>
        {post.media && post.media.length > 0
          ? post.media.map((m) => (
              <div key={m.id} className="relative h-96 w-full overflow-hidden">
                <Image src={m.url} fill alt="Post Image" className='object-cover' />
              </div>
            ))
          : null}
      </CardContent>
      <CardFooter className="flex-col p-6">
        <PostAction post={post} currentUser={currentUser} />
        {children}
      </CardFooter>
    </Card>
  );
}
