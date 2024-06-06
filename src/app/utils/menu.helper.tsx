import MenuItem from "antd/es/menu/MenuItem";
import Link from "next/link";
import { SiCoursera, SiSimpleanalytics } from "react-icons/si";
import { GrDashboard } from "react-icons/gr";
import { MenuProps } from "antd";
import { AiOutlineOrderedList } from "react-icons/ai";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const ReturnLink = (label: string, route: string) => (
  <Link href={route}>{label}</Link>
);

export const items: MenuItem[] = [
  getItem(ReturnLink("Dashboard", "/"),  "/", <GrDashboard size={16} />),
  getItem(ReturnLink("Browse", "/browse"),"/browse", <SiCoursera size={16} />),
];

export const teacherRoutes: MenuItem[] = [
  getItem(
    ReturnLink("Courses", "/teacher/courses"),
    "/teacher/courses",
    <AiOutlineOrderedList size={16} />
  ),
  getItem(
    ReturnLink("Analytics", "/teacher/analytics"),
    "/teacher/analytics",
    <SiSimpleanalytics size={16} />
  ),
];
