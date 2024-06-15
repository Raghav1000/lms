import { prisma } from "@/app/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {

  try {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: params?.chapterId,
        courseId: params?.courseId,
      },
    });

    const muxData = await prisma.muxData.findUnique({
      where: {
        chapterId: params?.chapterId,
      },
    });

    if (!chapter || !chapter.title || !chapter.description) {
      return new NextResponse(`Missing required fields`, { status: 400 });
    }

    const publishChapter = await prisma.chapter.update({
      where: {
        id: params?.chapterId,
        courseId: params?.courseId,
      },
      data: {
        isPublished: true,
      },
    });

    console.log({ publishChapter });
    return NextResponse.json(publishChapter);
  } catch (error) {
    console.log("CHAPTERS", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
