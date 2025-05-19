import { keccak256, toBytes } from "viem";

export function generateEntityId(...attributes: string[]): `0x${string}` {
  const normalized = attributes.map((attr) => attr.toLowerCase());
  const input = normalized.join("|");
  return keccak256(toBytes(input));
}
