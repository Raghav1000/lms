import { prisma } from "@/app/prisma/prisma.config";

export const getProgress = async (
  userId: string,
  courseId?: string
): Promise<number> => {
  try {
    const publishedChapters = await prisma.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishChapterIds = publishedChapters?.map((item) => item.id);

    const validCompletedChapters = await prisma.userProgress.count({
      where: {
        chapterId: {
          in: publishChapterIds,
        },
        isComplete: true,
      },
    });

    const progressPercentage =
      validCompletedChapters / publishChapterIds.length / 100;

    return progressPercentage;
  } catch (err) {
    return 0;
  }
};
