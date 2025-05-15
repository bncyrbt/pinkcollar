"use client";
import { PublicClient, testnet } from "@lens-protocol/client";
import { fragments } from "./fragments";

const lensCLient = PublicClient.create({
  environment: testnet,
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
  fragments,
});

export function getLensPublicClient() {
  return lensCLient;
}

export function getLensSessionClient() {
  return lensCLient.resumeSession();
}
