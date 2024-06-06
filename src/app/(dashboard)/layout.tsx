"use client";
import { MdOutlineGraphicEq } from "react-icons/md";
import { Button, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import "./layout.css";
import React, { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { items, teacherRoutes } from "../utils/menu.helper";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const route = useRouter();

  const isTeacherRoute = pathname?.startsWith("/teacher");
  const isPlayerRoute = pathname?.startsWith("/player");

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsedWidth={60} width={250} className="menu-bg">
          <div className="app-logo">
            <MdOutlineGraphicEq size={20} color="black" />
            <h2>LMS</h2>
          </div>
          <Menu
            style={{ background: "transparent" }}
            mode="inline"
            items={isTeacherRoute ? teacherRoutes : items}
            selectedKeys={[pathname]}
          />
        </Sider>
        <Layout className="main-layout">
          <div className="header">
            <div className="welcome">
              Welcome <span>Raghav</span>
            </div>
            <div className="header-left">
              {isPlayerRoute || isTeacherRoute ? (
                <Button
                  type="default"
                  size="small"
                  onClick={() => route.push("/")}
                >
                  Exit
                </Button>
              ) : (
                <Button
                  type="default"
                  size="small"
                  onClick={() => route.push("/teacher/courses")}
                >
                  Teacher Mode
                </Button>
              )}

              <div onClick={() => localStorage.clear()}>
                <UserButton />
              </div>
            </div>
          </div>
          <div className="children-container">{children}</div>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
