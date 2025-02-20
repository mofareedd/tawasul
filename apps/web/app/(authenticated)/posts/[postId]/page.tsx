import { CommentForm } from '@/components/posts/comment-form';
import { PostCard } from '@/components/posts/post-card';
import { kyInstance } from '@/lib/ky';
import type { TPost } from '@tawasul/types';
import { Card, CardContent } from '@tawasul/ui/components/card';
import { notFound } from 'next/navigation';

export default async function Post({
  params,
}: Readonly<{
  params: { postId: string };
}>) {
  const param = await params;
  const post = await kyInstance.get(`post/${param.postId}`).json<TPost>();

  if (!post) notFound();

  return (
    <div className="flex flex-1 space-x-6">
      <div className="relative flex flex-1 flex-col space-y-4">
        <PostCard post={post}>
          <CommentForm post={post} />
        </PostCard>
      </div>
      <div className="hidden w-80 xl:block">
        <Card>
          <CardContent>aaa</CardContent>
        </Card>
      </div>
    </div>
  );
}
