import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { attemptId, userAnswers } = await req.json();

  for (const item of userAnswers) {
    await prisma.userAnswer.upsert({
      where: {
        attemptId_questionId: {
          attemptId: attemptId,
          questionId: item.questionId,
        },
      },
      update: {
        answerId: parseInt(item.answerId),
      },
      create: {
        attemptId: item.attemptId,
        questionId: item.questionId,
        answerId: parseInt(item.answerId),
      },
    });
  }

  const correctAnswers = await prisma.userAnswer.count({
    where: {
      attemptId: attemptId,
      answer: {
        isCorrect: true,
      },
    },
  });
  const totalScore = correctAnswers * 5;

  await prisma.attempt.update({
    where: { id: attemptId },
    data: {
      score: totalScore,
      status: true,
    },
  });

  return NextResponse.json(
    {
      status: 200,
      message: "Success finish exam.",
      data: [],
    },
    { status: 200 }
  );
}
