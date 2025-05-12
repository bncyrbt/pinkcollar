import {
  AnyClient,
  ChallengeRequest,
  evmAddress,
  PublicClient,
  Role,
  SessionClient,
  signatureFrom,
} from "@lens-protocol/client";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import { toAuthenticatedUser, toAvailableAccount } from "./mapper";
import { AuthenticatedUser, AvailableAccount } from "./types";
import { AppConfig } from "../config";

export const getAvailableAccounts = async (
  lensClient: AnyClient,
  wallet: string
): Promise<AvailableAccount[]> => {
  const availableAccounts = await fetchAccountsAvailable(lensClient, {
    managedBy: evmAddress(wallet),
    includeOwned: true,
  });

  return availableAccounts.isOk()
    ? availableAccounts.value.items
        .filter((item) => item.account.username?.value)
        .map(toAvailableAccount)
    : [];
};

export const login = async (
  lensClient: PublicClient,
  {
    id,
    signature,
  }: {
    id: string;
    signature: string;
  }
): Promise<AuthenticatedUser | boolean> => {
  const result = await lensClient
    .authenticate({
      id,
      signature: signatureFrom(signature),
    })
    .andThen((session) => session.getAuthenticatedUser());

  return result.isOk() ? toAuthenticatedUser(result.value) : false;
};

export const getAuthenticatedUser = (
  lensClient: SessionClient
): AuthenticatedUser | boolean => {
  const result = lensClient.getAuthenticatedUser();
  return result.isOk() ? toAuthenticatedUser(result.value) : false;
};

export const generateChallenge = async (
  lensClient: PublicClient,
  params: {
    account: string;
    wallet: string;
    role: Role;
  }
) => {
  const { account, wallet, role } = params;

  let challengeRequest: ChallengeRequest = {
    onboardingUser: {
      app: AppConfig.APP_CONTRACT_ADDRESS,
      wallet,
    },
  };

  switch (role) {
    case Role.AccountOwner:
      challengeRequest = {
        accountOwner: {
          account,
          owner: wallet,
          app: AppConfig.APP_CONTRACT_ADDRESS,
        },
      };
      break;
    case Role.AccountManager:
      challengeRequest = {
        accountManager: {
          account,
          manager: wallet,
          app: AppConfig.APP_CONTRACT_ADDRESS,
        },
      };
      break;
    default:
      return false;
  }

  const result = await lensClient
    .challenge(challengeRequest)
    .map((challenge) => ({ id: challenge.id, text: challenge.text }));
  return result.isOk() ? result.value : false;
};
