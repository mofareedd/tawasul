import type { ServerInferRequest, contract } from '@sandoq/contract';
import { db } from '@sandoq/db';

type FolderInput = ServerInferRequest<typeof contract.folders>;

export async function getAllFolders(userId: string) {
  return await db.folder.findMany({
    where: {
      userId: userId,
    },
  });
}
export async function createFolder(
  input: FolderInput['create']['body'] & { userId: string }
) {
  const user = await db.user.findFirst({
    where: {
      id: input.userId,
    },
  });

  //   Throw an error if user not found
  if (!user) {
    throw new Error('a');
  }

  // Create new folder and return it
  return await db.folder.create({ data: input });
}

export async function getFolderById({
  userId,
  folderId,
}: { userId: string; folderId: string }) {
  return await db.folder.findFirst({
    where: {
      id: folderId,
    },
  });
}

export async function updateFolder(
  input: FolderInput['update']['body'] & { userId: string }
) {
  const user = await db.user.findFirst({
    where: {
      id: input.userId,
    },
  });

  if (!user) {
    throw new Error('a');
  }

  return await db.folder.create({ data: input });
}

export async function deleteFolder({
  userId,
  folderId,
}: { userId: string; folderId: string }) {
  const folder = await db.folder.findFirst({
    where: {
      id: folderId,
    },
  });

  if (!folder) {
    // throw error
    return;
  }

  if (folder.userId !== userId) {
    //  throw error
    return;
  }

  return folder;
}
