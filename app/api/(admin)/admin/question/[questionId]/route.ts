import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ questionId: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { questionId } = await params;

  const data = await prisma.question.findFirst({
    where: { id: Number(questionId) },
    include: {
      answers: {
        orderBy: {
          id: "asc",
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Success fetch question data.",
    data: data,
  });
}
