"use client";
import { PublicClient, testnet } from "@lens-protocol/client";
import { fragments } from "./fragments";

export const lensCLient = PublicClient.create({
  environment: testnet,
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
  fragments,
});
