import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ packageId: string }>;
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { packageId } = await params;

  const data = await db.package.findFirst({
    where: { id: Number(packageId) },
    include: {
      questions: {
        include: { answers: true },
      },
    },
  });

  return NextResponse.json(
    { status: 200, message: "Fetch data package success.", data: data },
    { status: 200 }
  );
}
