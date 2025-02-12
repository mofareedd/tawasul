import { useMutation } from '@tanstack/react-query';
import { authClient } from '@tawasul/auth/client';

// export function useOtp() {
//   return useMutation({
//     mutationFn: async ({
//       email,
//       type,
//     }: {
//       email: string;
//       type: 'forget-password' | 'email-verification';
//     }) => {
//       return await emailOtp.sendVerificationOtp({
//         email,
//         type,
//       });
//     },
//   });
// }

export function useSignUp() {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
      username,
    }: {
      name: string;
      username: string;
      email: string;
      password: string;
    }) => {
      return await authClient.signUp.email({
        name,
        email,
        password,
        username,
      });
    },
  });
}

export function useSignIn() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await authClient.signIn.email({
        email,
        password,
      });
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async ({
      email,
    }: {
      email: string;
    }) => {
      return await authClient.forgetPassword({
        email,
        redirectTo: '/auth/reset-password',
      });
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({
      newPassword,
    }: {
      newPassword: string;
    }) => {
      return await authClient.resetPassword({
        newPassword,
      });
    },
  });
}
