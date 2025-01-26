'use client';

import { FileUploader } from '@/components/file-uploader';
import { UserAvatar } from '@/components/user-avatar';
import { useCreatePost } from '@/hooks/use-create-post';
import { useMediaUpload, useUploadFile } from '@/hooks/use-upload-file';
import { getErrorMessage } from '@/lib/error-handler';
import { type CreatePostInput, createPostInput } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Separator } from '@tawasul/ui/components/separator';
import { Textarea } from '@tawasul/ui/components/textarea';
import { Paperclip } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function CreatePost() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [loading, setLoading] = useState(false);

  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    'imageUploader',
    { defaultUploadedFiles: [] }
  );

  const {startUpload,files} = useMediaUpload()
  const { mutateAsync } = useCreatePost();
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostInput),
    defaultValues: {
      content: '',
      images: [],
    },
  });

  function onSubmit(input: CreatePostInput) {
    const toastConfig = {
      loading: 'Creating post...',
      success: () => {
        form.reset();
        setLoading(true);

        return 'Post created!';
      },
      error: (err: unknown) => {
        setLoading(false);
        return getErrorMessage(err);
      },
    };
    setLoading(true);
    if (input.images) {
      toast.promise(
        () =>
          onUpload(input.images).then(
            async () =>
              await mutateAsync({
                body: {
                  content: input.content,
                  media:
                    uploadedFiles.length > 0
                      ? uploadedFiles.map((f) => ({
                          customId: f.customId ?? f.key,
                          url: f.url,
                          key: f.key,
                          type: f.type,
                        }))
                      : [],
                },
              })
          ),
        toastConfig
      );

      return;
    }

    toast.promise(
      async () => await mutateAsync({ body: { content: input.content } }),
      toastConfig
    );
  }

  const autoResize = () => {
    const { current } = textareaRef;
    if (!current) {
      return;
    }
    current.style.height = 'auto';
    current.style.height = `${current.scrollHeight}px`;
  };

  useEffect(() => {
    const { current } = textareaRef;
    if (!current) {
      return;
    }
    current.addEventListener('input', autoResize);
    autoResize();

    return () => {
      current.removeEventListener('input', autoResize);
    };
  }, [textareaRef]);

  return (
    <Card className="">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="flex space-x-2">
              <UserAvatar />
              <div className="flex flex-1 flex-col">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Textarea
                          disabled={loading}
                          className="max-h-[300px] resize-none overflow-hidden overflow-y-auto border-none tracking-wide shadow-none outline-none focus-visible:ring-0"
                          {...field}
                          placeholder="Share Something"
                          ref={textareaRef}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button disabled={loading} type="submit" className="">
                Send
              </Button>
            </div>
            <Separator />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size={'icon'}>
                  <Paperclip />
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
                  name="images"
                  render={({ field }) => (
                    <div className="space-y-6">
                      <FormItem className="w-full">
                        <FormControl>
                          <FileUploader
                            value={field.value}
                            onValueChange={field.onChange}
                            maxFileCount={4}
                            maxSize={4 * 1024 * 1024}
                            progresses={progresses}
                            // pass the onUpload function here for direct upload
                            // onUpload={uploadFiles}
                            disabled={isUploading}
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                  )}
                />
              </DialogContent>
            </Dialog>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
