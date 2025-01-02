import { getSession } from '@/lib/auth';
import { contract } from '@sandoq/contract';
import { initServer } from '@ts-rest/express';
import {
  createFolder,
  deleteFolder,
  getAllFolders,
  getFolderById,
  updateFolder,
} from './service';

const s = initServer();

export const folderRouter = s.router(contract.folders, {
  getAll: {
    handler: async ({ headers, query }) => {
      const { take, skip } = query;
      const session = await getSession(headers);

      const folders = await getAllFolders({
        userId: session?.user.id ?? '',
        skip,
        take,
      });
      return { body: folders, status: 200 };
    },
  },

  create: {
    handler: async ({ body }) => {
      const newFolder = await createFolder({ ...body, userId: '' });
      return {
        status: 201,
        body: {
          ...newFolder,
        },
      };
    },
  },
  getById: {
    middleware: [
      (req, res, next) => {
        const { id } = req.params;
        next();
      },
    ],
    handler: async ({ params }) => {
      const { id } = params;
      const folder = await getFolderById({ folderId: id, userId: '' });

      if (!folder) {
        return { status: 404, body: { message: 'Folder not found' } };
      }

      return { status: 200, body: folder };
    },
  },

  update: {
    handler: async ({ body }) => {
      const newFolder = await updateFolder({ ...body, userId: '' });
      return {
        status: 201,
        body: {
          ...newFolder,
        },
      };
    },
  },
  remove: {
    handler: async ({ params }) => {
      const { id } = params;
      const folder = await deleteFolder({ folderId: id, userId: '' });

      if (!folder) {
        return { status: 404, body: { message: 'Folder not found' } };
      }
      return { status: 200, body: { message: 'Folder deleted' } };
    },
  },
});
