import { useState, useRef, use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, IArticleSchema } from "@/schema/article";
import { useGetArticles, useUploadImage } from "@/useCases/ArticleUseCases";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";

const UseArticlesFormFeature = () => {
    const form = useForm<IArticleSchema>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
          imageUrl: "",
          title: "",
          categoryId: "",
          content: "",
        },
      });

      const [preview, setPreview] = useState<string | null>(null);
      const [error, setError] = useState("");
      const { username } = useAppSelector((state) => state.auth.data);
      const { isOnPreview } = useAppSelector((state) => state.state);

      const inputRef = useRef<HTMLInputElement>(null);

      const dispatch = useAppDispatch();
      const router = useRouter();

      const { data: articles } = useGetArticles(1, 3, "", "", "");
      const { mutate: mutateImage, isPending: isPendingImage } = useUploadImage();

      const handleClick = () => {
         inputRef.current?.click();
    };

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

    return {
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
        handleFileChange,
    };
}

export default UseArticlesFormFeature;