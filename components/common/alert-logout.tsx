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

import type { AlertLogoutProps } from "@/types/componentTypes";
const AlertLogout: React.FC<AlertLogoutProps> = (props) => {
  const {
    isDialogOpen,
    setIsDialogOpen,
    mutate,
  } = props;

  return (
    <AlertDialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate();
            }}
            className="bg-blue-600 text-white transition-all hover:bg-blue-600/80"
          >
           Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertLogout;
