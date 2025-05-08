"use client";
import {
  useAuthenticatedUser,
  useLogin,
  useLogout,
} from "@lens-protocol/react";
import { signMessageWith } from "@lens-protocol/react/viem";
import { useCallback, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";

export const LoginLensAccount = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { execute: login } = useLogin();
  const { execute: logout } = useLogout();
  const [isLoading, setLoading] = useState(false);
  const { data: authenticatedUser } = useAuthenticatedUser();

  const handleLogin = useCallback(async () => {
    if (!address || !walletClient) return;
    setLoading(true);
    await login({
      onboardingUser: {
        wallet: address,
        app: "0xC75A89145d765c396fd75CbD16380Eb184Bd2ca7",
      },
      signMessage: signMessageWith(walletClient),
    });
    setLoading(false);
  }, [login, address, walletClient]);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  }, [logout]);

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl text-gray-600">Connect Wallet to view accounts</p>
      </div>
    );
  }

  if (authenticatedUser) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-800">
          👋 {authenticatedUser.address}
        </span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
    >
      {isLoading ? "Connecting..." : "Login to Lens"}
    </button>
  );
};
