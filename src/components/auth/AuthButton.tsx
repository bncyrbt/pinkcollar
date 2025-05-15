import { useAuthStore } from "@/lib/store/auth";
import { useAuthDialogStore } from "@/lib/store/authDialog";
import { Button } from "../ui/button";
import { useModal } from "connectkit";
import { useEffect } from "react";

export function AuthButton() {
  const isWalletConnected = useAuthStore((state) => state.connectedWallet);
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  const connectedWallet = useAuthStore((state) => state.connectedWallet);

  const { openDialog } = useAuthDialogStore();
  const { setOpen: setConnectModalOpen } = useModal();

  useEffect(() => {
    if (connectedWallet) {
      openDialog();
    }
  }, [openDialog, connectedWallet]);

  if (status !== "authenticated") {
    return (
      <Button
        onClick={() =>
          isWalletConnected ? openDialog() : setConnectModalOpen(true)
        }
      >
        {isWalletConnected ? "Login" : "Connect Wallet"}
      </Button>
    );
  }

  return (
    <div>
      <span>
        {user?.signer} + {user?.role}
      </span>
      {/* Avatar / dropdown here */}
    </div>
  );
}
