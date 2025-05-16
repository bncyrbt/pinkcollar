import { createAccount, CreateAccountParams } from "@/lib/pinkcollar/auth";
import { withWalletClient } from "./helpers";

export const useCreateAccount = withWalletClient(
  "createAccount",
  (walletClient) => (params: CreateAccountParams) => {
    return createAccount(walletClient, params);
  }
);
