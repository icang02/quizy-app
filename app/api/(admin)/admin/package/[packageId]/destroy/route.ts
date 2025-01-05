import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

type Params = Promise<{ packageId: string }>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { packageId } = await params;

  await db.package.delete({ where: { id: Number(packageId) } });

  return NextResponse.json({
    status: 200,
    message: "Sukses! Data berhasil dihapus.",
    data: true,
  });
}
