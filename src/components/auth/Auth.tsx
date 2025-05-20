"use client";
import { useAuthStore } from "@/lib/store/auth";
import { AuthButton } from "./AuthButton";
import { AuthDialog } from "./AuthDialog";
import { useAccount } from "wagmi";
import ProfilePopoverMenu from "../ProfilePopoverMenu";
import Spinner from "../ui/spinner";

export const Auth = () => {
  const { isAuthenticated, isInitializing } = useAuthStore();
  const { isConnecting } = useAccount();

  if (isInitializing || isConnecting) {
    return <Spinner />;
  }
  return (
    <div>
      <AuthDialog />
      {isAuthenticated ? <ProfilePopoverMenu /> : <AuthButton />}
    </div>
  );
};
