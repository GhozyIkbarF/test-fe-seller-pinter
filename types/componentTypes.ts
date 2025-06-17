export interface AlertDeleteProps {
  title: string;
  message?: string;
  isDialogDeleteOpen: boolean;
  setIsDialogDeleteOpen: (open: boolean) => void;
  mutateDelete: () => void;
  isPendingDelete: boolean;
}