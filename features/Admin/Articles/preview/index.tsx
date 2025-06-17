import PreviewArticle from "@/components/common/preview-article";
import { useAppSelector } from "@/store/hooks";
export default async function ArticlePreviewFeature() {
    const { username } = useAppSelector((state) => state.auth.data);
    
  return (
    <div></div>
    //   <PreviewArticle
    //     title={article.title}
    //     content={article.content}
    //     imageUrl={article.imageUrl}
    //     createdAt={article.createdAt}
    //     user={{ username: username }}
    //   />
  )
}