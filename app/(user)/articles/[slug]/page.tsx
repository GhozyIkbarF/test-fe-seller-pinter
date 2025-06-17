import ArticlePreviewFeature from "@/features/Preview";

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ArticlePreviewFeature params={resolvedParams} />;
}