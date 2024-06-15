"use client";
import { AiOutlineEdit } from "react-icons/ai";
import { Button, Card, Input, Tag } from "antd";
import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { CgAdd, CgEditNoise } from "react-icons/cg";
import { useRouter } from "next/navigation";

export interface IChapter {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  position: number | null;
  isPublished: boolean | null;
  isFree: boolean | null;
  courseId: string | null;
  createdAt: Date | null;
  updatedAt: Date;
}

const ChaptersForm = (props: {
  data: {
    courseId: string;
    chapters: IChapter[] | null;
  };
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [title, setTitle] = useState<string>("");
  const { push } = useRouter();

  useEffect(() => {
    props?.data?.chapters && setChapters(props?.data?.chapters);
  }, [props?.data?.chapters]);

  const save = async () => {
    try {
      await axios.post(`/api/courses/${props?.data?.courseId}/chapters`, {
        title,
      });
      const newChapter = { title } as IChapter;
      setChapters([...chapters, newChapter]);
      toast.success("Courses updated");
      setIsEditing(false);
    } catch (err) {
      setIsEditing(false);
      toast?.error("Something went wrong");
    }
  };

  return (
    <div className="chapter-form-container">
      <div className="heading-control" onClick={() => setIsEditing(!isEditing)}>
        <span>Course Chapters</span>
        {!isEditing ? (
          <Button className="center" type="text" size="small" icon={<CgAdd />}>
            Add Chapters
          </Button>
        ) : (
          <p>Cancel</p>
        )}
      </div>
      {chapters?.length === 0 && !isEditing && (
        <p
          style={{ color: "lightgray", marginTop: "1rem", fontStyle: "italic" }}
        >
          No chapters
        </p>
      )}
      {chapters?.map((item, idx) => {
        return (
          <div className="course-title-container">
            {idx + 1}. {item?.title}
            <div style={{ display: "flex" }}>
              {item?.isFree && <Tag color="blue">Free</Tag>}
              {item?.isPublished && <Tag color="green-inverse">Published</Tag>}
              <Button
                size="small"
                onClick={() =>
                  push(
                    `/teacher/courses/${props?.data?.courseId}/chapters/${item?.id}`
                  )
                }
              >
                <AiOutlineEdit />
              </Button>
            </div>
          </div>
        );
      })}
      {isEditing && (
        <div className="chapter-title-input-form">
          <Input
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value as any)
            }
          />
          <Button type="primary" onClick={save}>
            Create
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChaptersForm;
