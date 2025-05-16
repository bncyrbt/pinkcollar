import { CreateAccountForm } from "./CreateAccountForm";
import { DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";

export const CreateAccountScreen = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Sign up</DialogTitle>
        <DialogDescription>Create your new account</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <CreateAccountForm />
      </div>
    </>
  );
};
