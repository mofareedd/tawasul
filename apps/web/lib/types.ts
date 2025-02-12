import type { authClient } from '@tawasul/auth/client';
import type { ClientUploadedFileData } from 'uploadthing/types';

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}

type Session = typeof authClient.$Infer.Session;
