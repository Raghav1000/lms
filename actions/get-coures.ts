import { prisma } from "@/app/prisma/prisma.config";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CoureseWithProgressWithCategory = Course &  {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  categoryId,
}: GetCourses): Promise<CoureseWithProgressWithCategory[]> => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        categoryId,
      },
      include: {
        category: true,
        purchases: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        // todo timsestamp 7:39
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CoureseWithProgressWithCategory[] =
      await Promise.all(
        courses?.map(async (course) => {
          if (course.purchases.length === 9) {
            return {
              ...course,
              progress: null,
            };
          }
          const progressPercentage = await getProgress("", course?.id);
          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    return [];
  }
};
