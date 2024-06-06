"use client";
import { ClerkLoading } from "@clerk/nextjs";
import { Flex, GetProp, message, Upload, UploadProps } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadCourseImage = (props: {
  data: { courseId: string; image: string | null };
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, async (url) => {
        setLoading(false);
        setImageUrl(url);
        try {
          await axios.patch(`/api/courses/${props?.data?.courseId}`, {
            image: url,
          });
          toast.success("Courses updated");
        } catch (err) {
          toast?.error("Something went wrong");
        }
      });
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
      Click on the image to upload course image.
      <Flex gap="middle">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          //   action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl || props?.data?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl ? imageUrl : props?.data.image as string}
              alt="avatar"
              style={{ width: "100%" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Flex>
    </div>
  );
};

export default UploadCourseImage;
