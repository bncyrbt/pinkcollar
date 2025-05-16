import { useAuthStore } from "@/lib/store/auth";
import { useAuthDialogStore } from "@/lib/store/authDialog";
import { Button } from "../ui/button";
import { useModal } from "connectkit";

export function AuthButton() {
  const { connectedWallet } = useAuthStore();

  const { openDialog } = useAuthDialogStore();
  const { setOpen: setConnectModalOpen } = useModal();

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
