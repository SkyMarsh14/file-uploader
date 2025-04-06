import { PrismaClient } from "./../generated/client/default.js";
const prisma = new PrismaClient();
const query = {
  user: {
    getAll: async () => {
      return await prisma.user.findMany();
    },
    register: async (username, password) => {
      try {
        await prisma.user.create({
          data: {
            password: password,
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
  },
};

export default query;
