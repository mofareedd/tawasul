'use client';

import type { TPost } from '@tawasul/types';
import { Card, CardContent } from '@tawasul/ui/components/card';
import Image from 'next/image';
import { PostAction } from './post-action';
import { UserHoverCard } from './user-hover-card';

interface IPostCard {
  post: TPost;
}
export function PostCard({ post }: IPostCard) {
  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="mb-6 flex justify-between">
            <UserHoverCard user={post.user} />
            <PostAction post={post} />
          </div>
          <p className="whitespace-pre-line">{post.content}</p>
        </div>
        {post.media && post.media.length > 0
          ? post.media.map((m) => (
              <div key={m.id} className="relative h-96 w-full overflow-hidden">
                <Image src={m.url} fill alt="Post Image" objectFit="cover" />
              </div>
            ))
          : null}
      </CardContent>
    </Card>
  );
}
