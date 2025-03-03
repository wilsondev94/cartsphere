import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { Review } from "@prisma/client";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await req.json();

  const { comment, rating, product, userId } = body;

  const deliveredOrder = currentUser?.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  const userReview = product?.reviews.find(
    (review: Review) => review.userId === currentUser.id
  );

  if (userReview || !deliveredOrder) {
    return NextResponse.error();
  }

  const rewiew = await prisma?.review.create({
    data: {
      comment,
      rating,
      productId: product.id,
      userId,
    },
  });

  return NextResponse.json(rewiew);
}
