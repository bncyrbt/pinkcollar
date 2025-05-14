import { Role } from "@lens-protocol/client";

export type AccountRole = Role;

export type AvailableAccount = {
  account: string;
  username: string;
  role: AccountRole;
};

export type AuthenticatedUser = {
  address: string;
  authenticationId: string;
  role: AccountRole;
  signer: string;
  sponsored: boolean;
};

export type SignedChallenge = {
  id: string;
  signature: string;
};

export type SignMessage = (message: string) => Promise<string>;

export type LoginParams = Pick<AvailableAccount, "account" | "role"> & {
  signer: string;
  signMessage: SignMessage;
};
