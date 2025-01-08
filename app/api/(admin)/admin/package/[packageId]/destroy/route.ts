import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ packageId: string }>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { packageId } = await params;

  await prisma.package.delete({ where: { id: Number(packageId) } });

  return NextResponse.json({
    status: 200,
    message: "Sukses! Data berhasil dihapus.",
    data: true,
  });
}
