import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ attemptId: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { attemptId } = await params;

  const data = await prisma.attempt.findFirst({
    where: { id: parseInt(attemptId) },
    include: {
      package: true,
    },
  });

  return NextResponse.json(
    {
      status: 200,
      message: "Fetch attempt score success.",
      data: data,
    },
    { status: 200 }
  );
}
