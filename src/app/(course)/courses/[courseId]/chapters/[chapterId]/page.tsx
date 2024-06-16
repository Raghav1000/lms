import React from "react";
import { getChapter } from "../../../../../../../actions/get-chapter";
import { Tag } from "antd";
import VideoPlayer from "../../_components/VideoPlayer";
import CourseEnrollButton from "../../_components/CourseEnrollButton";

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { chapter, course, muxData, nextChapter, purchase, userProgress } =
    await getChapter({
      userId: "user_2h0u4EfLPKGf3ybrZTmATtxEGZr",
      chapterId: params?.chapterId,
      courseId: params?.courseId,
    });

  const isLocked = !chapter?.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isComplete;

  return (
    <div>
      {userProgress?.isComplete && (
        <Tag color="green"> You have already completed this chpater</Tag>
      )}
      {isLocked && (
        <Tag color="yellow-inverse">
          You need to purchase this course to conitnue this chapter.
        </Tag>
      )}
      <VideoPlayer
        chapterId={params?.chapterId}
        title={chapter?.title}
        description={chapter?.description}
        courseId={params?.courseId}
        nextChapterId={nextChapter?.id}
        playbackId={muxData?.playbackId}
        isLocked={isLocked}
        completeOnEnd={completeOnEnd}
      />
      <h1>{chapter?.title}</h1>
      <h1>{chapter?.description}</h1>

      {purchase ? (
        <>
          {
            // TODO
          }
        </>
      ) : (
        <CourseEnrollButton courseId={params?.courseId} price={course?.price} />
      )}
    </div>
  );
};

export default ChapterId;
