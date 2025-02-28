import prisma from "../prismaDb";

export default async function getProducts() {
  try {
    const orders = await prisma.order.findMany({
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
