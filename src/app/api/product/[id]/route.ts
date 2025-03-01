import prisma from "@/lib/prismaDb";

import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "USER")
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const param = await params;

  const product = await prisma.product.delete({
    where: { id: param.id },
  });

  return NextResponse.json(product);
}
