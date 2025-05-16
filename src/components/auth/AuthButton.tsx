import { useAuthStore } from "@/lib/store/auth";
import { useAuthDialogStore } from "@/lib/store/authDialog";
import { Button } from "../ui/button";
import { useModal } from "connectkit";
import { useEffect } from "react";

export function AuthButton() {
  const status = useAuthStore((state) => state.status);
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
          connectedWallet ? openDialog() : setConnectModalOpen(true)
        }
      >
        {connectedWallet ? "Login" : "Connect Wallet"}
      </Button>
    );
  }
}
