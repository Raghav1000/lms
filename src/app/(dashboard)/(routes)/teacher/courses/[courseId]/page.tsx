import { MdOutlineDashboardCustomize } from "react-icons/md";
import { prisma } from "@/app/prisma/prisma.config";
import { redirect } from "next/navigation";
import "./courseId.css";
import { Tag } from "antd";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import UploadCourseImage from "./_components/UploadCourseImage";
import SelectCategoryForm from "./_components/SelectCategoryForm";
import PriceForm from "./_components/PriceForm";
import ChaptersForm from "./_components/ChaptersForm";
import CourseActions from "./_components/CourseAction";

const Course = async ({ params }: { params: { courseId: string } }) => {
  const course = await prisma.course.findUnique({
    where: {
      id: params?.courseId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) return redirect("/");

  return (
    <div>
      {!course?.isPublished ? (
        <Tag color="red" style={{ width: "100%", textAlign: "center" }}>
          Course is not published.
        </Tag>
      ) : (
        <Tag
          style={{ width: "100%", textAlign: "center", borderLeft: "none" }}
          color="green"
        >
          Course is published
        </Tag>
      )}
      <div className="heading">
        <h3>Course Setup</h3>
        <span>Completed fields (1/5)</span>
      </div>
      <div className="customise">
        <Tag className="tag" bordered={false}>
          <MdOutlineDashboardCustomize size={14} />
          <h2>Customise your course</h2>
        </Tag>
      </div>
      <div className="form-container">
        <div>
          <TitleForm
            data={{
              courseId: course?.id,
              title: course?.title,
            }}
          />
          <DescriptionForm
            data={{
              courseId: course?.id,
              description: course?.description,
            }}
          />
          <UploadCourseImage
            data={{
              courseId: course?.id,
              image: course?.image,
            }}
          />
          <SelectCategoryForm
            data={{
              courseId: course?.id,
              category: course?.categoryId,
              categories,
            }}
          />
        </div>
        <div className="form-left-container">
          <CourseActions
            courseId={course?.id}
            isPublished={course?.isPublished}
          />
          <div>
            <Tag>Customise your chapters here </Tag>
            <ChaptersForm
              data={{
                courseId: course?.id,
                chapters: course?.chapters,
              }}
            />
          </div>
          <div>
            <PriceForm
              data={{
                courseId: course?.id,
                price: course?.price,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
