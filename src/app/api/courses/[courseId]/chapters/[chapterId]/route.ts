import { prisma } from "@/app/prisma/prisma.config";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  const { isPublished, ...values } = await req.json();
  const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
  });

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
    if (values?.videoUrl) {
      const existingMuxData = await prisma.muxData.findFirst({
        where: {
          chapterId: params?.chapterId,
        },
      });
      if (existingMuxData) {
        await video.assets.delete(existingMuxData?.assetId);
        await prisma.muxData.delete({
          where: {
            id: existingMuxData?.id,
          },
        });
      }

      const assets = await video.assets.create({
        input: values?.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await prisma.muxData.create({
        data: {
          chapterId: params?.chapterId,
          assetId: assets?.id,
          playbackId: assets?.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("CHAPTERS", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const chapter = await prisma.chapter.delete({
      where: {
        courseId: params?.courseId,
        id: params?.chapterId,
      },
    });

    const publishedChaptersInCourse = await prisma.chapter.findMany({
      where: {
        courseId: params?.courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await prisma.course.update({
        where: {
          id: params?.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("CHAPTERS", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
