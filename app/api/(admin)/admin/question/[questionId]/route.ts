import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

type Params = Promise<{ questionId: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { questionId } = await params;

  const data = await db.question.findFirst({
    where: { id: Number(questionId) },
    include: {
      answers: true,
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Success fetch question data.",
    data: data,
  });
}
