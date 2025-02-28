import { STATUS } from '@/lib/constant';
import { env } from '@/lib/env';
import { HttpException } from '@/lib/exception';
import { uploadFile } from '@/lib/s3';
import { db } from '@tawasul/db';
import type { Express } from 'express';
import type { CreateGroup, GroupParamsInput } from './group.validation';
type InputOptions = {
  userId: string;
};

export async function findManyGroups() {
  return await db.group.findMany({
    select: {
      id: true,
      createdAt: true,
      name: true,
      img: true,
      _count: {
        select: {
          userGroup: true,
        },
      },
    },
  });
}

async function uploadGroupImage(media: Express.Multer.File[] | undefined) {
  if (media && media.length > 0) {
    const image = await uploadFile({ file: media[0] });
    return image.key;
  }
  return null;
}

export async function createGroup(input: CreateGroup['body'] & InputOptions) {
  const groupImage = await uploadGroupImage(input.media);
  return await db.group.create({
    data: {
      name: input.name,
      description: input.description,
      userId: input.userId,
      img: groupImage ? `${env.CLOUD_FRONT_URL}/${groupImage}` : '',
      userGroup: {
        create: {
          userId: input.userId,
        },
      },
    },
  });
}

export async function findGroupById(input: GroupParamsInput['params']) {
  const group = await db.group.findFirst({
    where: {
      id: input.id,
    },
    include: {
      userGroup: {
        include: { user: true },
      },
      _count: {
        select: {
          post: true,
          userGroup: true,
        },
      },
    },
  });

  if (!group) {
    throw new HttpException({
      message: 'Group not found',
      statusCode: STATUS.NOT_FOUND,
    });
  }

  return group;
}

export async function joinGroup(
  input: GroupParamsInput['params'] & InputOptions
) {
  const group = await db.group.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!group) {
    throw new HttpException({
      message: 'Group not found',
      statusCode: STATUS.NOT_FOUND,
    });
  }

  if (group.userId === input.userId) {
    throw new HttpException({
      message: 'Creator cannot leave the group.',
      statusCode: STATUS.FORBIDDEN,
    });
  }

  const isMember = await db.userGroup.findFirst({
    where: {
      groupId: group.id,
      userId: input.userId,
    },
  });

  if (isMember) {
    return await db.userGroup.delete({
      where: {
        groupId_userId: {
          groupId: group.id,
          userId: input.userId,
        },
      },
    });
  }

  return await db.userGroup.create({
    data: {
      groupId: input.id,
      userId: input.userId,
    },
  });
}
