import { lensCLient } from "@/lib/lens/client";
import { LoginParams } from "./types";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import { evmAddress } from "@lens-protocol/client";
import {
  toAuthenticatedUser,
  toAvailableAccount,
  toChallengeRequest,
} from "./mapper";

/* interface AuthApi {
  login: (params: LoginParams) => Promise<AuthenticatedUser>;
  logout: () => boolean;
  getAvailableAccounts: () => Promise<AvailableAccount[]>;
} */

type GetAvailableAccountsParams = {
  signer: string;
};
export function getAvailableAccounts(params: GetAvailableAccountsParams) {
  return fetchAccountsAvailable(lensCLient, {
    managedBy: evmAddress(params.signer),
    includeOwned: true,
  }).map((res) =>
    res.items.filter((item) => !!item.account.username).map(toAvailableAccount)
  );
}

export function loginToAccount(params: LoginParams) {
  return lensCLient
    .login({ ...toChallengeRequest(params), signMessage: params.signMessage })
    .andThen((session) => session.getAuthenticatedUser())
    .map(toAuthenticatedUser);
}

export function logout() {
  return lensCLient.resumeSession().andThen((session) => session.logout());
}

export function checkAuthSessionState() {
  return lensCLient
    .resumeSession()
    .andThen((session) => session.getAuthenticatedUser())
    .map(toAuthenticatedUser);
}
