import {
  AccountAvailable,
  ChallengeRequest,
  AuthenticatedUser as LensAuthenticatedUser,
  Role,
} from "@lens-protocol/client";
import { AuthenticatedUser, AvailableAccount, LoginParams } from "./types";
import { AppConfig } from "../config";

/* 
  Mappers between LensSDK entities to 
*/

type ToAvailableAccountParams = {
  __typename: string;
  account: string;
  username: string;
};
export const toAvailableAccount = (
  params: ToAvailableAccountParams
): AvailableAccount => {
  return {
    account: params.account,
    role: toAuthenticationRoleFromAccountType(params.__typename)!,
    username: params.username,
  };
};

export const toAuthenticatedUser = (
  obj: LensAuthenticatedUser
): AuthenticatedUser => {
  return {
    address: obj.address,
    authenticationId: obj.authenticationId,
    role: obj.role,
    signer: obj.signer,
    sponsored: obj.sponsored,
  };
};

/* export const toAuthenticationRoleFromLensRole = (role: Role) => {
  switch (role) {
    case Role.AccountOwner:
      return AccountRole.ACCOUNT_OWNER;
    case Role.AccountManager:
      return AccountRole.ACCOUNT_MANAGER;
  }
}; */
export const toAuthenticationRoleFromAccountType = (typename: string) => {
  switch (typename) {
    case "AccountOwned":
      return Role.AccountOwner;
    case "AccountManaged":
      return Role.AccountManager;
  }
};

export function toChallengeRequest(params: LoginParams) {
  const { account, signer, role } = params;

  let challengeRequest: ChallengeRequest = {
    onboardingUser: {
      app: AppConfig.APP_CONTRACT_ADDRESS,
      wallet: signer,
    },
  };

  switch (role) {
    case Role.AccountOwner:
      challengeRequest = {
        accountOwner: {
          account,
          owner: signer,
          app: AppConfig.APP_CONTRACT_ADDRESS,
        },
      };
      break;
    case Role.AccountManager:
      challengeRequest = {
        accountManager: {
          account,
          manager: signer,
          app: AppConfig.APP_CONTRACT_ADDRESS,
        },
      };
      break;
    default:
      return challengeRequest;
  }

  return challengeRequest;
}
