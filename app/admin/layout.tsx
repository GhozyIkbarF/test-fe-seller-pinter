'use client'
import LayoutWrapper from "@/components/layout/layoutWrapper";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
  );
}