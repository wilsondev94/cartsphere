import prisma from "../prismaDb";

export default async function getOrdersByUserId(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: userId },
      include: {
        user: true,
      },
      orderBy: {
        createdDate: "desc",
      },
    });

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
