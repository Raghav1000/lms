import React from "react";
import "./styles.css";
import { prisma } from "@/app/prisma/prisma.config";
import CoursesTable from "./[courseId]/_components/CoursesTable";

const CoursesPage = async () => {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="course-page-container">
      <CoursesTable courses={courses} />
    </div>
  );
};

export default CoursesPage;
