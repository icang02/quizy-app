import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { ucFirst } from "@/lib/constant";

export async function POST(req: NextRequest) {
  const question: any = await req.json();

  await db.question.update({
    where: { id: question.id },
    data: {
      question: ucFirst(question.question),
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

  if (question.deleteQuestion.length != 0)
    await db.answer.deleteMany({
      where: {
        id: {
          in: question.deleteQuestion,
        },
      },
    });

  return NextResponse.json({
    status: 200,
    message: "Sukses! Data berhasil diupdate.",
    data: true,
  });
}
