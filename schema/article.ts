import { z } from "zod";

export const articleSchema = z.object({
  imageUrl: z.string().min(1, "Please enter picture"),
  title: z.string().min(1, "Please enter title"),
  categoryId: z.string().min(1, "Please select category"),
  content: z.string().min(1, "Content field cannot be empty"),
});

export type IArticleSchema = z.infer<typeof articleSchema>;

export const articleUpdateSchema = z.object({
    id: z.string(),
    thumbnails: z.string().optional(),
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    categoryId: z.string()
});

export type IArticleUpdateSchema = z.infer<typeof articleUpdateSchema>;

