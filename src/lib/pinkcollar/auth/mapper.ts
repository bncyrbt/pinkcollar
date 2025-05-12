import {
  AccountAvailable,
  AuthenticatedUser as LensAuthenticatedUser,
} from "@lens-protocol/client";
import { AccountRole, AuthenticatedUser, AvailableAccount } from "./types";

export const toAvailableAccount = (obj: AccountAvailable): AvailableAccount => {
  return {
    account: obj.account.address,
    role: typenameToAuthenticationRole(obj.__typename)!,
    username: obj.account.username?.value,
  };
};

export const toAuthenticatedUser = (
  obj: LensAuthenticatedUser
): AuthenticatedUser => {
  return {
    address: obj.address,
    authenticationId: obj.authenticationId,
    role: typenameToAuthenticationRole(obj.role)!,
    signer: obj.signer,
    sponsored: obj.sponsored,
  };
};

export const typenameToAuthenticationRole = (typename: string) => {
  switch (typename) {
    case "AccountOwned":
      return AccountRole.ACCOUNT_OWNER;
    case "AccountManaged":
      return AccountRole.ACCOUNT_MANAGER;
  }
};
