import prisma from "../prismaDb";

export interface ProductParams {
  category?: string | null;
  search?: string | null;
}

export default async function getProducts(params: ProductParams) {
  const { category, search } = await params;

  let searchString = search;

  if (!searchString) {
    searchString = "";
  }

  const query: any = {};
  if (category) query.category = category;

  const products = await prisma.product.findMany({
    where: {
      ...query,
      OR: [
        {
          name: {
            contains: searchString,
            mode: "insensitive",
          },
          description: {
            contains: searchString,
            mode: "insensitive",
          },
        },
      ],
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

  return products;
  try {
  } catch (error: any) {
    throw new Error(error);
  }
}
