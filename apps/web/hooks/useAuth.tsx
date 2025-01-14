import { emailOtp } from '@sandoq/auth';
import { useMutation } from '@tanstack/react-query';

export function useOtp() {
  return useMutation({
    mutationFn: async ({
      email,
      type,
    }: {
      email: string;
      type: 'forget-password' | 'email-verification';
    }) => {
      await emailOtp.sendVerificationOtp({
        email,
        type,
      });
    },
  });
}
