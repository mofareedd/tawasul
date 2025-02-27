import { PostFeed } from '@/components/posts/post-feed';
import { currentUser } from '@/lib/auth';
import { Card, CardContent } from '@tawasul/ui/components/card';
import { CreatePost } from './_components/create-post';

export default async function Home() {
  const session = await currentUser();
  return (
    <div className="flex min-h-screen flex-1 space-x-6">
      <div className="relative flex flex-1 flex-col space-y-4">
        <CreatePost />
        <PostFeed currentUser={session!.user} />
      </div>
      <div className="hidden w-96 xl:block">
        <Card>
          <CardContent>aaa</CardContent>
        </Card>
      </div>
    </div>
  );
}
