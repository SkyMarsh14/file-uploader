import { PrismaClient } from "./../generated/client/default.js";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
const query = {
  user: {
    getAll: async () => {
      return await prisma.user.findMany();
    },
    register: async (username, password) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const user = await prisma.user.create({
          data: {
            password: hashedPassword,
            username: username,
          },
        });
        const folder = await prisma.folder.create({
          data: {
            folderName: "root",
            userId: user.id,
          },
        });
        return { user, folder };
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    findByUsername: async (username) => {
      return await prisma.user.findFirst({
        where: {
          username: username,
        },
      });
    },
    findById: async (id) => {
      return await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    },
    deleteAll: async () => {
      return await prisma.user.deleteMany();
    },
    findRootFolder: async (userId) => {
      const data = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          rootFolder: true,
        },
      });
      return data.rootFolder.id;
    },
  },
  folder: {
    getAll: async () => {
      return await prisma.folder.findMany();
    },
    getFolderById: async (folderId) => {
      return await prisma.folder.findUnique({
        where: {
          id: folderId,
        },
      });
    },
    getFolderByParentId: async (parentFolderId) => {
      const folders = await prisma.folder.findMany({
        where: {
          parentFolderId: parentFolderId,
        },
      });
      const files = await prisma.file.findMany({
        where: {
          folderId: parentFolderId,
        },
      });
      return { folders, files, parentFolderId };
    },
    create: async (folderName, parentFolderId) => {
      return await prisma.folder.create({
        data: {
          folderName: folderName,
          parentFolderId: parentFolderId,
        },
      });
    },
    getParent: async (folderId) => {
      const currentFolder = await prisma.folder.findUnique({
        where: {
          id: folderId,
        },
      });
      if (currentFolder.parentFolderId === null) {
        return null;
      }
      const parentFolder = await prisma.folder.findUnique({
        where: {
          id: currentFolder.parentFolderId,
        },
      });
      return parentFolder;
    },
    rename: async (folderId, folderName) => {
      return await prisma.folder.update({
        where: {
          id: folderId,
        },
        data: {
          folderName: folderName,
        },
      });
    },
    delete: async (folderId) => {
      return await prisma.folder.delete({
        where: {
          id: folderId,
        },
      });
    },
    delete_by_parentFolderId: async (parentFolderId) => {
      return await prisma.folder.deleteMany({
        where: {
          parentFolderId: parentFolderId,
        },
      });
    },
    deleteMany: async (condition) => {
      return await prisma.folder.deleteMany({
        where: condition,
      });
    },
    findMany: async (condition) => {
      return await prisma.folder.findMany({
        where: condition,
      });
    },
    find: async (condition) => {
      return await prisma.folder.findFirst({
        where: condition,
      });
    },
  },

  file: {
    create: async (fileName, folderId) => {
      return await prisma.file.create({
        data: {
          fileName: fileName,
          folderId: folderId,
        },
      });
    },
    findUnique: async (condition) => {
      return await prisma.file.findUnique({
        where: condition,
      });
    },
    update_by_id: async (fileId, data) => {
      return await prisma.file.update({
        where: {
          id: fileId,
        },
        data: data,
      });
    },
  },
};

export default query;
