"use client";
import React, { useEffect } from "react";
import {
  useCreateArticle,
} from "@/useCases/ArticleUseCases";
import UseArticlesFormFeature from "@/features/Admin/Articles/hooks/useArticlesFormFeature";
import FormArticles from "@/features/Admin/Articles/sections/form-articles";

export default function ArticleForm() {
  const {
    form,
    articles,
    username,
    isOnPreview,
    isPendingImage,
    preview,
    error,
    inputRef,
    router,
    dispatch,
    setPreview,
    handleClick,
    handleFileChange
  } = UseArticlesFormFeature();

  const { mutate, isPending, isSuccess } = useCreateArticle();

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      router.push("/admin/articles");
    }
  }, [isSuccess]);

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
