'use client';
import React from "react";
import DashboardWrapper from "@/components/layout/dashbordWrapper";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardWrapper >
      {children}
    </DashboardWrapper>
  );
}
