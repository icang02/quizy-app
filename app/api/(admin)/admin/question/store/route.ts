import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { ucFirst } from "@/lib/constant";

export async function POST(req: NextRequest) {
  const form: any = await req.json();

  const data = await db.question.create({
    data: {
      packageId: form.packageId,
      question: ucFirst(form.question),
      answers: {
        create: form.answers,
      },
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Sukses! Data berhasil ditambahkan.",
    data: data,
  });
}
