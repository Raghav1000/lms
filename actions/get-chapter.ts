import { prisma } from "@/app/prisma/prisma.config";
import { Chapter, MuxData } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  chapterId,
  courseId,
  userId,
}: GetChapterProps) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await prisma.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error(`Chapter or Course not found`);
    }

    let muxData: MuxData | null = null;
    let nextChapter: Chapter | null = null;

    if (chapter.isFree || purchase) {
      muxData = await prisma.muxData.findUnique({
        where: {
          chapterId,
        },
      });

      nextChapter = await prisma.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position as number,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      muxData,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (err) {
    return {
      chapter: null,
      course: null,
      muxData: null,
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
