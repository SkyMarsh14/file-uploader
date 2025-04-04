import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const query = {
  getUsers: async () => {
    return await prisma.user.findMany();
  },
};

module.exports = query;
