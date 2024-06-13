"use client";
import { Editor } from "@/app/components/ui/Editor";
import { Preview } from "@/app/components/ui/Preview";
import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";

interface DescriptionTitleForm {
  initialData: {
    description: string;
  };
  courseId: string;
  chapterId: string;
}

const ChapterDescriptionForm = (props: DescriptionTitleForm) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    props?.initialData?.description &&
      setDescription(props?.initialData?.description);
  }, [props?.initialData?.description]);

  const save = async () => {
    try {
      await axios.patch(
        `/api/courses/${props?.courseId}/chapters/${props?.chapterId}`,
        {
          description,
        }
      );
      toast.success("Chapter updated");
      setIsEditing(false);
    } catch (err) {
      setIsEditing(false);
      toast?.error("Something went wrong");
    }
  };

  return (
    <div className="title-form-container">
      <div className="heading-control" onClick={() => setIsEditing(!isEditing)}>
        <span>Chapter Description</span>
        {isEditing ? <p>Cancel</p> : <AiOutlineEdit />}
      </div>
      <div className="title-info">
        {!isEditing ? (
          <div>
            <Preview value={description} />
          </div>
        ) : (
          <>
            <Editor
              value={description}
              onChange={(v: string) => setDescription(v)}
            />
          </>
        )}
      </div>
      {isEditing && (
        <Button type="primary" onClick={save}>
          Save
        </Button>
      )}
    </div>
  );
};

export default ChapterDescriptionForm;
