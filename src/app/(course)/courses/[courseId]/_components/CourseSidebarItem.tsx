"use client";

import { Button } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { BiCheckCircle, BiLock } from "react-icons/bi";
import { PiPlayCircle } from "react-icons/pi";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

const CourseSidebarItem = ({
  courseId,
  id,
  isCompleted,
  isLocked,
  label,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? (
    <BiLock />
  ) : isCompleted ? (
    <BiCheckCircle />
  ) : (
    <PiPlayCircle />
  );

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div>
      <Button type="text" onClick={onClick}>
        {Icon} {label}
      </Button>
    </div>
  );
};

export default CourseSidebarItem;
