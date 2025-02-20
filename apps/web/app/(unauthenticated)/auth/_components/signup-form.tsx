'use client';

import { Icons } from '@/components/icons';
import { useSignUp } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@tawasul/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@tawasul/ui/components/form';
import { Input } from '@tawasul/ui/components/input';
import {} from '@tawasul/ui/components/sonner';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(1)
    .transform((value) => value.replaceAll(' ', '')),
  email: z.string().email(),
  password: z.string().min(2).max(32),
});

export function SignupForm() {
  const { mutate, isPending } = useSignUp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Pngo',
      username: '',
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
          `Signed up successfully! 
          Please check your email to verify your account`
        );

        setTimeout(() => {
          location.href = '/auth/sign-in';
        }, 2000);
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Username"
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
          {isPending ? <Icons.spinner className="mr-2" /> : null}
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
