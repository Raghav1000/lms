"use client";
import { UserButton } from "@clerk/nextjs";
import { Button } from "antd";
import { usePathname, useRouter } from "next/navigation";

const CourseNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <div className="header">
        <div className="welcome">
          Welcome <span>Raghav</span>
        </div>
        <div className="header-left">
          {pathname?.includes("/courses") ? (
            <Button
              type="default"
              size="small"
              onClick={() => router.push("/")}
            >
              Exit
            </Button>
          ) : (
            <Button
              type="default"
              size="small"
              onClick={() => router.push("/teacher/courses")}
            >
              Teacher Mode
            </Button>
          )}

          <div onClick={() => localStorage.clear()}>
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseNavbar;
