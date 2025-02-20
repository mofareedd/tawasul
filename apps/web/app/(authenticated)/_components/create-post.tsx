'use client';

import { FileUploader } from '@/components/file-uploader';
import { UserAvatar } from '@/components/user/user-avatar';
import { useCreatePost } from '@/hooks/use-posts';
import { EmojiPicker } from '@ferrucc-io/emoji-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type AutosizeTextAreaRef,
  AutosizeTextarea,
} from '@tawasul/ui/components/autosize-textarea';
import { Button } from '@tawasul/ui/components/button';
import { Card, CardContent } from '@tawasul/ui/components/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@tawasul/ui/components/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@tawasul/ui/components/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@tawasul/ui/components/popover';
import { type ZPosts, zPosts } from '@tawasul/validation';
import { SendHorizonal, Smile } from 'lucide-react';
import { Paperclip } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function CreatePost() {
  const textareaRef = useRef<AutosizeTextAreaRef | null>(null);

  const { mutateAsync, isPending } = useCreatePost();
  const form = useForm<ZPosts>({
    resolver: zodResolver(zPosts),
    defaultValues: {
      content: '',
      media: [],
    },
  });
  const insertEmoji = (emoji: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current.textArea;
    textarea.focus();
    const { selectionStart, selectionEnd } = textarea;
    const currentText = form.getValues('content');

    // Insert emoji at cursor position
    const newText =
      currentText.substring(0, selectionStart) +
      emoji +
      currentText.substring(selectionEnd);

    // Update the form field
    form.setValue('content', newText);

    // Move cursor after emoji
    setTimeout(() => {
      textarea.setSelectionRange(
        selectionStart + emoji.length,
        selectionStart + emoji.length
      );
      textarea.focus();
    }, 0);
  };

  async function onSubmit(input: ZPosts) {
    if (!input.content && input.media?.length === 0) {
      return toast.error('Please write something or upload files');
    }
    toast.promise(mutateAsync({ input }), {
      loading: 'Loading...',
      success: (_data) => {
        form.reset();
        return 'Post has been created';
      },
      error: 'Error',
    });
  }

  return (
    <Card className="">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="flex space-x-2">
              <UserAvatar />
              <div className="flex flex-1 items-start">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <AutosizeTextarea
                          {...field}
                          ref={textareaRef}
                          minHeight={40}
                          placeholder="Share Something"
                          disabled={isPending}
                          className="resize-none border-0 focus-visible:ring-0 dark:border-muted-foreground dark:bg-accent/40"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size={'icon'}
                        className="m-0 h-6 w-8 bg-transparent p-0"
                        type="button"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <EmojiPicker
                        onEmojiSelect={(emoji) => insertEmoji(emoji)}
                      >
                        <EmojiPicker.Header>
                          <EmojiPicker.Input placeholder="Search emoji" />
                        </EmojiPicker.Header>
                        <EmojiPicker.Group>
                          <EmojiPicker.List />
                        </EmojiPicker.Group>
                      </EmojiPicker>
                    </PopoverContent>
                  </Popover>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size={'icon'}
                        className="relative m-0 h-6 w-8 bg-transparent p-0"
                      >
                        <Paperclip className="h-4 w-4" />
                        {form.getValues('media')!.length > 0 ? (
                          <div className="-right-1 -top-1 absolute flex h-3 w-3 items-center justify-center rounded-full bg-red-400 text-white text-xs">
                            {form.getValues('media')!.length}
                          </div>
                        ) : null}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                      <DialogHeader>
                        <DialogTitle>Upload files</DialogTitle>
                        <DialogDescription>
                          Drag and drop your files here or click to browse.
                        </DialogDescription>
                      </DialogHeader>
                      <FormField
                        control={form.control}
                        name="media"
                        render={({ field }) => (
                          <div className="space-y-6">
                            <FormItem className="w-full">
                              <FormControl>
                                <FileUploader
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  maxFileCount={4}
                                  maxSize={4 * 1024 * 1024}
                                  // pass the onUpload function here for direct upload
                                  // onUpload={uploadFiles}
                                  disabled={isPending}
                                />
                              </FormControl>
                            </FormItem>
                          </div>
                        )}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Button
                variant="default"
                size={'icon'}
                className="m-0 h-6 w-8 p-0"
                disabled={isPending}
                type="submit"
              >
                <SendHorizonal />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
