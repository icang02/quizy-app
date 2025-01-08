import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ packageId: string }>;
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { packageId } = await params;

  const data = await prisma.package.findFirst({
    where: { id: Number(packageId) },
    include: {
      questions: {
        include: { answers: true },
        orderBy: {
          id: "asc",
        },
      },
    },
  });

  return NextResponse.json(
    { status: 200, message: "Fetch data package success.", data: data },
    { status: 200 }
  );
}
