import { AvailableAccounts } from "./AvailableAccounts";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export const SelectAccountDialogContent = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          Connect using your Pinkcollar profile
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <AvailableAccounts />
      </div>
      <DialogFooter></DialogFooter>
    </>
  );
};
