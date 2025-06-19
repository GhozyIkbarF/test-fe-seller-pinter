import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { IArticleSchema } from '@/schema/article';
import type { AppDispatch } from '@/store';
import type { UseMutateFunction } from '@tanstack/react-query';
import { ArticlesResponse } from '@/features/User/Articles/type';
import { UseFormReturn } from 'react-hook-form';

export interface FormArticlesProps {
  form: UseFormReturn<IArticleSchema, any>;
  articles: ArticlesResponse | undefined;
  username: string | null;
  isPending: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>
  preview: string | null;
  isOnPreview: boolean | undefined
  isPendingImage: boolean;
  error?: string | null;
  router: AppRouterInstance;
  dispatch: AppDispatch
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
  mutate: UseMutateFunction<
    any,
    Error,
    IArticleSchema,
    unknown
  >;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
}