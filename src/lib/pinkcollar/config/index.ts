import { chains } from "@lens-chain/sdk/viem";

export const AppConfig = {
  APP_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_PINKCOLLAR_APP_CONTRACT!,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL!,
  APP_NAMESPACE_CONTRACT:
    process.env.NEXT_PUBLIC_PINKCOLLAR_NAMESPACE_CONTRACT!,
  APP_CHAIN: chains.testnet,
};
