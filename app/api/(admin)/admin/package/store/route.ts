import { NextRequest, NextResponse } from "next/server";
import { toTitleCase, ucFirst } from "@/lib/constant";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, description } = await req.json();

  const data = await prisma.package.create({
    data: {
      name: toTitleCase(name),
      slug: slugify(name, { lower: true }),
      description: ucFirst(description),
    },
  });

  return NextResponse.json(
    {
      status: 200,
      message: "Sukses! Data berhasil ditambahkan.",
      data: data,
    },
    { status: 200 }
  );
}
