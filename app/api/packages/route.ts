import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.package.findMany({
    include: {
      questions: {
        orderBy: { id: "asc" },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(
    {
      status: 200,
      message: "Success fetching data packages.",
      data: data,
    },
    { status: 200 }
  );
}
