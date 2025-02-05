import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ attemptId: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { attemptId } = await params;
  const data = await prisma.attempt.findFirst({
    where: { id: Number(attemptId) },
    include: {
      package: {
        include: {
          questions: {
            include: {
              answers: {
                orderBy: { id: "asc" },
              },
            },
            orderBy: {
              id: "asc",
            },
          },
        },
      },
    },
  });

  return NextResponse.json(
    {
      status: 200,
      message: "Success fetch attempt with relation questions.",
      data: data,
    },
    { status: 200 }
  );
}
