import { useAuthStore } from "@/lib/store/auth";
import { AuthButton } from "./AuthButton";
import { AuthDialog } from "./AuthDialog";
import { useAccount } from "wagmi";
import ProfilePopoverMenu from "../ProfilePopoverMenu";

export const Auth = () => {
  const { isAuthenticated, isInitializing } = useAuthStore();
  const { isConnecting } = useAccount();

  const show = !isInitializing && !isConnecting && !isAuthenticated;

  return (
    <div>
      <AuthDialog />
      {show ? <AuthButton /> : <ProfilePopoverMenu />}
    </div>
  );
};
