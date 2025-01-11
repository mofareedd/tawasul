'use client';

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
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(32),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
        <Button className="w-full rounded-full">Login</Button>

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
