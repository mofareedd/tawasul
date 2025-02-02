'use client';

import { AutosizeTextarea } from '@/components/autosize-textarea';
import { FileUploader } from '@/components/file-uploader';
import { UserAvatar } from '@/components/user-avatar';
import { useCreatePost } from '@/hooks/use-posts';
import { useMediaUpload, useUploadFile } from '@/hooks/use-upload-file';
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
import { Paperclip } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function CreatePost() {
  const [loading, setLoading] = useState(false);

  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    'imageUploader',
    { defaultUploadedFiles: [] }
  );

  const { startUpload, files } = useMediaUpload();
  const { mutateAsync } = useCreatePost();
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostInput),
    defaultValues: {
      content: '',
      images: [],
    },
  });

  async function onSubmit(input: CreatePostInput) {
    // mutateAsync({ input });

    toast.promise(mutateAsync({ input }), {
      loading: 'Loading...',
      success: (data) => {
        return 'Post has been created';
      },
      error: 'Error',
    });
    // const json = await api.get('me').json();
    // console.log(json);
  }

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
                        <AutosizeTextarea
                          {...field}
                          minHeight={40}
                          placeholder="Share Something"
                          disabled={loading}
                          className="resize-none focus-visible:ring-0 dark:border-muted-foreground dark:bg-accent/40"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-2 pt-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size={'icon'}
                        className="m-0 h-6 w-8 bg-transparent p-0"
                      >
                        <Paperclip className="h-4 w-4" />
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
                </div>
              </div>

              <Button disabled={loading} type="submit" className="">
                Send
              </Button>
            </div>
            {/* <Separator /> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
