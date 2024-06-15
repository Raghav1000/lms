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
    });
    
    const unPublishedCourse = await prisma.course.update({
      where: {
        id: params?.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unPublishedCourse);
  } catch (error) {
    console.log("COURSE_ID", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
