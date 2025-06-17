import React from "react";
import { Metadata } from "next";

import LoginFeature from "@/features/Auth/Login";

export const metadata: Metadata = {
  title: "Auth Login",
};

const LoginPage = () => {
  return <LoginFeature />;
};

export default LoginPage;
