import { NextRequest, NextResponse } from "next/server";
import { formatInTimeZone } from "date-fns-tz";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { packageId, name } = await req.json();

  const now = new Date();
  const startTime = formatInTimeZone(
    now,
    "Asia/Makassar",
    "yyyy-MM-dd HH:mm:ssXXX"
  );
  const endDate = new Date(now);
  endDate.setMinutes(now.getMinutes() + 90);
  // endDate.setSeconds(now.getSeconds() + 63);

  const endTime = formatInTimeZone(
    endDate,
    "Asia/Makassar",
    "yyyy-MM-dd HH:mm:ssXXX"
  );

  const data = await prisma.attempt.create({
    data: {
      name: name.toUpperCase(),
      packageId: packageId,
      startTime: startTime,
      endTime: endTime,
    },
  });

  return NextResponse.json(
    {
      status: 200,
      message: "Sukses fetching data package.",
      data: data,
    },
    { status: 200 }
  );
}
