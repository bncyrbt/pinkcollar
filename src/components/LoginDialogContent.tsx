"use client";
import { useAccount } from "wagmi";
import { AvailableAccounts } from "./AvailableAccounts";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { CreateAccountForm } from "./CreateAccountForm";

export const LoginDialogContent = () => {
  const { address } = useAccount();

  const [isCreateAccount, setCreateAccount] = useState(false);

  console.log("renders LoginDialogContent");
  if (isCreateAccount) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Signup</DialogTitle>
          <DialogDescription>
            Choose your Pinkcollar profile username
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{/*   <CreateAccountForm /> */}</div>
        <DialogFooter></DialogFooter>
      </>
    );
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          Connect using your Pinkcollar profile
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <AvailableAccounts wallet={address as string} />
      </div>
      <DialogFooter></DialogFooter>
    </>
  );
};
