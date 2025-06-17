"use client";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { DialogForm } from "../types";

const DialogForm: React.FC<DialogForm> = (props) => {
  const {
    form,
    action,
    isOpen,
    setIsOpen,
    mutateAdd,
    mutateEdit,
    isPendingAdd,
    isPendingUpdate,
  } = props;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {action === "add" ? "Add" : "Edit"} Category
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              action === "add" ? mutateAdd(values) : mutateEdit(values);
              setIsOpen(false);
            })}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm">
                    Category
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Input Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                type="submit"
                disabled={action === "add" ? isPendingAdd : isPendingUpdate}
              >
                {action === "add" ? "Add" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
