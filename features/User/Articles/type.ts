import { Category } from "@/types/category";
import { User } from "@/types/user";

export interface Article {
  id: string;
  title: string;
  content: string;
  userId: string;
  imageUrl?: string;
  categoryId: string;
  createdAt: string; 
  updatedAt: string; 
  category: Category;
  user: User;
}

export interface ArticlesResponse {
  data: Article[];
  total: number;
  page: number;
  limit: number;
}
