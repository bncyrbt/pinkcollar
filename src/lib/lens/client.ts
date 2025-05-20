"use client";
import { PublicClient, testnet, mainnet } from "@lens-protocol/client";
import { fragments } from "./fragments";
import { AppConfig } from "../pinkcollar/config";

const lensCLient = PublicClient.create({
  environment: AppConfig.IS_MAINNET ? mainnet : testnet,
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
  fragments,
});

export function getLensPublicClient() {
  return lensCLient;
}

export function getLensSessionClient() {
  return lensCLient.resumeSession();
}
