"use client";
import { AiFillDelete } from "react-icons/ai";
import { Course } from "@prisma/client";
import { TableProps, Space, Button, Table, Tag } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiEditAlt } from "react-icons/bi";
import { IoAddOutline } from "react-icons/io5";

const CoursesTable = ({ courses }: { courses: Course[] }) => {
  const router = useRouter();

  const edit = (id: string) => {
    router.push(`/teacher/courses/${id}`);
  };

  const onDelete = async (courseId: string) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      toast.success(`Course successfully deleted`);
      router.refresh();
    } catch (err) {
      toast.error("Error while deleting the chapter");
    }
  };

  const columns: TableProps<Course>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a?.title.localeCompare(b?.title),
      //   render: (text) => <a>{title}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      sorter: (a, b) => a?.title.localeCompare(b?.title),
    },
    {
      title: "Published",
      dataIndex: "isPublshed",
      key: "isPublshed",
      render: (val) =>
        val ? (
          <Tag color="green">Published</Tag>
        ) : (
          <Tag color="yellow">Pending</Tag>
        ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (val) => <span>{val ? `$ ${val}` : ""}</span>,
      sorter: (a, b) => (a?.price ?? 0) - (b?.price ?? 0),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            size="small"
            onClick={() => edit(record?.id)}
            icon={<BiEditAlt />}
          />
          <Button
            danger
            size="small"
            type="dashed"
            onClick={() => onDelete(record?.id)}
            icon={<AiFillDelete />}
          />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Button
        className="add-course"
        onClick={() => router.push("/teacher/add-course")}
        icon={<IoAddOutline size={18} />}
        type="primary"
      >
        Add Course
      </Button>
      <Table
        size="small"
        columns={columns}
        dataSource={courses}
        pagination={{
          position: ["bottomRight"],
          pageSizeOptions: [10],
        }}
      />
    </div>
  );
};

export default CoursesTable;
