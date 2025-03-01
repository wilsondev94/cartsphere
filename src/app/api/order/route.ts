import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "USER")
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await req.json();

  const { id, deliveryStatus } = body;

  const order = await prisma.order.update({
    where: { id: id },
    data: { deliveryStatus },
  });

  return NextResponse.json(order);
}
