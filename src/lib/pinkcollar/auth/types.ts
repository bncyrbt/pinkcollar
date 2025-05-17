import { Role } from "@lens-protocol/client";

export { Role };

export enum AccountMetadataAttributesKeys {
  BioLinks = "bio_link",
}

export type BioLink = {
  caption: string;
  href: string;
};

export type Account = {
  id: string;
  account: string;
  username: string;
  localName: string;
  metadata: {
    name?: string;
    bio?: string;
    picture?: string;
    links: BioLink[];
  };
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

export type LoginParams = {
  isOnboarding?: boolean;
  account?: string; // if no account - onboarding user
  signer: string;
  signMessage: SignMessage;
};

export type CreateAccountParams = { localName: string; metadataUri: string };
