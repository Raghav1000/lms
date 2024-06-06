import React, { ReactNode } from "react";
import './layout.css'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="auth-layout-container">{children}</div>;
};

export default AuthLayout;
