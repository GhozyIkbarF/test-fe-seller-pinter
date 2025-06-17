"use client";
import { DataTable } from "./sections/data-table";
import { useAppSelector } from "@/store/hooks";
import {
  useGetCategories,
  useDeleteCategory,
  useCreateCategory,
  useUpdateCategory,
} from "@/useCases/CategoryUseCases";
import UseCategoryFeature from "./hooks";
import AlertDelete from "@/components/common/alert-delete";
import DialogForm from "./sections/modal-add-category";
import DataTableColumnAction from "@/components/common/data-table-action";
import { useEffect } from "react";

const CategoriesFreature = () => {
  //   const { role, username, id } = useAppSelector((state) => state.auth.data);
  const {
    form,
    page,
    limit,
    debouncedSearch,
    searchQuery,
    actionForm,
    selectedId,
    seledtedData,
    isOpenDialogForm,
    isOpenAlertDelete,
    setPage,
    setSearchQuery,
    setActionForm,
    setSelectedId,
    handleSelectData,
    setIsOpenDialogForm,
    setIsOpenAlertDelete,
  } = UseCategoryFeature();

  const { data, isLoading, refetch } = useGetCategories(
    page,
    limit,
    debouncedSearch
  );

  const {
    mutate: mutateDelete,
    isPending: isPendingDelete,
  } = useDeleteCategory(selectedId);

  const {
    mutate: mutateCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useCreateCategory();

  const {
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdateCategory(selectedId);


  useEffect(() => {
    if (isSuccessCreate || isSuccessUpdate) {
      form.reset()
    }
  }, [isSuccessCreate, isSuccessUpdate]);

  
  return (
    <div>
      <DialogForm
        action={actionForm}
        form={form}
        isOpen={isOpenDialogForm}
        setIsOpen={setIsOpenDialogForm}
        isPendingAdd={isPendingCreate}
        isPendingUpdate={isPendingUpdate}
        mutateAdd={mutateCreate}
        mutateEdit={mutateUpdate}
      />
      <DataTable
        data={data?.data || []}
        total={data?.totalData || 0}
        isLoading={isLoading}
        limit={limit}
        page={page}
        setPage={setPage}
        totalPages={data?.totalPages || 0}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setAction={setActionForm}
        setIsDialogAddOpen={setIsOpenDialogForm}
        columns={[
          {
            header: "Category",
            accessorKey: "name",
          },
          {
            header: "Created At",
            accessorKey: "createdAt",
          },
          {
            header: "Actions",
            accessorKey: "actions",
            cell: (row) => (
              <div className="flex justify-center gap-2">
                <DataTableColumnAction
                  id={row.id || ""}
                  showDetail={false}
                  showEdit
                  setIsEdit={setIsOpenDialogForm}
                  setIsDialogOpen={setIsOpenAlertDelete}
                  handleAction={(action) => {
                    // console.log(data);
                    console.log(action, 'action');
                    setSelectedId(row.id || "");
                    setActionForm(action);
                    handleSelectData(data?.data || [], row.id || "", action);
                  }}
                />
              </div>
            ),
          },
        ]}
      />
      <AlertDelete
        title="Delete Category"
        message={`Delete category “${seledtedData?.name}”? This will remove it from master data permanently.`}
        isDialogDeleteOpen={isOpenAlertDelete}
        isPendingDelete={isPendingDelete}
        setIsDialogDeleteOpen={setIsOpenAlertDelete}
        mutateDelete={mutateDelete}
      />
    </div>
  );
};

export default CategoriesFreature;
