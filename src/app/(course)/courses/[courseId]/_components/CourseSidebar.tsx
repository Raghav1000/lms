import { prisma } from "@/app/prisma/prisma.config";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseSidebarItem from "./CourseSidebarItem";

interface CourseWithChapterWithProgress {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[];
    })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({
  course,
  progressCount,
}: CourseWithChapterWithProgress) => {
  const purchase = await prisma.purchase.findUnique({
    where: {
      userId: "user_2h0u4EfLPKGf3ybrZTmATtxEGZr",
      id: course?.id,
    },
  });

  return (
    <div>
      {course?.title}
      {course?.chapters?.map((item) => (
        <CourseSidebarItem
          key={item?.id}
          id={item?.id}
          label={item?.title}
          isCompleted={item?.userProgress[0]?.isComplete}
          courseId={course?.id}
          isLocked={!item.isFree && !purchase}
        />
      ))}
    </div>
  );    
};

export default CourseSidebar;
