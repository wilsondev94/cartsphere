import { PrismaClient } from "@prisma/client";

// declare global {
//   const prisma: PrismaClient | undefined;
// }
// const client = globalThis.prisma || new PrismaClient();

//  Alternatively-
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const client = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;

export default client;
