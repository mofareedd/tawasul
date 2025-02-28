'use client';
import { useCreateComment } from '@/hooks/use-posts';
import { EmojiPicker } from '@ferrucc-io/emoji-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TPost } from '@tawasul/types';
import { Button } from '@tawasul/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@tawasul/ui/components/form';
import { Input } from '@tawasul/ui/components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@tawasul/ui/components/popover';
import { type ZComments, zComments } from '@tawasul/validation';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Icons } from '../icons';
import { UserAvatar } from '../user/user-avatar';

interface ICommentForm {
  post: TPost;
}
export function CommentForm({ post }: ICommentForm) {
  const { mutateAsync, isPending } = useCreateComment({ postId: post.id });
  const textareaRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const form = useForm<ZComments>({
    resolver: zodResolver(zComments),
    defaultValues: {
      content: '',
      postId: post.id,
    },
  });
  const insertEmoji = (emoji: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;

    textarea.focus();

    const { selectionStart, selectionEnd } = textarea;
    const currentText = form.getValues('content');

    const newText =
      currentText.substring(0, selectionStart ?? 0) +
      emoji +
      currentText.substring(selectionEnd ?? selectionStart ?? 0);
    form.setValue('content', newText);
    setTimeout(() => {
      const newPosition = (selectionStart ?? 0) + emoji.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  async function onSubmit(input: ZComments) {
    if (!input.content) {
      return toast.error('Please write something or upload files');
    }
    toast.promise(mutateAsync(input), {
      loading: 'Loading...',
      success: (_data) => {
        form.reset();
        router.refresh();
        return 'Comment has been created';
      },
      error: 'Error',
    });
  }
  return (
    <div className="flex w-full space-x-2 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full items-center space-x-3"
        >
          <UserAvatar className="h-4 w-4 " />
          <div className="flex flex-1 items-center rounded-md border bg-accent pr-1">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      ref={textareaRef}
                      placeholder="Write comment..."
                      className="border-none focus:ring-0 focus-visible:ring-0"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size={'icon'}
                  className="m-0 h-6 w-8 bg-transparent p-0"
                  type="button"
                >
                  <Icons.smile />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <EmojiPicker onEmojiSelect={(emoji) => insertEmoji(emoji)}>
                  <EmojiPicker.Header>
                    <EmojiPicker.Input placeholder="Search emoji" />
                  </EmojiPicker.Header>
                  <EmojiPicker.Group>
                    <EmojiPicker.List />
                  </EmojiPicker.Group>
                </EmojiPicker>
              </PopoverContent>
            </Popover>

            <Button
              variant="ghost"
              size={'icon'}
              className="m-0 h-6 w-8 p-0"
              disabled={isPending}
              type="submit"
            >
              <Icons.send />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
