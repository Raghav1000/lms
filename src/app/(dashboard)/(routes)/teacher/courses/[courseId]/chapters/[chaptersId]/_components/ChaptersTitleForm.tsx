"use client";
import { Input, Button } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";

interface ChaptersTitleForm {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
}

const ChaptersTitleForm = (props: ChaptersTitleForm) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    setTitle(props?.initialData?.title);
  }, [props?.initialData?.title]);

  const save = async () => {
    try {
      await axios.patch(
        `/api/courses/${props?.courseId}/chapters/${props?.chapterId}`,
        { title }
      );
      toast.success("Chapter updated");
      setIsEditing(false);
    } catch (err) {
      setIsEditing(false);
      toast?.error("Something went wrong");
    }
    router.refresh();
  };

  return (
    <div className="title-form-container">
      <div className="heading-control" onClick={() => setIsEditing(!isEditing)}>
        <span>Course Title</span>
        {isEditing ? <p>Cancel</p> : <AiOutlineEdit />}
      </div>
      <div className="title-info">
        {!isEditing ? (
          <p>{title}</p>
        ) : (
          <>
            <Input
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
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

export default ChaptersTitleForm;
