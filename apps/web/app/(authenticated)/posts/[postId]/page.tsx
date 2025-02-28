import { Comment } from '@/components/posts/comment';
import { CommentForm } from '@/components/posts/comment-form';
import { PostCard } from '@/components/posts/post-card';
import { currentUser } from '@/lib/auth';
import { kyInstance } from '@/lib/ky';
import type { TPost } from '@tawasul/types';
import { Card, CardContent } from '@tawasul/ui/components/card';
import { notFound } from 'next/navigation';

const  findPostById = async (postId:string)=> await kyInstance.get(`post/${postId}`).json<TPost>()
export default async function Post({ params }: { params: Promise<{ postId: string }> }) {
  Promise<{ providerId: number }>
  const session = await currentUser();
  const post = await findPostById((await params).postId);

  if (!post) notFound();

  return (
    <div className="flex flex-1 space-x-6">
      <div className="relative flex flex-1 flex-col space-y-4">
        <PostCard post={post} currentUser={session!.user}>
          <CommentForm post={post} />
          <div className="flex w-full flex-col space-y-6 py-3">
            {post.comment.length
              ? post.comment.map((c) => <Comment key={c.id} comment={c} />)
              : null}
          </div>
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
