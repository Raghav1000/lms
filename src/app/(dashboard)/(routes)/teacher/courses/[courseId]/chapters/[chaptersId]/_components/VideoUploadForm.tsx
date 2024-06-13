"use client";
import { ClerkLoading } from "@clerk/nextjs";
import { Chapter, MuxData } from "@prisma/client";
import { UploadProps } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";

interface VideoUploadFormProps {
  chapterId: string;
  courseId: string;
  initialData: Chapter & { muxData?: MuxData | null };
}

const VideoUploadForm = (props: VideoUploadFormProps) => {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = async (info) => {
    try {
      await axios.patch(
        `/api/courses/${props?.courseId}/chapters/${props?.chapterId}`,
        {
          image: "",
        }
      );
      toast.success("Chapter updated");
    } catch (err) {
      toast?.error("Something went wrong");
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <ClerkLoading /> : <BiPlus />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div className="image-container">
      Click to upload video image.
      {props?.initialData?.videoUrl && (
        <div>
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
};

export default VideoUploadForm;
