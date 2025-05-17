import { CreateAccountForm } from "./CreateAccountForm";
import { DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";

export const CreateAccountScreen = () => {
  return (
    <>
      <DialogHeader>
        <div className="border-b border-black pb-4">Create Account</div>
      </DialogHeader>
      <div className="mt-2 flex flex-col gap-2">
        <span className="text-lg font-bold">
          Create your Pinkcollar account
        </span>
        <CreateAccountForm />
      </div>
    </>
  );
};
