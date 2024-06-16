import { prisma } from "@/app/prisma/prisma.config";
import { ReactNode } from "react";
import { getProgress } from "../../../../../actions/get-progress";
import CourseSidebar from "./_components/CourseSidebar";
import CourseNavbar from "./_components/CourseNavbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { courseId: string };
}) => {
  const course = await prisma.course.findUnique({
    where: {
      id: params?.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId: null,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const progressCount = await getProgress("", course?.id);

  return (
    <div>
      <CourseNavbar />
      <CourseSidebar course={course as any} progressCount={progressCount} />
      {children}
    </div>
  );
};

export default CourseLayout;
