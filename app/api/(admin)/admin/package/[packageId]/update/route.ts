import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { toTitleCase, ucFirst } from "@/lib/constant";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ packageId: string }>;

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  const { packageId } = await params;
  const { name, description } = await req.json();

  const data = await prisma.package.update({
    where: { id: Number(packageId) },
    data: {
      name: toTitleCase(name),
      slug: slugify(name, { lower: true }),
      description: ucFirst(description),
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Sukses! Data berhasil diupdate.",
    data: data,
  });
}
