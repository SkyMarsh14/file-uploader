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
        await prisma.user.create({
          data: {
            password: hashedPassword,
            username: username,
          },
        });
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
};

export default query;
