'use client';
import { Icons } from '@/components/icons';
import { useForgotPassword } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@tawasul/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@tawasul/ui/components/form';
import { Input } from '@tawasul/ui/components/input';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPasswordForm() {
  const { mutate, isPending } = useForgotPassword();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'pngoo1997@gmail.com',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(
      { email: values.email },
      {
        onSuccess: (res) => {
          const { error } = res;

          if (error) {
            return toast.error(error.message);
          }

          toast.success(
            'Password reset link sent! Please check your email to proceed.'
          );
        },
      }
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  className="bg-accent py-5"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-full"
          disabled={isPending}
        >
          {isPending ? <Icons.spinner className="mr-2" /> : null}
          Reset Password
        </Button>
      </form>
      <Link
        href={'/auth/sign-in'}
        className="flex items-center justify-center space-x-3 text-muted-foreground text-sm"
      >
        <ArrowLeft size={20} /> <span>Back To Login</span>
      </Link>
    </Form>
  );
}
