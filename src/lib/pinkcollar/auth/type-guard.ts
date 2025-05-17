/* eslint-disable @typescript-eslint/no-explicit-any */
import { BioLink, Profession } from "./types";

export function isBioLink(obj: any): obj is BioLink {
  return obj && typeof obj.caption === "string" && typeof obj.href === "string";
}

export function isProfession(obj: any): obj is Profession {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.label === "string" &&
    typeof obj.groupId === "string"
  );
}
