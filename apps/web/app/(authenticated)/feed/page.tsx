import { Card, CardContent } from '@tawasul/ui/components/card';
import { CreatePost } from '../components/create-post';

export default async function FeedPage() {
  return (
    <div className="flex h-screen flex-1 space-x-6 overflow-hidden">
      {/* left */}
      <div className="relative flex flex-1 flex-col space-y-4">
        <CreatePost />
        <Card>
          <CardContent>aaa</CardContent>
        </Card>

        {/* <div className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 bottom-20 left-1/2 w-full max-w-xl transform"> */}
      </div>
      <div className="hidden w-80 xl:block">
        <Card>
          <CardContent>aaa</CardContent>
        </Card>
      </div>
    </div>
  );
}
