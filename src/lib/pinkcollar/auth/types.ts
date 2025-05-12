export enum AccountRole {
  ACCOUNT_OWNER = "ACCOUNT_OWNER",
  ACCOUNT_MANAGER = "ACCOUNT_MANAGER",
}

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
