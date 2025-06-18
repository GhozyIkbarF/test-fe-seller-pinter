"use client";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IArticleSchema,
  articleSchema,
} from "@/schema/article";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ImagePlus } from "lucide-react";
import InputSelect from "@/components/common/input-select";
import TiptapEditor from "@/components/common/tiptap-editor";
import FormWrapper from "@/components/layout/formWrapper";
import { useUploadImage, useUpdateArticle, useGetArticleById, useGetArticles } from "@/useCases/ArticleUseCases";
import { useGetCategoriesOption } from "@/useCases/CategoryUseCases";
import { AxiosError } from 'axios';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOnPreview } from "@/store/slices/counterSlice";
import PreviewArticle from "@/components/common/preview-article";

type CategoryOption = {
  id: string;
  name: string;
};

export default function ArticleForm() {
  const { id } = useParams<{ id: string }>();
  const form = useForm<IArticleSchema>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      imageUrl: '',
      title: "",
      categoryId: "",
      content: "",
    },
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { username } = useAppSelector((state) => state.auth.data);

  const { data: categoryOptions, isSuccess: isCategorySuccess } = useGetCategoriesOption();
  const { data: articles } = useGetArticles(1, 3, "", "", '');
  const { data: article } = useGetArticleById(id, {
      enabled: isCategorySuccess,
  });
  const { mutate: mutateImage, isPending: isPendingImage } = useUploadImage();
  const { mutate, isPending, isSuccess } = useUpdateArticle(id);

  const { isOnPreview } = useAppSelector((state) => state.state);

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

  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = ["image/jpeg", "image/png"].includes(file.type);
    if (!isValidType) {
      setError("Hanya mendukung file .jpg atau .png");
      setPreview(null);
      return;
    }

    setError("");
    setPreview(URL.createObjectURL(file));

    mutateImage(file, {
      onSuccess: (data) => {
        form.setValue("imageUrl", data.imageUrl);
        setPreview(data.imageUrl); 
      },
      onError: (error: AxiosError) => {
          const errorMessage = error.response?.data as { error: string };
          toast.error("An error occurred", {
            description: errorMessage.error,
          });
          setPreview(null);
        },
    });
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    isOnPreview ? (
    <div className="space-y-6">
      <Button
        variant="outline"
        onClick={() => dispatch(setOnPreview(false))}
        className="mb-4"
      >
        Back to Form
      </Button>
      <PreviewArticle
        title={form.getValues("title")}
        content={form.getValues("content")}
        imageUrl={form.getValues("imageUrl")}
        user={{ username: username || "Unknown User" }}
        createdAt={new Date().toISOString()}
        articles={articles?.data || []}
      />
    </div>
  ) : (
    <FormWrapper title="Update Articles">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => mutate(values))}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnails</FormLabel>
                <FormControl>
                  <div className="max-w-56 border border-dashed bg-white border-gray-300 p-6 rounded-md text-center cursor-pointer">
                    {isPendingImage ? (
                      <div className="flex justify-center items-center">
                        <span className="text-gray-500">Uploading...</span>
                      </div>
                    ) : preview ? (
                      <div>
                        <Image
                          src={preview}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="max-h-40 mx-auto object-contain"
                        />
                        <div className="flex justify-center mt-2 text-xs gap-1">
                          <button className="bg-transparent text-blue-600 hover:underline cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              if (inputRef.current) {
                                inputRef.current.click();
                              }
                            }}
                          >Changes</button>
                          <button className="bg-transparent text-red-500 hover:underline cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              field.onChange(null);
                              setPreview(null);
                            }}
                          >Delete</button>
                        </div>
                      </div>
                    ) :  (
                    <div
                      onClick={handleClick}
                    >
                        <div className="text-gray-500 flex flex-col items-center gap-2">
                          <ImagePlus className="w-6 h-6 mb-2" />
                          <p className="text-sm">
                            <span className="underline">
                              Click to select files
                            </span>
                          </p>
                          <p className="text-xs text-gray-400">
                            Support File Type: jpg or png
                          </p>
                        </div>
                        </div>
                    )}
                      
                      <input
                        type="file"
                        accept="image/*"
                        ref={inputRef}
                        onChange={(e) => {
                          handleFileChange(e);
                          field.onChange(e.target.files);
                        }}
                        className="hidden"
                      />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input placeholder="Input title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <InputSelect<CategoryOption>
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                    data={categoryOptions?.data || []}
                    options={{
                      keyLabel: "name",
                      keyValue: "id",
                    }}
                    placeholder="Select Category"
                    resetPlaceholder="All Categories"
                    className="w-full"
                  />
                </FormControl>
                <span className="text-slate-500">The existing category list can be seen in the {" "}
                  <Link href="/admin/categories" className="text-blue-600 hover:text-blue-800 hover:underline">
                    categories
                  </Link>
                   {" "} menu</span>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <TiptapEditor
                    content={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              className=""
              onClick={() => {
                form.reset()
                router.back()
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              className=""
              onClick={() => dispatch(setOnPreview(true))}
            >
              Preview
            </Button>
            <Button
              type="submit"
              variant="secondary"
              className=""
              disabled={isPending}
            >
              Upload
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  )
  );
}
