"use client";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { walletConfig } from "@/lib/wallet/config";
import { useAuthStore } from "@/lib/store/auth";

const queryClient = new QueryClient();

export const Web3Provider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const connectWallet = useAuthStore((state) => state.connectWallet);
  const disconnectWallet = useAuthStore((state) => state.disconnectWallet);

  return (
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          onConnect={({ address }) => {
            if (address) connectWallet(address);
          }}
          onDisconnect={disconnectWallet}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
