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

export const useCreateAccountForm = () => {
  const [localName, setLocalName] = useState("");
  const [error, setError] = useState("");
  const [account, setAccount] = useState<AvailableAccount>();

  const pendingAction = useWalletStore((state) => state.pendingAction);
  const setView = useAuthDialogStore((state) => state.setView);

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
        setView("accountCreated");
      } else {
        setError(account.error.message);
      }
    } else {
      setError(result.error.message);
    }
  }, [localName, createAccount, setView]);

  const handleSwitchAccount = useCallback(async () => {
    if (!account) {
      return;
    }
    await switchAccount({ account: account.account });
  }, [account]);

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
