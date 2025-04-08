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
  },
  folder: {
    getAll: async () => {
      return await prisma.folder.findMany();
    },
    getBase: async (userId) => {
      const root = await prisma.folder.findFirst({
        where: {
          folderName: "root",
          userId: userId,
        },
      });
      const folders = await prisma.folder.findMany({
        where: {
          parentFolderId: root.id,
        },
      });
      return { root, folders };
    },
    create: async (folderName, parentFolderId) => {
      return await prisma.folder.create({
        data: {
          folderName: folderName,
          parentFolderId: parentFolderId,
        },
      });
    },
  },
};

export default query;
