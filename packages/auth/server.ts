import dotenv from 'dotenv';
dotenv.config();
import { db } from '@sandoq/db';
import { resend } from '@sandoq/resend';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import {
  getForgetPasswordTemplate,
  getVerifyEmailTemplate,
} from './template/email-templates';
export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['delivered@resend.dev', user.email],
        ...getForgetPasswordTemplate({ link: url, name: user.name }),
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ url, user }) => {
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['delivered@resend.dev', user.email],
        ...getVerifyEmailTemplate({ link: url, name: user.name }),
      });
    },
    sendOnSignUp: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
});
