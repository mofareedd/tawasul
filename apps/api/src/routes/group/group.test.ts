import 'dotenv/config';
import { createApp } from '@/app';
import { createUser } from '@/lib/auth';
import { STATUS } from '@/lib/constant';
import type { TNewUser } from '@/types';
import { faker } from '@faker-js/faker';
import { db } from '@tawasul/db';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import type { CreateGroup } from './group.validation';

describe('Group routes', () => {
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
  describe('POST /api/group', () => {
    test('success - create a group', async () => {
      const app = createApp();

      const newGroup: CreateGroup['body'] = {
        name: 'TEST GROUP NAME',
        description: 'TEST GROUP DESCRIPTION',
      };

      const res = await request(app)
        .post('/api/group')
        .set('Cookie', userCookie)
        .set('Accept', 'application/json')
        .send(newGroup);

      expect(res.status).toBe(STATUS.CREATED);
      expect(res.body).toMatchObject({
        name: newGroup.name,
      });
    });

    test('fail - create  group without authentication', async () => {
      const app = createApp();

      const newGroup: CreateGroup['body'] = {
        name: 'TEST GROUP NAME',
        description: 'TEST GROUP DESCRIPTION',
      };

      const res = await request(app)
        .post('/api/group')
        .set('Accept', 'application/json')
        .send(newGroup);

      expect(res.status).toBe(STATUS.UNAUTHORIZED);
    });

    test('fail - create a group without authentication', async () => {
      const app = createApp();

      const newGroup: CreateGroup['body'] = {
        name: 'group without auth',
        description: 'group desc',
      };

      const res = await request(app)
        .post('/api/group')
        .set('Accept', 'application/json')
        .send(newGroup);

      expect(res.status).toBe(STATUS.UNAUTHORIZED);
    });

    test('fail - create a group with invalid data', async () => {
      const app = createApp();

      const invalidGroup = {
        title: 'THIS IS NOT VALID GROUP DATA',
      };

      const res = await request(app)
        .post('/api/group')
        .set('Cookie', userCookie)
        .set('Accept', 'application/json')
        .send(invalidGroup);

      expect(res.status).toBe(STATUS.BAD_REQUEST);
    });
  });

  describe('GET /api/group/:id/join', () => {
    test('success - join group', async () => {
      const app = createApp();

      const newGroup: CreateGroup['body'] = {
        name: 'Random Group',
        description: 'Random GROUP DESCRIPTION',
      };

      const groupResponse = await request(app)
        .post('/api/group')
        .set('Cookie', userCookie)
        .set('Accept', 'application/json')
        .send(newGroup);

      const newUserCookie = await createUser({
        email: faker.internet.email().toLowerCase(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
      });

      const res = await request(app)
        .get(`/api/group/${groupResponse.body.id}/join`)
        .set('Cookie', newUserCookie)
        .set('Accept', 'application/json');

      expect(res.status).toBe(STATUS.CREATED);
      expect(res.body).toMatchObject({
        groupId: groupResponse.body.id,
      });
    });

    test('success - leave group when already a member', async () => {
      const app = createApp();

      // Create a group
      const newGroup: CreateGroup['body'] = {
        name: 'Leave Group Test',
        description: 'Testing leave group functionality',
      };

      const groupResponse = await request(app)
        .post('/api/group')
        .set('Cookie', userCookie)
        .set('Accept', 'application/json')
        .send(newGroup);

      // Create second user and join group
      const newUserCookie = await createUser({
        email: faker.internet.email().toLowerCase(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
      });

      // First join request
      await request(app)
        .get(`/api/group/${groupResponse.body.id}/join`)
        .set('Cookie', newUserCookie)
        .set('Accept', 'application/json');

      // Second join request should remove user from group
      const leaveRes = await request(app)
        .get(`/api/group/${groupResponse.body.id}/join`)
        .set('Cookie', newUserCookie)
        .set('Accept', 'application/json');

      expect(leaveRes.status).toBe(STATUS.CREATED);
      expect(leaveRes.body).toMatchObject({
        groupId: groupResponse.body.id,
      });
    });

    test('fail - group owner cannot leave group', async () => {
      const app = createApp();

      // Create a group
      const newGroup: CreateGroup['body'] = {
        name: 'Owner Leave Test',
        description: 'Testing owner leave restriction',
      };

      const groupResponse = await request(app)
        .post('/api/group')
        .set('Cookie', userCookie)
        .set('Accept', 'application/json')
        .send(newGroup);

      // Try to leave as owner
      const res = await request(app)
        .get(`/api/group/${groupResponse.body.id}/join`)
        .set('Cookie', userCookie)
        .set('Accept', 'application/json');

      expect(res.status).toBe(STATUS.FORBIDDEN);
      expect(res.body.error.message).toBe('Creator cannot leave the group.');
    });

    test('fail - join non-existent group', async () => {
      const app = createApp();
      const fakeGroupId = faker.string.uuid();

      const res = await request(app)
        .get(`/api/group/${fakeGroupId}/join`)
        .set('Cookie', userCookie)
        .set('Accept', 'application/json');

      expect(res.status).toBe(STATUS.NOT_FOUND);
      expect(res.body.error.message).toBe('Group not found');
    });

    test('fail - join group without authentication', async () => {
      const app = createApp();

      // Create a group first
      const newGroup: CreateGroup['body'] = {
        name: 'Auth Test Group',
        description: 'Testing authentication requirement',
      };

      const groupResponse = await request(app)
        .post('/api/group')
        .set('Cookie', userCookie)
        .set('Accept', 'application/json')
        .send(newGroup);

      // Try to join without authentication
      const res = await request(app)
        .get(`/api/group/${groupResponse.body.id}/join`)
        .set('Accept', 'application/json');

      expect(res.status).toBe(STATUS.UNAUTHORIZED);
    });
  });
});
