'use client';

import { IconSpinner } from '@/components/icons';
import { useOtp, useSignIn } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@sandoq/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@sandoq/ui/components/form';
import { Input } from '@sandoq/ui/components/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(32),
});

export function LoginForm() {
  const { isPending, mutate } = useSignIn();
  const { mutate: mutateOtp } = useOtp();

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'pngoo1997@gmail.com',
      password: '0509702223aA@',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(
      { email: values.email, password: values.password },
      {
        onSuccess: (res) => {
          const { data, error } = res;

          if (error) {
            return toast.error(error.message);
          }

          if (data.user.emailVerified) {
            toast.success('logged In');
            router.push('/');
          } else {
            mutateOtp(
              { email: values.email, type: 'email-verification' },
              {
                onSuccess: ({ error }) => {
                  if (error) {
                    return toast.error(error.message);
                  }
                  toast.success(
                    'Logged in successfully! Please check your email to verify your account'
                  );
                  router.push('/auth/verify');
                },
              }
            );
          }
        },
        onError: (e) => {
          toast.error(e.message);
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  className="bg-accent py-5"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end font-medium">
          <Link href="/auth/forgot-password" className="text-primary text-xs">
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full rounded-full"
          disabled={isPending}
        >
          {isPending ? <IconSpinner className="mr-2" /> : null}
          Login
        </Button>

        <div className="flex items-center justify-center gap-1 text-xs">
          <p>Don't have an account?</p>
          <Link href={'/auth/sign-up'} className="font-medium text-primary">
            Signup
          </Link>
        </div>
      </form>
    </Form>
  );
}
