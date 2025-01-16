'use client';
import { IconSpinner } from '@/components/icons';
import { useResetPassword } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@sandoq/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@sandoq/ui/components/form';
import { Input } from '@sandoq/ui/components/input';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
  .object({
    password: z.string().min(2).max(32),
    confirm: z.string().min(2).max(32),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password don't match",
    path: ['confirm'],
  });

export default function ResettPasswordForm() {
  const { mutate, isPending } = useResetPassword();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm: '',
    },
  });
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(
      { newPassword: values.password },
      {
        onSuccess: (res) => {
          const { error } = res;

          if (error) {
            return toast.error(error.message);
          }

          toast.success('Your password has been updated successfully!');
          router.push('/auth/sign-in');
        },
      }
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="New Password"
                  type="password"
                  {...field}
                  className="bg-accent py-5"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  {...field}
                  className="bg-accent py-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-full"
          disabled={isPending}
        >
          {isPending ? <IconSpinner className="mr-2" /> : null}
          Change Password
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
