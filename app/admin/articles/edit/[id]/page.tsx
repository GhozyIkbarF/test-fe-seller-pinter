"use client";
import React, { useEffect } from "react";
import { useUpdateArticle, useGetArticleById } from "@/useCases/ArticleUseCases";
import { useGetCategoriesOption } from "@/useCases/CategoryUseCases";
import { useParams } from "next/navigation";
import UseArticlesFormFeature from "@/features/Admin/Articles/hooks/useArticlesFormFeature";
import FormArticles from "@/features/Admin/Articles/sections/form-articles";

export default function ArticleForm() {
  const { id } = useParams<{ id: string }>();
  const {
    form,
    articles,
    username,
    isOnPreview,
    isPendingImage,
    preview,
    inputRef,
    router,
    error,
    dispatch,
    setPreview,
    handleClick,
    handleFileChange
  } = UseArticlesFormFeature();

  const { data: categoryOptions, isSuccess: isCategorySuccess } = useGetCategoriesOption();
  const { data: article } = useGetArticleById(id, {
      enabled: isCategorySuccess,
  });
  const { mutate, isPending, isSuccess } = useUpdateArticle(id);

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      router.push("/admin/articles");
    } 
  }, [isSuccess]);

  useEffect(() => {
    if (article) {
      form.reset({
        imageUrl: article.imageUrl,
        title: article.title,
        categoryId: article.categoryId,
        content: article.content,
      });
      setPreview(article.imageUrl ?? null);
    }
  }, [article]);

  return <FormArticles
      form={form}
      articles={articles}
      username={username}
      isPending={isPending}
      inputRef={inputRef}
      preview={preview}
      isOnPreview={isOnPreview}
      isPendingImage={isPendingImage}
      error={error}
      router={router}
      dispatch={dispatch}
      setPreview={setPreview}
      mutate={mutate}
      handleFileChange={handleFileChange}
      handleClick={handleClick}
    />
}
