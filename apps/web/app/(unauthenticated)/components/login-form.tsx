'use client';

import { IconSpinner } from '@/components/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@sandoq/auth';
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
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(32),
});

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'pngoo1997@gmail.com',
      password: '0509702223aA@',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { error } = await signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            toast.success('logged In');
            router.push('/');
          },
        }
      );

      if (error) {
        toast.error(error.message);
      }
    });
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
          <Link href={''} className="text-primary text-xs">
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
