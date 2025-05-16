/* eslint-disable @typescript-eslint/no-explicit-any */
import { BioLink } from "./types";

export function isBioLink(obj: any): obj is BioLink {
  return obj && typeof obj.caption === "string" && typeof obj.href === "string";
}
