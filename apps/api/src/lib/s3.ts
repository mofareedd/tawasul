import { randomBytes } from 'node:crypto';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import type { Express } from 'express';
import sharp from 'sharp';
import { env } from './env';
const BUCKET_NAME = env.BUCKET_NAME;
const s3 = new S3Client({
  region: env.BUCKET_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile({ file }: { file: Express.Multer.File }) {
  const randomImageName = randomBytes(32).toString('hex');

  const buffer = await sharp(file.buffer)
    .resize({ height: 1920, width: 1080, fit: 'contain' })
    .toBuffer();

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: randomImageName,
    Body: buffer,
    ContentType: file.mimetype,
  });

  const newMedia = await s3.send(command);

  return { ...newMedia, key: randomImageName };
}

export async function retrieveFileUrl(objectKey: string) {
  const command = new GetObjectCommand({
    Bucket: env.BUCKET_NAME,
    Key: objectKey,
  });
  return await getSignedUrl(s3, command);
}
