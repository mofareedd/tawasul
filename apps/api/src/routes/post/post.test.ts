import 'dotenv/config';
import { createApp } from '@/app';
import { createUser } from '@/lib/auth';
import { STATUS } from '@/lib/constant';
import type { TNewUser } from '@/types';
import { faker } from '@faker-js/faker';
import { db } from '@tawasul/db';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import type { CreatePost } from './post.validation';

describe('Post routes', () => {
  let newUser: TNewUser;
  let userCookie: string[];
  beforeAll(async () => {
    await db.$connect();

    newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password(),
    };

    userCookie = await createUser(newUser);
  });

  afterAll(async () => {
    await db.user.deleteMany();
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
});
