import LayoutWrapper from "@/components/layout/layoutWrapper";

export default function ArticlePreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children
  // return <LayoutWrapper isUserLayout={true}>{children}</LayoutWrapper>;
}