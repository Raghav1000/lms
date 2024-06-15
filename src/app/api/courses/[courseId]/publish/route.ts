import { prisma } from "@/app/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse(`Course not found`, { status: 404 });
    }

    const hasPublishedChapter = course?.chapters?.some(
      (chapter) => chapter.isPublished
    );

    if (
      !course?.title ||
      !course?.description ||
      !course?.image ||
      !hasPublishedChapter ||
      !course?.categoryId
    ) {
      throw new Error(`All fields that are required to publish aren't filled.`);
    }

    const publishedCourse = await prisma.course.update({
      where: {
        id: params?.courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("COURSE_ID", error);
    return new NextResponse(error as string, { status: 500 });
  }
}
