import { AvailableAccounts } from "./AvailableAccounts";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ChooseAccountScreen() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>Hey anon, who are you today?</DialogDescription>
      </DialogHeader>
      <AvailableAccounts />
    </>
  );
}
