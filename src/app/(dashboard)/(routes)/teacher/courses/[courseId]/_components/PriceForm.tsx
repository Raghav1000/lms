"use client";
import { Button, Input } from "antd";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";

const PriceForm = (props: {
  data: { courseId: string; price: number | null };
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState<number | null>();

  useEffect(() => {
    props?.data?.price && setPrice(props?.data?.price);
  }, [props?.data?.price]);

  const save = async () => {
    try {
      await axios.patch(`/api/courses/${props?.data?.courseId}`, {
        price: Number(price),
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
        <span>Course Price</span>
        {isEditing ? <p>Cancel</p> : <AiOutlineEdit />}
      </div>
      <div className="title-info">
        {!isEditing ? (
          <p>
            ${" "}
            {price?.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        ) : (
          <>
            <Input
              value={price?.toString()}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value as any)
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

export default PriceForm;
