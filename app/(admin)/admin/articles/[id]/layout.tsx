'use client';
import React from "react";
import LayoutWrapper from "@/components/layout/layoutWrapper";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWrapper isUserLayout={true}>
      {children}
    </LayoutWrapper>
  );
}
