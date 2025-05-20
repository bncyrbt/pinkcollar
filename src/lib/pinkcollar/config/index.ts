import { chains } from "@lens-chain/sdk/viem";

export const AppConfig = {
  APP_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_PINKCOLLAR_APP_CONTRACT!,
  APP_NAMESPACE_CONTRACT:
    process.env.NEXT_PUBLIC_PINKCOLLAR_NAMESPACE_CONTRACT!,
  APP_CHAIN:
    process.env.NEXT_PUBLIC_USE_MAINNET === "true"
      ? chains.mainnet
      : chains.testnet,
  COLLECT_CURRENCY_CONTRACT_ADDRESS: "",
  APP_TREASURY_CONTRACT: "",
  APP_SPONSORSHIP_CONTRACT: "",
  APP_MAIN_FEED_CONTRACT: process.env.NEXT_PUBLIC_APP_MAIN_FEED_CONTRACT,
  IS_MAINNET: process.env.NEXT_PUBLIC_USE_MAINNET === "true",
  RPC_ENDPOINT: process.env.NEXT_PUBLIC_RPC_ENDPOINT,
};
