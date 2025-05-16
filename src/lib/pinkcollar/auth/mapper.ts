import {
  AuthenticatedUser as LensAuthenticatedUser,
  Role,
  Account as LensAccount,
} from "@lens-protocol/client";
import {
  AccountMetadataAttributesKeys,
  AuthenticatedUser,
  AvailableAccount,
  BioLink,
  LoginParams,
} from "./types";
import { AppConfig } from "../config";
import { isBioLink } from "./type-guard";

type ToAvailableAccountParams = Pick<
  LensAccount,
  "__typename" | "address" | "metadata" | "username"
>;

export const toAvailableAccount = (
  params: ToAvailableAccountParams
): AvailableAccount => {
  return {
    id: params.address,
    account: params.address,
    localName: params.username?.localName ?? "",
    username: params.username?.value ?? "",
    metadata: {
      name: params.metadata?.name ?? "",
      bio: params.metadata?.bio ?? "",
      links: params.metadata?.attributes
        ?.filter((attr) => attr.key === AccountMetadataAttributesKeys.BioLinks)
        .map((link) => {
          try {
            const parsed = JSON.parse(link.value);
            if (isBioLink(parsed)) return parsed;
          } catch {
            return undefined;
          }
        })
        .filter(Boolean) as BioLink[],
    },
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

export function toChallengeRequest(params: LoginParams) {
  const { account, signer } = params;
  return account
    ? {
        accountOwner: {
          account,
          owner: signer,
          app: AppConfig.APP_CONTRACT_ADDRESS,
        },
      }
    : {
        onboardingUser: {
          app: AppConfig.APP_CONTRACT_ADDRESS,
          wallet: signer,
        },
      };
}
