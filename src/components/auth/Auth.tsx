import { useAuthStore } from "@/lib/store/auth";
import { AuthButton } from "./AuthButton";
import { AuthDialog } from "./AuthDialog";
import { useAccount } from "wagmi";
import ProfilePopoverMenu from "../ProfilePopoverMenu";

export const Auth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const { isConnecting } = useAccount();

  if (isInitializing || isConnecting) {
    return <span>Loading ...</span>;
  }

  return (
    <div>
      <AuthDialog />
      {!isAuthenticated && <AuthButton />}
    </div>
  );
};
