import { prisma } from "@/app/prisma/prisma.config";
import React from "react";
import CategoryItem from "./_components/CategoryItems";
import { getCourses } from "../../../../../actions/get-coures";
import CoursesList from "./_components/CoursesList";

const Browse = async ({
  searchParams,
}: {
  searchParams: {
    categoryId: string;
  };
}) => {
  const categories = await prisma.category.findMany();

  const courses = await getCourses({
    categoryId: searchParams?.categoryId,
  });

  return (
    <div>
      {categories?.map((item) => (
        <CategoryItem key={item?.id} category={item} />
      ))}
      <CoursesList courses={courses} />
    </div>
  );
};

export default Browse;
