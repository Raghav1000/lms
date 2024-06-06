"use client";
import { Button, Input } from "antd";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";

const TitleForm = (props: { data: { courseId: string; title: string } }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(props?.data?.title);
  }, [props?.data?.title]);

  const save = async () => {
    try {
      await axios.patch(`/api/courses/${props?.data?.courseId}`, { title });
      toast.success("Courses updated");
      setIsEditing(false);
    } catch (err) {
      setIsEditing(false);
      toast?.error("Something went wrong");
    }
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

export default TitleForm;
