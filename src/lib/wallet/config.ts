import { getDefaultConfig } from "connectkit";
import { createConfig, http } from "wagmi";
import { lensTestnet } from "viem/chains";
import { useAuthStore } from "../store/auth";

const wagmiConfig = createConfig(
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
    appName: "Pinkcollar",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

wagmiConfig.subscribe(
  (state) => {
    const curConnection = state.current && state.connections.get(state.current);
    if (curConnection) {
      useAuthStore.getState().connectWallet(curConnection.accounts[0]);
    }
  },
  (chainId) => console.log(`Chain ID changed to ${chainId}`)
);

export const walletConfig = wagmiConfig;
