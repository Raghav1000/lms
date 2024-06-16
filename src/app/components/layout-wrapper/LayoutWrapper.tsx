"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { useAuth } from "@clerk/nextjs";
import React, { ReactNode, useEffect } from "react";
import AntdConfigProvider from "../antd-config/AntdConfigProvider";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) router.push("/sign-in");
  }, [userId, router]);

  return (
    <AntdConfigProvider>
      <Toaster />
      <AntdRegistry>{children}</AntdRegistry>
    </AntdConfigProvider>
  );
};

export default LayoutWrapper;
