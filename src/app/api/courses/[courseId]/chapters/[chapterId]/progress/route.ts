import { prisma } from "@/app/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  params: { courseId: string; chapterId: string }
) {
  try {
    const { isComplete } = await req.json();

    const userProgress = await prisma.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId: "user_2h0u4EfLPKGf3ybrZTmATtxEGZr",
          chapterId: params?.chapterId,
        },
      },
      update: {
        isComplete,
      },
      create: {
        userId: "user_2h0u4EfLPKGf3ybrZTmATtxEGZr",
        chapterId: params?.chapterId,
        isComplete,
      },
    });
    return NextResponse.json(userProgress);
  } catch (err) {
    return new NextResponse(`Internal Error`, { status: 500 });
  }
}
