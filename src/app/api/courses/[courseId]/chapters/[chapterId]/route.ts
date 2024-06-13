import { prisma } from "@/app/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { isPublished, ...values } = await req.json();
  try {
    const chapter = await prisma.chapter.update({
      where: {
        courseId: params?.courseId,
        id: params?.chapterId,
      },
      data: {
        ...values,
      },
    });
    // handle video url

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("CHAPTERS", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
