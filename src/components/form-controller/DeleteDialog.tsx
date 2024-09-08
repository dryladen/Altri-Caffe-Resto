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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  deleteOpen: boolean;
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionFn: () => void;
};

const DeleteDialog = ({ deleteOpen, setDeleteOpen, actionFn }: Props) => {
  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ingin menghapus item ini ?</AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini tidak dapat diurungkan, data akan dihapus permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex">
          <AlertDialogCancel>Tidak</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500"
            onClick={() => {
              actionFn();
            }}
          >
            Iya
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
