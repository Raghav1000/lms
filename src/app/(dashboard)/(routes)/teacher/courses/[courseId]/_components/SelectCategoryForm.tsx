"use client";
import { Button, Input, Select } from "antd";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";

const SelectCategoryForm = (props: {
  data: {
    courseId: string;
    category: string | null;
    categories: { id: string; name: string }[];
  };
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    props?.data?.category && setCategory(props?.data?.category);
  }, [props?.data?.category]);

  const save = async () => {
    try {
      await axios.patch(`/api/courses/${props?.data?.courseId}`, {
        categoryId: category,
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
        <span>Course Category</span>
        {isEditing ? <p>Cancel</p> : <AiOutlineEdit />}
      </div>
      <div className="title-info">
        {!isEditing ? (
          <b>
            <Select
              placeholder="Please select category"
              value={category}
              disabled
              style={{ width: "100%" }}
              onChange={(v: string) => setCategory(v)}
              options={props?.data?.categories ?? []}
              fieldNames={{ label: "name", value: "id" }}
            />
          </b>
        ) : (
          <>
            <Select
              placeholder="Please select category"
              value={category}
              style={{ width: "100%" }}
              onChange={(v: string) => setCategory(v)}
              options={props?.data?.categories ?? []}
              fieldNames={{ label: "name", value: "id" }}
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

export default SelectCategoryForm;
