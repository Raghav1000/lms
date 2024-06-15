import { prisma } from "@/app/prisma/prisma.config";
import { NextResponse } from "next/server";
import { Mux } from "@mux/mux-node";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
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
      return new NextResponse("Course not found", { status: 400 });
    }

    for (const chapter of course?.chapters) {
      if (chapter?.muxData?.assetId) {
        await video?.assets?.delete(chapter?.muxData?.assetId);
      }
    }

    const deleteCourse = await prisma.course.delete({
      where: {
        id: params?.courseId,
      },
    });

    return NextResponse.json(deleteCourse);
  } catch (error) {
    console.log("COURSE_ID_DELETE", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const values = await req?.json();

    const course = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("COURSE_ID", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
