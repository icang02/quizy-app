import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

type Params = Promise<{ questionId: string }>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { questionId } = await params;

  await db.question.delete({ where: { id: Number(questionId) } });

  return NextResponse.json({
    status: 200,
    message: "Sukses! Data berhasil dihapus.",
    data: true,
  });
}
