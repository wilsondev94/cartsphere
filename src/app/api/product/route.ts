import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "USER")
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await req.json();
  console.log("Received body:", body);

  const { name, description, price, category, brand, inStock, images } = body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      category,
      brand,
      inStock,
      images,
      price: parseFloat(price),
    },
  });

  return NextResponse.json(product);
}
