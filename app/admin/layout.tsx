'use client'
import DashboardWrapper from "@/components/layout/dashbordWrapper";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardWrapper>
      {children}
    </DashboardWrapper>
  );
}