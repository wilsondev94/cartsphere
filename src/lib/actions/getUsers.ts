import prisma from "../prismaDb";

export default async function getUsers() {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}
