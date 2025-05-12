"use client";
import { useAuthenticatedUser, useLogin } from "@lens-protocol/react";
import { signMessageWith } from "@lens-protocol/react/viem";
import { useCallback, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { Button } from "./ui/button";
import ProfilePopoverMenu from "./ProfilePopoverMenu";
import { LoginDialog } from "./LoginDialog";

export const LoginLensAccount = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { execute: login } = useLogin();
  const [isLoading, setLoading] = useState(false);
  const { data: authenticatedUser } = useAuthenticatedUser();

  const handleLogin = useCallback(async () => {
    if (!address || !walletClient) return;
    setLoading(true);
    await login({
      onboardingUser: {
        wallet: address,
        app: process.env.NEXT_PUBLIC_PINKCOLLAR_APP_CONTRACT,
      },
      signMessage: signMessageWith(walletClient),
    });
    setLoading(false);
  }, [login, address, walletClient]);

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl text-gray-600">Connect Wallet to view accounts</p>
      </div>
    );
  }

  if (authenticatedUser) {
    return <ProfilePopoverMenu />;
  }

  return <LoginDialog />;
};
