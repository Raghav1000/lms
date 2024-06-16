"use client";

import { Button } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const CourseEnrollButton = ({
  courseId,
  price,
}: {
  courseId?: string | null;
  price?: number | null;
}) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(response?.data?.url);
    } catch (err) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={onClick} type="primary" disabled={loading}>
        Enroll for ${price}
      </Button>
    </div>
  );
};

export default CourseEnrollButton;
