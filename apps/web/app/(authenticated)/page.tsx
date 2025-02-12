'use client';
import { PostFeed } from '@/components/posts/post-feed';
import { Card, CardContent } from '@tawasul/ui/components/card';
import { CreatePost } from './components/create-post';

export default function Home() {
  // const response = await api.get('posts').json();
  // console.log(response);
  return (
    <div className="flex flex-1 space-x-6">
      {/* left */}
      <div className="relative flex flex-1 flex-col space-y-4">
        <CreatePost />
        <PostFeed />
      </div>
      <div className="hidden w-80 xl:block">
        <Card>
          <CardContent>aaa</CardContent>
        </Card>
      </div>
    </div>
  );
}
