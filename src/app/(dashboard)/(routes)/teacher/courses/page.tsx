"use client"
import { Button } from "antd";
import React from "react";
import { IoAddOutline } from "react-icons/io5";
import "./styles.css";
import { useRouter } from "next/navigation";

const CoursesPage = () => {
  const router = useRouter();
  return (
    <div className="course-page-container">
      <Button
        className="add-course"
        onClick={() => router.push("/teacher/add-course")}
        icon={<IoAddOutline size={18} />}
        type="primary"
      >
        Add Course
      </Button>
    </div>
  );
};

export default CoursesPage;
