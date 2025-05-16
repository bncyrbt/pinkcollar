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
  const { setSession } = useAuthStore();

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
      name: localName,
    });

    const { uri } = await storageClient.uploadAsJson(metadata);

    const result = await createAccount({
      metadataUri: uri,
      localName,
    });
    if (result.isOk()) {
      const txHash = result.value;
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
      setSession(authUser.value);
      setView("welcome");
    } else {
      setView("chooseAccount");
    }
  }, [account, setView, setSession]);

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
