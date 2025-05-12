import api from "../axios";
import { AuthenticatedUser, SignedChallenge } from "../pinkcollar/auth";

export type ApiResponse<Data> = {
  success: boolean;
  data: Data;
};

enum AccountRole {
  ACCOUNT_OWNER = "ACCOUNT_OWNER",
  ACCOUNT_MANAGER = "ACCOUNT_MANAGER",
}

export type AvailableAccount = {
  account: string;
  username?: string;
  role: AccountRole;
};

export async function getAvailableAccounts(
  wallet: string
): Promise<AvailableAccount[]> {
  const accounts = await fetch("http://localhost:3000/api/auth/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet }),
  }).then((res) => res.json());

  return accounts.data;
}

export type Challenge = {
  id: string;
  text: string;
};

export type GetAccountChallengeParams = {
  account: string;
  wallet: string;
  role: AccountRole;
};
export async function getAccountChallenge(
  params: GetAccountChallengeParams
): Promise<Challenge> {
  return api.post("/auth/challenge", params).then((res) => res.data.data);
}

export async function loginWithSignedChallenge(
  signedChallenge: SignedChallenge
): Promise<AuthenticatedUser> {
  return api.post("/auth/login", signedChallenge).then((res) => res.data.data);
}

export async function loginWithCookies(): Promise<AuthenticatedUser> {
  return api.post("/auth/login", {}).then((res) => res.data.data);
}
