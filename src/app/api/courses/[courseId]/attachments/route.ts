import { prisma } from "@/app/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const { url, name } = await req?.json();

    const attachment = await prisma.attachment.create({
      data: {
        url,
        name,
        courseId,
      },
    });
    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
