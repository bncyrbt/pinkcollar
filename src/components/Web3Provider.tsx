"use client";
import { LensProvider } from "@lens-protocol/react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { lensTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import React from "react";
import { client } from "@/lens/client";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [lensTestnet],
    transports: {
      // RPC URL for each chain
      [lensTestnet.id]: http("https://rpc.testnet.lens.xyz"),
    },

    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <LensProvider client={client}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </LensProvider>
  );
};
