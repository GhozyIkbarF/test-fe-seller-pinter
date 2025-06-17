export interface Category {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  data: Category[];
  totalData: number;
  currentPage: number;
  totalPages: number;
}
