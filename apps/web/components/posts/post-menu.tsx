import { useDeletePost } from '@/hooks/use-posts';
import { authClient } from '@tawasul/auth/client';
import type { TPost } from '@tawasul/types';
import { Button, buttonVariants } from '@tawasul/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tawasul/ui/components/dropdown-menu';
import { Copy, Ellipsis, ExternalLink, Trash } from 'lucide-react';
import { MouseEvent } from 'react';
import { toast } from 'sonner';

interface IPostMenu {
  post: TPost;
}
export function PostMenu({ post }: IPostMenu) {
  const { mutateAsync, isPending } = useDeletePost();
  const { data } = authClient.useSession();

  async function onDelete(event:MouseEvent<HTMLDivElement>) {

    event.stopPropagation()
    toast.promise(mutateAsync({ postId: post.id }), {
      loading: 'Loading...',
      success: (_data) => {
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
          <DropdownMenuItem
            className="flex cursor-pointer items-center justify-between"
            onClick={() => {
              location.href = `/posts/${post.id}`;
            }}
          >
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
                .catch((_error) => {
                  toast.error('Failed to copy clipboard');
                });
            }}
          >
            Copy link <Copy className="h-3 w-3" />
          </DropdownMenuItem>

          {data?.user.id === post.userId ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={isPending}
                onClick={(onDelete)}
                // className="flex cursor-pointer items-center justify-between text-destructive"
                className={buttonVariants({
                  variant: 'destructive',
                  className:
                    'h-8 w-full cursor-pointer justify-between border-none px-3',
                })}
              >
                Delete <Trash className="h-3 w-3" />
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
