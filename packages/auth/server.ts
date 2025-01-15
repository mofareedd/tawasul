import dotenv from 'dotenv';
dotenv.config();
import { db } from '@sandoq/db';
import { resend } from '@sandoq/resend';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP } from 'better-auth/plugins';
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
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['delivered@resend.dev', user.email],
        ...getForgetPasswordTemplate({ link: url, name: user.name }),
      });
    },

    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },
    plugins: [
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          console.log('Sending an email...');
          if (type === 'email-verification') {
            await resend.emails.send({
              from: 'Acme <onboarding@resend.dev>',
              to: ['delivered@resend.dev', email],
              ...getVerifyEmailTemplate({ name: email, otp }),
            });
          }
        },

        otpLength: 6,
        expiresIn: 86400,
      }),
      nextCookies(),
    ],
  },
});
