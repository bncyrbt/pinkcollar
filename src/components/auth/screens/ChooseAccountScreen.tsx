import { AvailableAccounts } from "./AvailableAccounts";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ChooseAccountScreen() {
  return (
    <div className="">
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
      </DialogHeader>
      <div className="p-8 flex flex-col gap-2">
        <span className="text-lg">Choose Pinkcollar account:</span>
        <AvailableAccounts />
      </div>
    </div>
  );
}
