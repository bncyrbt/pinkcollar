import { getLensPublicClient, getLensSessionClient } from "@/lib/lens/client";
import { CreateAccountParams, LoginParams } from "./types";
import {
  canCreateUsername,
  createAccountWithUsername,
  fetchAccountsAvailable,
} from "@lens-protocol/client/actions";
import { evmAddress, uri } from "@lens-protocol/client";
import { handleOperationWith } from "@lens-protocol/client/viem";
import {
  toAuthenticatedUser,
  toAvailableAccount,
  toChallengeRequest,
} from "./mapper";
import { AppConfig } from "../config";
import { WalletClient } from "viem";

type GetAvailableAccountsParams = {
  signer: string;
};
export function getAvailableAccounts(params: GetAvailableAccountsParams) {
  return fetchAccountsAvailable(getLensPublicClient(), {
    managedBy: evmAddress(params.signer),
    includeOwned: true,
  }).map((res) =>
    res.items
      .filter((item) => !!item.account.username)
      .map((account) =>
        toAvailableAccount({
          __typename: account.__typename,
          account: account.account.address,
          username: account.account.username?.value,
        })
      )
  );
}

export function loginToAccount(params: LoginParams) {
  return getLensPublicClient()
    .login({ ...toChallengeRequest(params), signMessage: params.signMessage })
    .andThen((session) => session.getAuthenticatedUser())
    .map(toAuthenticatedUser);
}

export function logout() {
  return getLensSessionClient().andThen((session) => session.logout());
}

export function checkAuthSessionState() {
  return getLensSessionClient()
    .andThen((session) => session.getAuthenticatedUser())
    .map(toAuthenticatedUser);
}

export function createAccount(
  walletClient: WalletClient,
  { localName, metadataUri }: CreateAccountParams
) {
  return getLensSessionClient().andThen((session) =>
    createAccountWithUsername(session, {
      metadataUri: uri(metadataUri),
      username: {
        localName,
        namespace: AppConfig.APP_NAMESPACE_CONTRACT,
      },
    })
      .andThen(handleOperationWith(walletClient))
      .andThen(session.waitForTransaction)
  );
}

export function switchAccount({ account }: { account: string }) {
  return getLensSessionClient().andThen((session) =>
    session
      .switchAccount({
        account: evmAddress(account),
      })
      .andThen((session) => session.getAuthenticatedUser())
      .map(toAuthenticatedUser)
  );
}

export async function isUsernameAvailable({
  localName,
}: {
  localName: string;
}) {
  const result = await getLensSessionClient().andThen((session) =>
    canCreateUsername(session, {
      localName,
      namespace: AppConfig.APP_NAMESPACE_CONTRACT,
    })
  );

  if (result.isOk()) {
    switch (result.value.__typename) {
      case "NamespaceOperationValidationPassed":
        // Creating a username is allowed
        return true;

      case "NamespaceOperationValidationFailed":
        // Creating a username is not allowed
        break;

      case "NamespaceOperationValidationUnknown":
        // Validation outcome is unknown
        break;

      case "UsernameTaken":
        // The desired username is not available
        break;
    }
  }
  return false;
}
