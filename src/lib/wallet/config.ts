import { getDefaultConfig } from "connectkit";
import { createConfig, http } from "wagmi";
import { lensTestnet, lens } from "viem/chains";
import { AppConfig } from "../pinkcollar/config";

const wagmiConfig = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [AppConfig.IS_MAINNET ? lens : lensTestnet],
    transports: {
      // RPC URL for each chain
      [AppConfig.APP_CHAIN.id]: http(AppConfig.RPC_ENDPOINT),
    },
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
    appName: "Pinkcollar",
    appUrl: "https://pinkcollar.co",
  })
);

export const walletConfig = wagmiConfig;
