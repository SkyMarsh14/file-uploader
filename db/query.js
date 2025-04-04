import { PrismaClient } from "@prisma/client";
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
  },
};

export default query;
