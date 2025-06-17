import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { AlertDeleteProps } from "@/types/componentTypes";

const AlertDelete: React.FC<AlertDeleteProps> = (props) => {
  const {
    title,
    message,
    isDialogDeleteOpen,
    setIsDialogDeleteOpen,
    mutateDelete,
    isPendingDelete,
  } = props;

  return (
    <AlertDialog
      open={isDialogDeleteOpen}
      onOpenChange={(isOpen) => setIsDialogDeleteOpen(isOpen)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {title}</AlertDialogTitle>
          <AlertDialogDescription>
            {message || `Are you sure you want to delete this ${title}? This action cannot be
            undone.` }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutateDelete();
            }}
            className="bg-red-500 text-white transition-all hover:bg-red-500/80"
          >
            {isPendingDelete ? "Loading..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDelete;
