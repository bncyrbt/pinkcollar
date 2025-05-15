import { useAuthStore } from "@/lib/store/auth";
import { Button } from "../ui/button";
import { AuthButton } from "./AuthButton";
import { AuthDialog } from "./AuthDialog";
import { logout } from "@/actions/auth";
import { useAccount } from "wagmi";

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
      {!isAuthenticated ? (
        <AuthButton />
      ) : (
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      )}
    </div>
  );
};
