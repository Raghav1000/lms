"use client"
import { SignIn, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
  const { userId } = useAuth();

  useEffect(() => {
    userId && localStorage.setItem("userId", userId);
  }, [userId]);

  return <SignIn />;
}
