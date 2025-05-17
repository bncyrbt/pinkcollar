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
      className="h-12 w-12 font-extrabold cursor-pointer border-3 border-pink-300"
      onClick={() => (isConnected ? openDialog() : setConnectModalOpen(true))}
    >
      {isConnected ? "L" : "L"}
    </Button>
  );
}
