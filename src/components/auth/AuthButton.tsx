import { useAuthDialogStore } from "@/lib/store/auth-dialog";
import { useModal } from "connectkit";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";

export function AuthButton() {
  const { isConnected } = useAccount();

  const { openDialog } = useAuthDialogStore();
  const { setOpen: setConnectModalOpen } = useModal();

  return (
    <Button
      onClick={() => (isConnected ? openDialog() : setConnectModalOpen(true))}
    >
      Login
    </Button>
  );
}
