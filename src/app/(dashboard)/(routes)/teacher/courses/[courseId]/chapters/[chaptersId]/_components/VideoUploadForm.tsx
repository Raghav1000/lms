"use client";
import { ClerkLoading } from "@clerk/nextjs";
import { Chapter, MuxData } from "@prisma/client";
import { Button, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiPlus, BiUpload } from "react-icons/bi";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";

interface VideoUploadFormProps {
  chapterId: string;
  courseId: string;
  initialData: Chapter & { muxData?: MuxData | null };
}

const VideoUploadForm = (props: VideoUploadFormProps) => {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>();
  const [fileList, setFileList] = useState([]);

  // const handleChange: UploadProps["onChange"] = async (info) => {
  //   try {
  //     await axios.patch(
  //       `/api/courses/${props?.courseId}/chapters/${props?.chapterId}`,
  //       {
  //         image: "",
  //       }
  //     );
  //     toast.success("Chapter updated");
  //   } catch (err) {
  //     toast?.error("Something went wrong");
  //   }
  // };

  const handleChange = async (info: any) => {
    let fileList = [...info.fileList];

    // Limit the number of uploaded files to 1
    fileList = fileList.slice(-1);

    // Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(fileList as any);
    console.log(fileList);
    try {
      await axios.patch(
        `/api/courses/${props?.courseId}/chapters/${props?.chapterId}`,
        {
          videoUrl: fileList,
        }
      );
      toast.success("Chapter updated");
    } catch (err) {
      toast?.error("Something went wrong");
    }
  };

  const handleBeforeUpload = (file: RcFile) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      toast.error("You can only upload video files!");
    }
    return isVideo || Upload.LIST_IGNORE;
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
      <Upload
        // action="/upload/video" // Your backend endpoint for handling video upload
        listType="picture"
        fileList={fileList}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
      >
        <Button icon={<BiUpload />}>Upload Video</Button>
      </Upload>
      {props?.initialData?.videoUrl && (
        <div>
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
      {props?.initialData?.muxData?.playbackId && (
        <MuxPlayer playbackId={props?.initialData?.muxData?.playbackId ?? ""} />
      )}
    </div>
  );
};

export default VideoUploadForm;
