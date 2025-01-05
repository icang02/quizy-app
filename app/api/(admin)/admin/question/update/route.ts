import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  const question: any = await req.json();

  await db.question.update({
    where: { id: question.id },
    data: {
      question: question.question,
    },
  });

  for (const answer of question.answers) {
    await db.answer.upsert({
      where: { id: answer.id },
      update: {
        answer: answer.answer,
        isCorrect: answer.isCorrect,
      },
      create: {
        questionId: answer.questionId,
        answer: answer.answer,
        isCorrect: answer.isCorrect,
      },
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Sukses! Data berhasil diupdate.",
    data: true,
  });
}
