import { useAuthStore } from "@/lib/store/auth";
import { AuthButton } from "./AuthButton";
import { AuthDialog } from "./AuthDialog";
import { useAccount } from "wagmi";

export const Auth = () => {
  const { isAuthenticated, isInitializing } = useAuthStore();
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
