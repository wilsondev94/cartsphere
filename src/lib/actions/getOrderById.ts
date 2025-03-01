import prisma from "@/lib/prismaDb";

interface Params {
  orderId?: string;
}

export default async function getOrderById(params: Params) {
  const param = await params;
  try {
    const { orderId } = param;

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) return null;

    return order;
  } catch (error) {
    console.log(error);
  }
}
