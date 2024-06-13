"use client";
import { Button, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";

interface ChatperAccessSettingsProps {
  initialData: {
    isFree: boolean;
  };
  courseId: string;
  chapterId: string;
}

const ChatperAccessSettings = (props: ChatperAccessSettingsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFree, setIsFree] = useState(false);

  useEffect(() => {
    props?.initialData?.isFree && setIsFree(props?.initialData?.isFree);
  }, [props]);

  const save = async () => {
    try {
      await axios.patch(
        `/api/courses/${props?.courseId}/chapters/${props?.chapterId}`,
        {
          isFree,
        }
      );
      toast.success("Chapter updated");
      setIsEditing(false);
    } catch (err) {
      setIsEditing(false);
      toast?.error("Something went wrong");
    }
  };

  console.log(isFree);

  return (
    <div className="title-form-container">
      <div className="heading-control" onClick={() => setIsEditing(!isEditing)}>
        <span>Chapter access settings</span>
        {isEditing ? <p>Cancel</p> : <AiOutlineEdit />}
      </div>
      <div className="title-info">
        {!isEditing ? (
          <div>
            <Checkbox checked={isFree} />
            <span style={{ marginLeft: "0.5rem" }}>
              {isFree ? "Free Content" : "Paid Content"}
            </span>
          </div>
        ) : (
          <>
            <Checkbox
              checked={isFree}
              onChange={(e: CheckboxChangeEvent) => setIsFree(e.target.checked)}
            />
            <span style={{ marginLeft: "0.5rem" }}>
              {isFree ? "Free Content" : "Paid Content"}
            </span>
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

export default ChatperAccessSettings;
