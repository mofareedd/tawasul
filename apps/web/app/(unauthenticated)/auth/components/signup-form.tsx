'use client';

import { IconSpinner } from '@/components/icons';
import { useSignUp } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@sandoq/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@sandoq/ui/components/form';
import { Input } from '@sandoq/ui/components/input';
import {} from '@sandoq/ui/components/sonner';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(2).max(32),
});

export function SignupForm() {
  const { mutate, isPending } = useSignUp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Pngo',
      email: 'pngoo1997@gmail.com',
      password: '0509702223aA@',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: (res) => {
        const { error } = res;
        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success(
          'Signed up successfully! Please check your email to verify your account'
        );
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Name"
                  {...field}
                  className="bg-accent py-5"
                />
              </FormControl>
            </FormItem>
          )}
        />
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
        <Button
          type="submit"
          className="w-full rounded-full"
          disabled={isPending}
        >
          {isPending ? <IconSpinner className="mr-2" /> : null}
          Signup
        </Button>

        <div className="flex items-center justify-center gap-1 text-xs">
          <p>You have an account?</p>
          <Link href={'/auth/sign-in'} className="font-medium text-primary">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
