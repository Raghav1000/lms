"use client";
import { Category, Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

type CoureseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

const CoursesList = ({
  courses,
}: {
  courses: CoureseWithProgressWithCategory[];
}) => {
  const router = useRouter();
  return (
    <div>
      {courses?.map((item) => (
        <div key={item?.id} onClick={() => router.push(`/courses/${item?.id}`)}>
          {item?.title}
        </div>
      ))}
    </div>
  );
};

export default CoursesList;
