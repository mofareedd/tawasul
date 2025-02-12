import 'dotenv/config';
import { createApp } from '@/app';
import { STATUS } from '@/lib/constant';
import { auth } from '@tawasul/auth/server';
import { db } from '@tawasul/db';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import type { CreatePost } from './post.validation';

let userCookie: string[];
const MOCK_USER = {
  email: 'test2@gmail.com',
  password: '12345678Test',
  name: 'TEST1',
};
beforeAll(async () => {
  await db.$connect();
  const newUser = await auth.api.signUpEmail({
    asResponse: true,
    body: MOCK_USER,
  });

  userCookie = newUser.headers.getSetCookie();
});

afterAll(async () => {
  await db.user.deleteMany({
    where: {
      email: MOCK_USER.email,
    },
  });
  await db.$disconnect();
});

describe('POST /api/post', () => {
  test('success - create a post', async () => {
    const app = createApp();

    const newPost: CreatePost['body'] = {
      content: 'THIS IS TEST POST',
    };

    const res = await request(app)
      .post('/api/post')
      .set('Cookie', userCookie)
      .set('Accept', 'application/json')
      .send(newPost);

    expect(res.status).toBe(STATUS.CREATED);
    expect(res.body).toMatchObject({
      content: newPost.content,
    });
  });

  test('fail - create a post without authentication', async () => {
    const app = createApp();

    const newPost: CreatePost['body'] = {
      content: 'THIS IS TEST POST',
    };

    const res = await request(app)
      .post('/api/post')
      .set('Accept', 'application/json')
      .send(newPost);

    expect(res.status).toBe(STATUS.UNAUTHORIZED);
  });

  test('fail - create a post with invalid data', async () => {
    const app = createApp();

    const invalidPost = {
      title: 'THIS IS NOT VALID POST',
    };

    const res = await request(app)
      .post('/api/post')
      .set('Cookie', userCookie)
      .set('Accept', 'application/json')
      .send(invalidPost);

    expect(res.status).toBe(STATUS.BAD_REQUEST);
  });
});
