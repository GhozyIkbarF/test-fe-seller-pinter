"use client";
import { DataTable } from "./sections/data-table";
import { UseArticlesFreature } from "@/features/User/Articles/hooks";
import { useAppSelector } from "@/store/hooks";
import { Article } from "@/features/User/Articles/type";
import DataTableColumnAction from "@/components/common/data-table-action";
import AlertDelete from "@/components/common/alert-delete";
import {
  useDeleteArticle,
} from "@/useCases/ArticleUseCases";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";


const ArticlesFeature = () => {
  const { id } = useAppSelector((state) => state.auth.data);
  const {
    page,
    limit,
    category,
    data,
    isLoading,
    searchQuery,
    selectedId,
    isOpenAlert,
    setPage,
    setCategory,
    setSearchQuery,
    setSelectedId,
    setIsOpenAlert,
  } = UseArticlesFreature({ userId: id, limitPage: 10 });

  const router = useRouter();

  const { mutate: mutateDelete, isPending: isPendingDelete } =
    useDeleteArticle(selectedId);

  return (
    <div className="flex flex-col gap-4">
      <DataTable<Article>
        data={data?.data || []}
        totalData={data?.total || 0}
        isLoading={isLoading}
        limit={limit}
        page={page}
        setPage={setPage}
        totalPages={Math.ceil((data?.total ?? 0) / limit) || 0}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        category={category}
        setCategory={setCategory}
        columns={[
          {
            header: "Thumbnails",
            accessorKey: "imageUrl",
            cell: (row) => (
              <div className="flex justify-center">
                <Image
                  src={row.imageUrl || "/placeholder.png"}
                  alt={row.title || "Article Thumbnail"}
                  width={60}
                  height={60}
                  className="object-cover rounded"
                />
              </div>
            ),
          },
          {
            header: "Title",
            accessorKey: "title",
          },
          {
            header: "Category",
            accessorKey: "category",
            cell: (row) => (
              <span className="text-sm text-gray-600">
                {row.category?.name || "Uncategorized"}
              </span>
            ),
          },
          {
            header: "Created At",
            accessorKey: "createdAt",
            cell: (row) => (
              <span className="text-sm text-gray-500">
                {formatDate(row.createdAt, "MMMM dd, yyyy HH:mm:ss")}
              </span>
            ),
          },
          {
            header: "Actions",
            accessorKey: "actions",
            cell: (row) => (
              <div className="flex justify-center gap-2">
                <DataTableColumnAction
                  id={row.id || ""}
                  customRoutePath={`/articles/${row.id}-${slugify(row.title)}`}
                  showEdit
                  setIsDialogOpen={setIsOpenAlert}
                  handleAction={(action) => {
                    setSelectedId(row.id || "");
                    action === "edit" && router.push(`/admin/articles/${row.id}/edit/`);
                  }}
                />
              </div>
            ),
          },
        ]}
      />
      <AlertDelete
        title="Articles"
        message="Deleting this article is permanent and cannot be undone. All related content will be removed."
        isDialogDeleteOpen={isOpenAlert}
        isPendingDelete={isPendingDelete}
        setIsDialogDeleteOpen={setIsOpenAlert}
        mutateDelete={mutateDelete}
      />
    </div>
  );
};

export default ArticlesFeature;
