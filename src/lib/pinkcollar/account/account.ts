import { getLensPublicClient } from "@/lib/lens/client";
import {
  fetchAccount as lensFetchAccount,
  fetchAccounts as lensFetchAccounts,
} from "@lens-protocol/client/actions";
import { toAccount } from "../auth";
import { evmAddress, never, PageSize } from "@lens-protocol/client";
import { AppConfig } from "../config";

export type FetchAccountParams = {
  address?: string;
  txHash?: string;
  localName?: string;
};
export function fetchAccount(params: FetchAccountParams) {
  return lensFetchAccount(getLensPublicClient(), {
    address: params.address ?? undefined,
    txHash: params.txHash ?? undefined,
    username: params.localName
      ? {
          localName: params.localName,
          namespace: AppConfig.APP_NAMESPACE_CONTRACT,
        }
      : undefined,
  }).map((res) => (res ? toAccount(res) : never()));
}

type FetchAccountsParams = {
  localNameQuery: string;
};
export function fetchAccountsByQuery({ localNameQuery }: FetchAccountsParams) {
  return lensFetchAccounts(getLensPublicClient(), {
    pageSize: PageSize.Fifty,
    filter: {
      searchBy: {
        localNameQuery,
        namespaces: [evmAddress(AppConfig.APP_NAMESPACE_CONTRACT)],
      },
    },
  }).map((res) => res.items.map((item) => toAccount(item)));
}
