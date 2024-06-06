"use client";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";

const DescriptionForm = (props: {
  data: { courseId: string; description: string | null };
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    props?.data?.description && setDescription(props?.data?.description);
  }, [props?.data?.description]);

  const save = async () => {
    try {
      await axios.patch(`/api/courses/${props?.data?.courseId}`, {
        description,
      });
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
        <span>Course Description</span>
        {isEditing ? <p>Cancel</p> : <AiOutlineEdit />}
      </div>
      <div className="title-info">
        {!isEditing ? (
          <p>{description}</p>
        ) : (
          <>
            <TextArea
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
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

export default DescriptionForm;
