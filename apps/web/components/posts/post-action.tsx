import { useDeletePost } from '@/hooks/use-posts';
import type { TPost } from '@tawasul/types';
import { Button } from '@tawasul/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tawasul/ui/components/dropdown-menu';
import { Copy, Ellipsis, ExternalLink, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface IPostAction {
  post: TPost;
}
export function PostAction({ post }: IPostAction) {
  const { mutateAsync, isPending } = useDeletePost();

  async function onDelete() {
    toast.promise(mutateAsync({ postId: post.id }), {
      loading: 'Loading...',
      success: (data) => {
        return 'Post has been deleted';
      },
      error: 'Error',
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={'icon'}
          className="m-0 h-6 w-8 bg-transparent p-0"
          type="button"
        >
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex cursor-pointer items-center justify-between">
            Visit user <ExternalLink className="h-3 w-3" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center justify-between"
            onClick={() => {
              navigator.clipboard
                .writeText(`http://localhost:3000/posts/${post.id}`)
                .then(() => {
                  toast.success('Link copied to clipboard');
                })
                .catch((error) => {
                  toast.error('Failed to copy clipboard');
                  console.error('Failed to copy link: ', error);
                });
            }}
          >
            Copy link <Copy className="h-3 w-3" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isPending}
            onClick={onDelete}
            className="flex cursor-pointer items-center justify-between text-destructive"
          >
            Delete <Trash className="h-3 w-3" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
