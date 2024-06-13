import { prisma } from "@/app/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const { title }: { title: string } = await req?.json();

    const lastChapter = await prisma.chapter.findFirst({
      where: {
        courseId: courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter?.position ? lastChapter?.position + 1 : 1;

    const chapter = await prisma.chapter.create({
      data: {
        title,
        courseId: courseId,
        position: newPosition,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("CHAPTERS", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
