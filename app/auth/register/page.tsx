import React from "react";
import { Metadata } from "next";

import RegisterFeature from "@/features/Auth/Register";

export const metadata: Metadata = {
  title: "Auth Register",
};

const Register = () => {
  return <RegisterFeature />;
};

export default Register;
