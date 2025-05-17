import { useCallback, useState } from "react";
import { useCreateAccount } from "./auth";
import {
  Account,
  isUsernameAvailable,
  Profession,
  switchAccount,
} from "@/lib/pinkcollar/auth";
import { useWalletStore } from "@/lib/store/wallet";
import { fetchAccount } from "@/lib/pinkcollar/account";
import { useAuthDialogStore } from "@/lib/store/auth-dialog";
import { useAuthStore } from "@/lib/store/auth";
import { useAccount } from "wagmi";
import { createAccountMetadata } from "@/lib/storage/metadata";

export const useCreateAccountForm = () => {
  const { address } = useAccount();

  const [localName, setLocalName] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [imageFile, setImageFile] = useState<File>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [isCreating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [account, setAccount] = useState<Account>();

  const pendingAction = useWalletStore((state) => state.pendingAction);
  const setView = useAuthDialogStore((state) => state.setView);
  const { setSession } = useAuthStore();

  const createAccount = useCreateAccount();

  const handleCreateAccount = useCallback(async () => {
    if (!address) {
      setError("Your wallet is not connected");
      return;
    }
    if (localName.length < 3) {
      setError("Username too short, at least 3 characters");
      return;
    }

    const isAvailable = await isUsernameAvailable({ localName });
    if (!isAvailable) {
      setError("Username is not available");
      return;
    }

    setError("");
    setCreating(true);

    const metadataUri = await createAccountMetadata({
      name,
      professions,
      bio,
      imageFile,
      wallet: address,
    });

    const result = await createAccount({
      metadataUri,
      localName,
    });
    console.log("Create account result", { result });

    if (result.isOk()) {
      const txHash = result.value;
      const account = await fetchAccount({ txHash });
      if (account.isOk()) {
        setAccount(account.value);
      } else {
        setError(account.error.message);
      }
    } else {
      setError(result.error.message);
    }

    setCreating(false);
  }, [localName, name, address, bio, imageFile, professions, createAccount]);

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

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  return {
    localName,
    name,
    bio,
    professions,
    account,
    error,
    pendingAction,
    imageFile,
    imagePreviewUrl,
    isCreating,
    setProfessions,
    setBio,
    setName,
    handleImageUpload,
    setLocalName,
    handleCreateAccount,
    handleSwitchAccount,
  };
};
