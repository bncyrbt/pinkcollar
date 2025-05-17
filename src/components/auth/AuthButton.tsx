import { useAuthDialogStore } from "@/lib/store/authDialog";
import { Button } from "../ui/button";
import { useModal } from "connectkit";
import { useAccount } from "wagmi";

export function AuthButton() {
  const { isConnected } = useAccount();

  const { openDialog } = useAuthDialogStore();
  const { setOpen: setConnectModalOpen } = useModal();

  return (
    <Button
      onClick={() => (isConnected ? openDialog() : setConnectModalOpen(true))}
    >
      {isConnected ? "Login" : "Connect Wallet"}
    </Button>
  );
}
