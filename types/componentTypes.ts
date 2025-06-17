export interface AlertDeleteProps {
  title: string;
  message?: string;
  isDialogDeleteOpen: boolean;
  setIsDialogDeleteOpen: (open: boolean) => void;
  mutateDelete: () => void;
  isPendingDelete: boolean;
}

export interface AlertLogoutProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  mutate: () => void;
}