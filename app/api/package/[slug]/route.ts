import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ slug: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { slug } = await params;

  const data = await prisma.package.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!data)
    return NextResponse.json(
      {
        status: 404,
        message: "Cannot find data or empty slug.",
      },
      { status: 404 }
    );

  return NextResponse.json(
    {
      status: 200,
      message: "Sukses fetching data package.",
      data: data,
    },
    { status: 200 }
  );
}
