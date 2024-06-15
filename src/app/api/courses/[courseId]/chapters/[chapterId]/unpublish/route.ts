import { prisma } from "@/app/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const unpulishedChaper = await prisma.chapter.update({
      where: {
        id: params?.chapterId,
        courseId: params?.courseId,
      },
      data: {
        isPublished: false,
      },
    });
    const publishedChapters = await prisma.course.findMany({
      where: {
        id: params?.courseId,
        isPublished: true,
      },
    });

    if (!publishedChapters.length) {
      await prisma.course.update({
        where: {
          id: params?.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(unpulishedChaper);
  } catch (error) {
    console.log("CHAPTERS", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
