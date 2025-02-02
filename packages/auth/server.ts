import dotenv from 'dotenv';
dotenv.config();
import { db } from '@tawasul/db';
import { resend } from '@tawasul/email';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { username } from 'better-auth/plugins';

import { keys } from './keys';
import {
  getForgetPasswordTemplate,
  getVerifyEmailTemplate,
} from './template/email-templates';

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      username: {
        type: 'string',
        defaultValue: `user${Math.floor(Math.random() * 1000000000)}`,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: keys().GOOGLE_CLIENT_ID,
      clientSecret: keys().GOOGLE_CLIENT_SECRET,
    },
  },
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
  trustedOrigins: ['http://localhost:3000', 'http://localhost:1337'],
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
    },
  },
  plugins: [username(), nextCookies()],
});
