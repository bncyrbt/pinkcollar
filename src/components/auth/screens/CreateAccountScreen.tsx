import { CreateAccountForm } from "./CreateAccountForm";
import { DialogHeader } from "../../ui/dialog";

export const CreateAccountScreen = () => {
  return (
    <>
      <DialogHeader>Create Account</DialogHeader>
      <div className="px-12 py-8 flex flex-col gap-8">
        <span className="text-lg font-bold">
          Create your Pinkcollar account
        </span>
        <CreateAccountForm />
      </div>
    </>
  );
};
