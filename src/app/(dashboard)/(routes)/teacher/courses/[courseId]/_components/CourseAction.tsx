"use client";
import { MdPublishedWithChanges } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { Button, Tooltip } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const CourseActions = ({
  courseId,
  isPublished,
}: {
  courseId: string;
  isPublished?: boolean | null;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/courses/${courseId}`);
      toast.success(`Course successfully deleted`);
      router.push(`/teacher/courses/${courseId}`);
      router.refresh();
    } catch (err) {
      setLoading(false);
      toast.error("Error while deleting the chapter");
    }
    setLoading(false);
  };

  const onPublish = async () => {
    setLoading(true);
    try {
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
      }
      router.refresh();
      toast.success(
        `Course successfully ${isPublished ? "unpublishing" : "publishing"}`
      );
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.response?.data as string);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
      <Button
        size="small"
        type="primary"
        icon={<MdPublishedWithChanges />}
        onClick={onPublish}
        disabled={loading}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Tooltip title="Delete this course">
        <Button
          size="small"
          onClick={onDelete}
          type="primary"
          danger
          icon={<AiFillDelete />}
          disabled={loading}
        ></Button>
      </Tooltip>
    </div>
  );
};

export default CourseActions;
