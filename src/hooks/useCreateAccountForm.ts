import { useCallback, useState } from "react";
import { useCreateAccount } from "./auth";
import {
  AvailableAccount,
  isUsernameAvailable,
  switchAccount,
} from "@/lib/pinkcollar/auth";
import { useWalletStore } from "@/lib/store/wallet";
import { fetchAccount } from "@/lib/pinkcollar/account";
import { useAuthDialogStore } from "@/lib/store/authDialog";
import { account as prepareAccountMetadata } from "@lens-protocol/metadata";
import { storageClient } from "@/lib/storage/client";
import { useAuthStore } from "@/lib/store/auth";

export const useCreateAccountForm = () => {
  const [localName, setLocalName] = useState("");
  const [error, setError] = useState("");
  const [account, setAccount] = useState<AvailableAccount>();

  const pendingAction = useWalletStore((state) => state.pendingAction);
  const setView = useAuthDialogStore((state) => state.setView);
  const setAuth = useAuthStore((state) => state.setAuth);

  const createAccount = useCreateAccount();

  const handleCreateAccount = useCallback(async () => {
    if (localName.length < 3) {
      setError("Username too short, at least 3 characters");
      return;
    }

    const isAvailable = await isUsernameAvailable({ localName });
    if (!isAvailable) {
      setError("Username is not available");
      return;
    }

    const metadata = prepareAccountMetadata({
      name: "Jane Doe",
    });

    const { uri } = await storageClient.uploadAsJson(metadata);

    console.log(uri); // e.g., lens://4f91ca…
    const result = await createAccount({
      metadataUri: uri,
      localName,
    }); // TODO upload metadata
    if (result.isOk()) {
      const txHash = result.value;
      console.log("Account Created!");

      const account = await fetchAccount({ txHash });
      if (account.isOk()) {
        setAccount(account.value);
        setError("");
      } else {
        setError(account.error.message);
      }
    } else {
      setError(result.error.message);
    }
  }, [localName, createAccount]);

  const handleSwitchAccount = useCallback(async () => {
    if (!account) {
      return;
    }
    const authUser = await switchAccount({ account: account.account });
    if (authUser.isOk()) {
      setAuth(authUser.value);
      setView("welcome");
    } else {
      setView("chooseAccount");
    }
  }, [account, setView, setAuth]);

  return {
    localName,
    account,
    error,
    pendingAction,
    setLocalName,
    handleCreateAccount,
    handleSwitchAccount,
  };
};
