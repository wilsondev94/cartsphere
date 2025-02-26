import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") return NextResponse.error();

  const body = await req.json();
  const {
    name,
    description,
    price,
    category,
    brand,
    inStock,
    images,
    reviews,
  } = body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      category,
      brand,
      inStock,
      images,
      reviews,
      price: parseFloat(price),
    },
  });

  return NextResponse.json(product);
}
