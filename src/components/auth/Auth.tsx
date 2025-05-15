import { useAuthStore } from "@/lib/store/auth";
import { Button } from "../ui/button";
import { AuthButton } from "./AuthButton";
import { AuthDialog } from "./AuthDialog";

export const Auth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const logout = useAuthStore((state) => state.logout);

  if (isInitializing) {
    return <span>Loading ...</span>;
  }

  return (
    <div>
      <AuthDialog />
      <div></div>
      {!isAuthenticated ? (
        <div>
          <AuthButton />
        </div>
      ) : (
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      )}
    </div>
  );
};
