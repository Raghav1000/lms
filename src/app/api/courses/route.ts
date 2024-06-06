import { prisma } from "@/app/prisma/prisma.config";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { courseTitle, userId } = await req?.json();
    console.log(req?.json);
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const course = await prisma.course.create({
      data: {
        userId: userId,
        title: courseTitle,
      },
    });
    return NextResponse.json(course);
  } catch (err:any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
