"use client";
import { Form, Input, Button, Space } from "antd";
import "./styles.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const AddCourse = () => {
  const { push } = useRouter();
  const { userId } = useAuth();
  const onFinish = async (values: { courseTitle: string }) => {
    try {
      const response = await axios.post("/api/courses", { ...values, userId });
      push(`/teacher/courses/${response?.data?.id}`);
      toast?.success("Course created successfully.", { position: "bottom-right" });
    } catch (error) {
      console.log(error)
      toast?.error("Something went wrong", { position: "bottom-right" });
    }
  };
  return (
    <div>
      <h1> Name your course </h1>
      <Form
        name="basic"
        style={{ maxWidth: 600, paddingTop: "2rem" }}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Course Title"
          name="courseTitle"
          rules={[{ required: true, message: "Please enter course title!" }]}
          style={{ maxWidth: 300 }}
        >
          <Input placeholder="Enter course title" />
        </Form.Item>
        <Space>
          <Button type="default" onClick={() => push("/teacher/courses")}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default AddCourse;
