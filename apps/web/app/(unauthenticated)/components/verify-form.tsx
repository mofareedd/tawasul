'use client';

import { IconSpinner } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { useOtp } from '@/hooks/useAuth';
import { useTimer } from '@/hooks/useTimer';
import type { Session } from '@/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailOtp } from '@sandoq/auth';
import { Button } from '@sandoq/ui/components/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@sandoq/ui/components/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@sandoq/ui/components/input-otp';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your verification code must be 6 digits.',
  }),
});

interface IVerifyForm {
  user: Session['user'];
}
export function VerifyForm({ user }: IVerifyForm) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: '',
    },
  });
  const { timeLeft, start, reset, isActive } = useTimer(60);
  const { mutate } = useOtp();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { error } = await emailOtp.verifyEmail(
        {
          email: user.email!,
          otp: values.pin,
        },
        {
          onSuccess: () => {
            toast.success('Your account has been verified successfully ✅');
            router.push('/');
          },
        }
      );

      if (error) {
        toast.error(error.message);
      }
    });
  }

  function handleResendOTP() {
    if (!isActive) {
      mutate(
        { email: user.email, type: 'email-verification' },
        {
          onSuccess: () => {
            toast.success('OTP resent successfully! Please check your email');
          },
        }
      );
      reset();
      start();
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center space-y-6"
      >
        <ThemeToggle />
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-center">
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-14 w-14 text-lg " />
                    <InputOTPSlot index={1} className="h-14 w-14 text-lg " />
                    <InputOTPSlot index={2} className="h-14 w-14 text-lg " />
                    <InputOTPSlot index={3} className="h-14 w-14 text-lg " />
                    <InputOTPSlot index={4} className="h-14 w-14 text-lg " />
                    <InputOTPSlot index={5} className="h-14 w-14 text-lg " />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the verification code sent to your email.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full max-w-xs rounded-full"
          disabled={isPending}
        >
          {isPending ? <IconSpinner className="mr-2" /> : null}
          Verify
        </Button>
        <div className="flex items-center space-x-2">
          <p className="text-muted-foreground text-xs">
            Didn't received the OTP ?
          </p>
          <Button
            type="button"
            variant={'link'}
            className="px-0"
            onClick={handleResendOTP}
            disabled={isActive}
          >
            Resend code {isActive ? timeLeft : ''}
          </Button>
        </div>
      </form>
    </Form>
  );
}
