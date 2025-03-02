import prisma from "@/lib/prismaDb";

interface Params {
  productId?: string;
}

export default async function getProductById(params: Params) {
  const param = await params;
  try {
    const { productId } = param;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}
