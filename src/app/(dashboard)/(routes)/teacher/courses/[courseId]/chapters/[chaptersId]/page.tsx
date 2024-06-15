import { prisma } from "@/app/prisma/prisma.config";
import Link from "next/link";
import "../../../[courseId]/courseId.css";
import { IoChevronBackOutline } from "react-icons/io5";
import { Tag } from "antd";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import ChaptersTitleForm from "./_components/ChaptersTitleForm";
import ChapterDescriptionForm from "./_components/ChaptersDescriptionForm";
import ChapterAccessSettings from "./_components/ChapterAccessSettings";
import VideoUploadForm from "./_components/VideoUploadForm";
import { Chapter, MuxData } from "@prisma/client";
import ChapterActions from "./_components/ChapterActions";

const ChaptersIdPage = async ({
  params,
}: {
  params: { courseId: string; chaptersId: string };
}) => {
  const chapter = await prisma.chapter.findUnique({
    where: { id: params?.chaptersId ?? "" },
    include: {
      muxData: true,
    },
  });
  console.log(chapter);
  return (
    <>
      {!chapter?.isPublished ? (
        <Tag color="red" style={{ width: "100%", textAlign: "center" }}>
          {" "}
          Chapter is not published.{" "}
        </Tag>
      ) : (
        <Tag
          style={{ width: "100%", textAlign: "center", borderLeft: "none" }}
          color="green"
        >
          Chapter is published
        </Tag>
      )}
      <div>
        <Link
          className="link-back-to-course"
          href={`/teacher/courses/${params?.courseId}`}
        >
          <IoChevronBackOutline />
          <span>Back to Course Setup</span>
        </Link>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <div className="heading chapter-id-heading">
              <h3>Course Setup</h3>
              <span>Completed fields (1/3)</span>
            </div>
            <div className="customise">
              <Tag className="tag" bordered={false}>
                <MdOutlineDashboardCustomize size={14} />
                <h2>Customise your chapter</h2>
              </Tag>
            </div>
            <ChaptersTitleForm
              initialData={chapter as { title: string }}
              courseId={params?.courseId}
              chapterId={params?.chaptersId}
            />
            <ChapterDescriptionForm
              initialData={chapter as { description: string }}
              courseId={params?.courseId}
              chapterId={params?.chaptersId}
            />
            <ChapterAccessSettings
              initialData={chapter as { isFree: boolean }}
              courseId={params?.courseId}
              chapterId={params?.chaptersId}
            />
          </div>
          <div>
            <div>
              <ChapterActions
                courseId={params?.courseId}
                chapterId={params?.chaptersId}
                isPublished={chapter?.isPublished}
              />
            </div>
            <div className="heading chapter-id-heading">
              <h5>Video Upload</h5>
              <VideoUploadForm
                chapterId={params?.chaptersId}
                courseId={params?.courseId}
                initialData={chapter as Chapter & { muxData?: MuxData | null }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChaptersIdPage;
