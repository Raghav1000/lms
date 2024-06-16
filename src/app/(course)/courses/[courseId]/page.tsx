import { prisma } from "@/app/prisma/prisma.config";
import { redirect } from "next/navigation";

const CourseidPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await prisma.course.findUnique({
    where: {
      id: params?.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  return redirect(`/courses/${course?.id}/chapters/${course?.chapters[0]?.id}`);
};

export default CourseidPage;
