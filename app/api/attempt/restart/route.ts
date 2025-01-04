import { NextRequest, NextResponse } from "next/server";
import { formatInTimeZone } from "date-fns-tz";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  const { attemptId } = await req.json();

  const now = new Date();
  const startTime = formatInTimeZone(
    now,
    "Asia/Makassar",
    "yyyy-MM-dd HH:mm:ssXXX"
  );
  const endDate = new Date(now);
  // endDate.setMinutes(now.getMinutes() + 1);
  endDate.setSeconds(now.getSeconds() + 63);

  const endTime = formatInTimeZone(
    endDate,
    "Asia/Makassar",
    "yyyy-MM-dd HH:mm:ssXXX"
  );

  const data = await db.attempt.update({
    where: { id: parseInt(attemptId) },
    data: {
      startTime: startTime,
      endTime: endTime,
      score: 0,
      status: false,
    },
  });

  // Delete data table UserAnswers
  await db.userAnswer.deleteMany({
    where: { attemptId: parseInt(attemptId) },
  });

  return NextResponse.json(
    {
      status: 200,
      message: "Success restart exam with attempt ID.",
      data: data,
    },
    { status: 200 }
  );
}
