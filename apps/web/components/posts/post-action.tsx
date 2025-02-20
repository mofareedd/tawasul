import type { TPost } from '@tawasul/types';
import { Button } from '@tawasul/ui/components/button';
import { Bookmark, Heart, MessageCircle, Repeat2 } from 'lucide-react';

interface IPostMenu {
  post: TPost;
}
export function PostAction({ post }: IPostMenu) {
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
          10
        </span>
        {/* <span className="text-xs">8</span> */}
      </Button>
      <Button
        variant="outline"
        size={'icon'}
        className="relative m-0 h-6 w-8 bg-transparent p-0"
        type="button"
      >
        <Repeat2 className="h-4 w-4" />
        <span className="-top-2 -right-3 absolute z-10 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-accent text-[10px]">
          10
        </span>
      </Button>
      <Button
        variant="outline"
        size={'icon'}
        className="relative m-0 h-6 w-8 bg-transparent p-0"
        type="button"
      >
        <Heart className="h-4 w-4" />
        <span className="-top-2 -right-3 absolute z-10 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-accent text-[10px]">
          10
        </span>
      </Button>
      <Button
        variant="outline"
        size={'icon'}
        className="relative m-0 h-6 w-8 bg-transparent p-0"
        type="button"
      >
        <Bookmark className="h-4 w-4" />
        <span className="-top-2 -right-3 absolute z-10 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-accent text-[10px]">
          10
        </span>
      </Button>
    </div>
  );
}
