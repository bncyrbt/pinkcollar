import {
  AuthenticatedUser as LensAuthenticatedUser,
  Account as LensAccount,
} from "@lens-protocol/client";
import {
  AccountMetadataAttributesKeys,
  AuthenticatedUser,
  Account,
  BioLink,
  LoginParams,
  Profession,
} from "./types";
import { AppConfig } from "../config";
import { isBioLink, isProfession } from "./type-guard";

type ToAvailableAccountParams = Pick<
  LensAccount,
  "__typename" | "address" | "metadata" | "username"
>;

export const toAccount = (params: ToAvailableAccountParams): Account => {
  return {
    id: params.address,
    account: params.address,
    localName: params.username?.localName ?? "",
    username: params.username?.value ?? "",
    displayName: params?.metadata?.name ?? params.username?.localName ?? "N/A",
    metadata: {
      name: params.metadata?.name ?? "",
      bio: params.metadata?.bio ?? "",
      picture: params.metadata?.picture,
      professions: params.metadata?.attributes
        ?.filter(
          (attr) => attr.key === AccountMetadataAttributesKeys.Profession
        )
        .map((profession) => {
          try {
            const parsed = JSON.parse(profession.value);
            if (isProfession(parsed)) return parsed;
          } catch {
            return undefined;
          }
        })
        .filter(Boolean) as Profession[],
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
