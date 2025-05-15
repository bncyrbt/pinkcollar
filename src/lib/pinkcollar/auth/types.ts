import { Role } from "@lens-protocol/client";

export { Role };

export type AvailableAccount = {
  account: string;
  username: string;
  role: Role;
};

export type AuthenticatedUser = {
  address: string;
  authenticationId: string;
  role: Role;
  signer: string;
  sponsored: boolean;
};

export type SignedChallenge = {
  id: string;
  signature: string;
};

export type SignMessage = (message: string) => Promise<string>;

export type LoginParams = Pick<AvailableAccount, "account" | "role"> & {
  account: string;
  role: Role;
  signer: string;
  signMessage: SignMessage;
};

export type CreateAccountParams = { localName: string; metadataUri: string };
